from flask import jsonify, request, make_response
from create_app import app
from modules.user.model import Users
from . import handle_error_user, getRequestData


@app.route('/user',                  methods=['GET','PUT'])
@app.route('/all_user',              methods=['GET'])
@app.route('/register',              methods=['POST'])
@app.route('/user/create_admin',     methods=['POST'])
@app.route('/user/update_admin',     methods=['PUT'])
@app.route('/verific_email',         methods=['GET'])
@app.route('/user/update_status',    methods=['PUT'])
@app.route('/user/email_verific',    methods=['GET'])
@app.route('/user/recover_password', methods=['GET'])
@app.route('/company/all',           methods=['GET'])
@app.route('/user/activate',         methods=['GET'])
def controllerUser():
    try:
        listRoutes = {
            "/user"                  : [Users.getData,          "/getUser"],
            "/all_user"              : [Users.getDataAll,       "/all_user"],
            "/register"              : [Users.postData,         "/postUser"],
            "/user_put"              : [Users.putData,          "/putUser"],
            "/user/create_admin"     : [Users.postData,         "/create_admin"],
            "/user/update_admin"     : [Users.putData,          "/update_admin"],
            "/verific_email"         : [Users.verificEmail,     "/verify_email"],
            "/user/update_status"    : [Users.updateStatus,     "/update_status"],
            # "/user/email_verific"    : [Users.emailVerific,     "/email_verific"],
            "/user/recover_password" : [Users.recoverPassword,  "/recover_password"],
            "/company/all"           : [Users.allCompany,       "/getUser"],
            "/user/activate"         : [Users.activate,         "/activate"],
        }

        key = (
            request.path+"_"+request.method.lower()
            if request.path+"_"+request.method.lower() in listRoutes
            else request.path
        )

        if key not in listRoutes:
            raise Exception("Método no accesible.", 405)

        data = getRequestData(listRoutes[key][1])
        if data["status_http"] != 200:
            raise Exception(data["error"], data["status_http"])
            
        method = listRoutes[key][0].__get__(None, Users)
        
        response = method(data["data"])
        
    except Exception as e:
        dataError = {
            "message": e.args[0] if len(e.args) > 1 else "Se ha producido un error en la aplicación. Por favor, intenta nuevamente más tarde.",
            "error": str(e),
            "status_http": e.args[1] if len(e.args) > 1 else 400,
            "query": data["data"] or None
        }
        
        response = handle_error_user(dataError)
    
    response = make_response(jsonify(response["response"]), response["status_http"])
    response = headerResponse(response)
    return response

def headerResponse(response):
    response.headers['Content-Type']    = 'application/json'
    response.headers['Accept-Encoding'] = 'gzip'
    return response