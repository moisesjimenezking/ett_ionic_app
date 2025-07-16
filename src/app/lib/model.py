from modules.token.model import Token
from flask import request
from .classStructure import UserClass
from . import userLogged, Status
from modules.codeVerified.model import CodeVerified
from library.sendEmail import SendMail
import bcrypt
import base64
from io import BytesIO
from PIL import Image, ExifTags
import logging

logging.basicConfig(level=logging.DEBUG)


class Users:
    @classmethod
    def allCompany(cls, data):
        companys = UserClass.userAllcompany(**data)
        if len(companys) == 0:
            raise Exception('compañias no encontradas.', 404)
        
        return {
            'response'    : companys,
            'status_http' : 200
        }
    @classmethod
    def getDataAll(cls, data):
        user = UserClass.getDataAll(**data)
        if user["paginator"]["totalRows"] == 0:
            raise Exception("usuarios no encontrados.", 404)
        
        return {
            "response"      : user,
            "status_http"   : 200
        }

    @classmethod
    def getData(cls, data):
        data.update({"id":userLogged()})
        user = UserClass.getData(**data)
            
        if len(user) == 0:
            raise Exception("transacciones no encontradas.", 404)
        
        return {
            "response"      : user[0],
            "status_http"   : 200
        }

    @classmethod
    def verificEmail(cls, data):
        user = UserClass.getDataFirstUsername(data["email"])
        if "id" not in user:
            raise Exception("Email no registrado.", 404)
        
        return {
            "response":user,
            "status_http": 200
        }
    
    @classmethod
    def postData(cls, data):
        passwd = data.get("passwd")

        data["passwd"] = bcrypt.hashpw(
            passwd.encode("utf-8"), 
            bcrypt.gensalt()
        )
        
        if 'account' in data:
            data['account'] = data['account'].upper()
            
        create = UserClass.postData(**data)
        if "message" in create:
            raise Exception(create["message"], 400)
        
        SendMail.sendUserRegister(create["id"])

        response = Token.postTokenData({
            "username": data.get("email"), 
            "passwd"  : passwd,
            "fcm_code": "ANDROID"
        })

        return response
    
    @classmethod
    def activate(cls, data):
        userUpdate = UserClass.getFirstId(data["code"], False)
        if userUpdate is None:
            raise Exception("Codigo invalido.", 404)
        
        if userUpdate.status_id == 1:
            raise Exception("Codigo usado.", 404)
        
        setattr(userUpdate, 'status_id', 1)
        update = UserClass.putDataStatus(userUpdate)
        
        return {
            "response": {"message":"ok"}, 
            "status_http": 200
        }
    
    @classmethod
    def saveImage(cls, name, extend, base64String):
        try:
            encode = base64String.split(",")[1]
            imageData = base64.b64decode(encode)
            image = Image.open(BytesIO(imageData))
            
            for orientation in ExifTags.TAGS.keys():
                if ExifTags.TAGS[orientation] == 'Orientation':
                    break
            
            exif = image._getexif()
            if exif is not None:
                orientation_value = exif.get(orientation)
                if orientation_value == 3:
                    image = image.rotate(180, expand=True)
                elif orientation_value == 6:
                    image = image.rotate(270, expand=True)
                elif orientation_value == 8:
                    image = image.rotate(90, expand=True)
                
            image.save("public/img/"+name, extend.upper())
        except:
            raise Exception("Error al guardar la imagen.", 404)

        return True
    
    @classmethod
    def saveDoc(cls, name, extend, base64String):
        try:
            encode = base64String.split(",")[1]
            imageData = base64.b64decode(encode)
            image = Image.open(BytesIO(imageData))
            image.save("public/documents/"+name, extend.upper())
        except:
            raise Exception("Error al guardar el archivo.", 404)

        return True

    @classmethod
    def updateStatus(cls, data):
        if "status" in data:
            data["status_id"] = Status(data["status"])
            
        userUpdate = UserClass.getFirstId(data["id"], False)
        if userUpdate is None:
            raise Exception("El usuario no fue encontrado", 404)
        
        if userUpdate.status_id == data["status_id"]:
            raise Exception("Sin cambios", 304)
        
        setattr(userUpdate, 'status_id', data["status_id"])
        update = UserClass.putDataStatus(userUpdate)
        
        return {
            "response": update, 
            "status_http": 201
        }

    @classmethod
    def putData(cls, data):
        userId = userLogged() if 'user_id' not in data else data['user_id']

        if "status" in data:
            data["status_id"] = Status(data["status"])
            
        userUpdate = UserClass.getFirstId(userId, False)

        if "passwd" in data:
            data["passwd"] = bcrypt.hashpw(
                data["passwd"].encode("utf-8"), 
                bcrypt.gensalt()
            )

        if "icon" in data and data["icon"] is not None:
            if "base64" in data["icon"]:
                extended = data["icon"].split("/")[1].split(";")[0]
                icon_name = str(userId)+"_profile_icon."+str(extended)

                cls.saveImage(icon_name, extended, data["icon"])
                data["icon"] = icon_name
                setattr(userUpdate, 'icon', None)
                
        if "identification_img" in data and data["identification_img"] is not None:
            if "base64" in data["identification_img"]:
                extended = data["identification_img"].split("/")[1].split(";")[0]
                icon_name = str(userId)+"_identification_img."+str(extended)

                cls.saveImage(icon_name, extended, data["identification_img"])
                data["identification_img"] = icon_name
                setattr(userUpdate, 'identification_img', None)
                
        if "license_img" in data and data["license_img"] is not None:
            if "base64" in data["license_img"]:
                extended = data["license_img"].split("/")[1].split(";")[0]
                icon_name = str(userId)+"_license_img."+str(extended)

                cls.saveImage(icon_name, extended, data["license_img"])
                data["license_img"] = icon_name
                setattr(userUpdate, 'license_img', None)
                
        if "rif_img" in data and data["rif_img"] is not None:
            if "base64" in data["rif_img"]:
                extended = data["rif_img"].split("/")[1].split(";")[0]
                icon_name = str(userId)+"_rif_img."+str(extended)

                cls.saveImage(icon_name, extended, data["rif_img"])
                data["rif_img"] = icon_name
                setattr(userUpdate, 'rif_img', None)
                
        if "rif" in data and data["rif"] is not None:
            if "base64" in data["rif"]:
                extended = data["rif"].split("/")[1].split(";")[0]
                rif_name = str(userId)+"_rif."+str(extended)

                cls.saveDoc(rif_name, extended, data["rif"])
                data["rif"] = rif_name
        
        if "icon_front" in data and data["icon_front"] is not None:
            if "base64" in data["icon_front"]:
                extended = data["icon_front"].split("/")[1].split(";")[0]
                icon_name = str(userId)+"_front_icon."+str(extended)

                cls.saveImage(icon_name, extended, data["icon_front"])
                data["icon_front"] = icon_name
                setattr(userUpdate, 'icon_front', None)

        if "social_link" in data:
            if isinstance(data["social_link"], list):
                data["social_link"] = str(data["social_link"])
        
        if "skills" in data:
            if isinstance(data["skills"], list):
                data["skills"] = str(data["skills"])

        change = False
        if userUpdate is None:
            raise Exception("El usuario no fue encontrado", 404)
        
        for key, value in data.items():
            if hasattr(userUpdate, key): 
                attr = getattr(userUpdate, key)
                if str(attr) != str(value):
                    change = True
                    setattr(userUpdate, key, value)
                    
        if change:
            update = UserClass.putData(userUpdate)
        else:
            raise Exception("Sin cambios", 304)

        return {"response": update, "status_http": 201}
    
    # @classmethod
    # def emailVerific(cls, data):
    #     user = UserClass.getFirstId(userLogged())
    #     if 'id' not in user:
    #         raise Exception("Usuario no encontrado.", 404)
        
    #     code = CodeVerified.generateCode(
    #         {"type_code":'CHECK_EMAIL'},
    #         user["id"]
    #     )
        
    #     if code["status_http"] != 201:
    #         raise Exception("Error al generar el codigo.", 400)
        
    #     code = code["response"]["code"]
                
    #     SendMail.sendEmail(
    #         user["email"],
    #         'Código de verificación de correo electrónico',
    #         "codeNew.html",
    #         **{
    #             "code":code,
    #             "name":user["fullname"] if user["fullname"] is not None else user['email'].split('@')[0],
    #             "action":'Verificar tu correo electrónico'
    #         }
    #     )

    #     return {
    #         "response":{"message":"El Código de verificación de correo electrónico ha sido enviado a su correo."},
    #         "status_http":201
    #     }
        
    @classmethod
    def recoverPassword(cls, data):
        user = UserClass.getDataFirstUsername(data['email'])
        if 'id' not in user:
            raise Exception("Usuario no encontrado.", 404)

        code = CodeVerified.generateCode(
            {"type_code":'CHANGE_PASSWORD'},
            user["id"]
        )
        
        if code["status_http"] != 201:
            raise Exception("Error al generar el codigo.", 400)
        
        code = code["response"]["code"]
        
        SendMail.sendEmail(
            user["email"],
            'Código de verificación para el restablecimiento de contraseña',
            "contraseña-olvidada.html",
            **{
                "code":code,
                "name":user["fullname"] if user["fullname"] is not None else user['email'].split('@')[0],
            }
        )

        return {
            "response":{"message":"El Código de verificación para el restablecimiento de contraseña ha sido enviado a su correo."},
            "status_http":201
        }