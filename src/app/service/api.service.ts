import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { catchError, throwError, finalize, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';
import { ChatMessage, JobModel } from '@/types';
import { FirebaseMessagingService } from '../firebase-messaging.service';
import { Capacitor } from '@capacitor/core';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://ettapi.com';
  private apiPrefixUrl = 'https://ettapi.com/api/ett/v1/';
  // private apiUrl = "http://127.0.0.1:1263";

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
    timeout: 20000,
  };

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      timeout: 20000,
    };
  }

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private zone: NgZone,
    private fcmService: FirebaseMessagingService
  ) {
    localStorage.setItem('rute', this.apiUrl);
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  redirect(uri: string) {
    return this.router.createUrlTree([uri]);
  }

  async showSpinner() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
  }

  async hideSpinner() {
    await this.loadingController.dismiss();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //TODO: REQUEST
  getData() {
    return this.http.get(`${this.apiUrl}/`);
  }

  postTokenByCode(code: string) {
    const body = { code, fcm_code: 'ANDROID' };
    this.showSpinner();
    return this.http
      .post(`${this.apiUrl}/tokenByCode`, body, this.getOptions())
      .pipe(
        catchError((error) => {
          if (error.status === 0 || error.message === 'Sin conexión a Internet') {
            return throwError(() => error);
          }

          let errorMessage =
            'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          if (error.status !== 201 && error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.hideSpinner();
          this.presentAlert(errorMessage);
          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => {
          this.hideSpinner();
        })
      )
      .subscribe((response: any) => {
        localStorage.clear();

        localStorage.setItem('token', response.token);
        localStorage.setItem('fullname', response.user.fullname);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('icon_profile', response.user?.icon ?? '');
        localStorage.setItem('icon_front', response.user?.icon_front ?? '');
        localStorage.setItem(
          'social_link',
          response.user?.social_link
            ? JSON.stringify(response.user.social_link)
            : ''
        );
        localStorage.setItem(
          'specialization',
          response.user?.specialization ?? ''
        );
        localStorage.setItem('phone', response.user?.phone ?? '');
        localStorage.setItem('address', response.user?.address ?? '');
        localStorage.setItem('sex', response.user?.sex ?? '');
        localStorage.setItem('civil_status', response.user?.civil_status ?? '');
        localStorage.setItem(
          'family_responsibilities',
          response.user?.family_responsibilities ?? ''
        );
        localStorage.setItem('birthdate', response.user?.birthdate ?? '');
        localStorage.setItem(
          'identification',
          JSON.stringify({
            text: response.user.identification_text ?? '',
            img: response.user.identification_img ?? '',
          })
        );
        localStorage.setItem(
          'license',
          JSON.stringify({
            text: response.user.license_text ?? '',
            img: response.user.license_img ?? '',
          })
        );
        localStorage.setItem(
          'rif',
          JSON.stringify({
            text: response.user.rif_text ?? '',
            img: response.user.rif_img ?? '',
          })
        );
        localStorage.setItem('level_study', response.user?.level_study ?? '');
        localStorage.setItem('blood_type', response.user?.blood_type ?? '');
        localStorage.setItem('allergies', response.user?.allergies ?? '');
        localStorage.setItem(
          'accountType',
          response.user?.account?.toUpperCase() ?? 'PERSON'
        );
        localStorage.setItem('user_id', response.user.id);
        localStorage.setItem('location', response.user?.location ?? '');
        localStorage.setItem('experienceYear', response.user?.experience ?? '');
        localStorage.setItem('about', response.user?.about ?? '');
        localStorage.setItem('skills', response.user?.skills ?? '');

        this.zone.run(() => {
          this.goTo(
            localStorage.getItem('accountType') === 'PERSON'
              ? 'bottom-tab-bar/home'
              : 'bottom-tab-bar-company/home'
          );
        });
      });
  }

  async postToken(data: any) {
    if (Capacitor.getPlatform() !== 'web') {
      try {
        const fcmToken = await this.fcmService.waitForToken();
        data.fcm_code = fcmToken;
      } catch (err) {
        console.warn('FCM token no disponible:', err);
      }
    } else {
      console.log('Ejecutando en web, no se obtiene FCM token');
      data.fcm_code = 'WEB'; // o un string temporal para testing
    }

    console.log('Datos para login:', data);
    this.showSpinner();
    return this.http
      .post(`${this.apiUrl}/token`, data, this.getOptions())
      .pipe(
        catchError((error) => {
          if (error.status === 0 || error.message === 'Sin conexión a Internet') {
            return throwError(() => error);
          }

          let errorMessage =
            'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          if (error.status !== 201 && error.error && error.error.message) {
            errorMessage = error.error.message;
          }

          this.hideSpinner();
          this.presentAlert(errorMessage);

          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => {
          this.hideSpinner();
        })
      )
      .subscribe((response: any) => {
        localStorage.clear();
        localStorage.setItem('token', response.token);
        localStorage.setItem('fullname', response.user.fullname);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('icon_profile', response.user?.icon ?? '');
        localStorage.setItem('icon_front', response.user?.icon_front ?? '');
        localStorage.setItem(
          'social_link',
          response.user?.social_link
            ? JSON.stringify(response.user.social_link)
            : ''
        );
        localStorage.setItem(
          'specialization',
          response.user?.specialization ?? ''
        );
        localStorage.setItem('phone', response.user?.phone ?? '');
        localStorage.setItem('address', response.user?.address ?? '');
        localStorage.setItem('sex', response.user?.sex ?? '');
        localStorage.setItem('civil_status', response.user?.civil_status ?? '');
        localStorage.setItem(
          'family_responsibilities',
          response.user?.family_responsibilities ?? ''
        );
        localStorage.setItem('birthdate', response.user?.birthdate ?? '');
        localStorage.setItem(
          'identification',
          JSON.stringify({
            text: response.user.identification_text ?? '',
            img: response.user.identification_img ?? '',
          })
        );
        localStorage.setItem(
          'license',
          JSON.stringify({
            text: response.user.license_text ?? '',
            img: response.user.license_img ?? '',
          })
        );
        localStorage.setItem(
          'rif',
          JSON.stringify({
            text: response.user.rif_text ?? '',
            img: response.user.rif_img ?? '',
          })
        );
        localStorage.setItem('level_study', response.user?.level_study ?? '');
        localStorage.setItem('blood_type', response.user?.blood_type ?? '');
        localStorage.setItem('allergies', response.user?.allergies ?? '');
        localStorage.setItem(
          'accountType',
          response.user?.account?.toUpperCase() ?? 'PERSON'
        );
        localStorage.setItem('user_id', response.user.id);
        localStorage.setItem('location', response.user?.location ?? '');
        localStorage.setItem('experienceYear', response.user?.experience ?? '');
        localStorage.setItem('about', response.user?.about ?? '');
        localStorage.setItem('skills', response.user?.skills ?? '');

        this.goTo(
          localStorage.getItem('accountType') === 'PERSON'
            ? 'bottom-tab-bar/home'
            : 'bottom-tab-bar-company/home'
        );

        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
  }

  changePass(data: any): Observable<any> {
    this.showSpinner();

    return this.http
      .post(`${this.apiUrl}/user/change_password`, data, { observe: 'response' })
      .pipe(
        catchError((error) => {
          if (error.status === 0 || error.message === 'Sin conexión a Internet') {
            return throwError(() => error);
          }

          let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          if (error.status !== 201 && error.error?.message) {
            errorMessage = error.error.message;
          }

          this.hideSpinner();
          this.presentAlert(errorMessage);

          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => {
          this.hideSpinner();
        })
      );
  }


  getVerificCode(data: any) {
    let params = new HttpParams();
    for (let key in data) {
      params = params.append(key, data[key]);
    }
    return this.http
      .get(`${this.apiUrl}/user/validate_code`, { params: params })
      .pipe(
        catchError((error) => {
          if (error.status === 0 || error.message === 'Sin conexión a Internet') {
            return throwError(() => error);
          }

          let errorMessage =
            'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          if (error.status !== 200 && error.error && error.error.message) {
            errorMessage = error.error.message;
          }

          this.presentAlert(errorMessage);

          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => {
          this.hideSpinner();
        })
      )
      .subscribe((response: any) => {}
    );
  }

  getVerificEmail(data: any) {
    let params = new HttpParams();

    for (let key in data) {
      params = params.append(key, data[key]);
    }

    return this.http.get<any>(`${this.apiUrl}/verific_email`, { params });
  }

  getRecoverPassEmail(data: any): Observable<any> {
    let params = new HttpParams();
    for (let key in data) {
      params = params.append(key, data[key]);
    }

    this.showSpinner();

    return this.http
      .get(`${this.apiUrl}/user/recover_password`, { params })
      .pipe(
        catchError((error) => {
          if (error.status === 0 || error.message === 'Sin conexión a Internet') {
            return throwError(() => error);
          }

          let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          if (error.status !== 200 && error.error && error.error.message) {
            errorMessage = error.error.message;
          }

          this.presentAlert(errorMessage);
          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => {
          this.hideSpinner();
        })
      );
  }

  getVerificEmailFalse(data: any) {
    let params = new HttpParams();
    let id = 0;

    for (let key in data) {
      params = params.append(key, data[key]);
    }

    this.http
      .get(`${this.apiUrl}/verific_email`, { params: params })
      .pipe(
        catchError((error) => {
          if (error.status === 0 || error.message === 'Sin conexión a Internet') {
            return throwError(() => error);
          }

          let errorMessage =
            'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          if (error.status === 200) {
            this.presentAlert('Este email ya se encuentra registrado');
          }

          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => {})
      )
      .subscribe((response: any) => {
        id = response.id;
        if (id != 0) {
          this.presentAlert('Este email ya se encuentra registrado');
        }
      });
  }

  postUser(data: any): Observable<any> {
    this.showSpinner();

    return this.http.post(`${this.apiUrl}/register`, data, this.getOptions()).pipe(
      catchError((error) => {
        if (error.status === 0 || error.message === 'Sin conexión a Internet') {
          return throwError(() => error);
        }

        let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 201 && error.error?.message) {
          errorMessage = error.error.message;
        }
        this.hideSpinner();
        this.presentAlert(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => this.hideSpinner())
    );
  }

  allJobsApi(data: any, opts?: { showError?: boolean }) {
    const request = this.http.get<JobModel[]>(`${this.apiUrl}/jobs`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      params: data,
    });

    return request.pipe(
      catchError((error) => {
        if (error.status === 0 || error.message === 'Sin conexión a Internet') {
          return throwError(() => error);
        }

        let errorMessage =
          'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 200 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        if (opts?.showError) {
          this.presentAlert(errorMessage);
        }
        return throwError(() => error);
      })
    );
  }

  allJobsApiFree(data: any, opts?: { showError?: boolean }) {
    const request = this.http.get<JobModel[]>(`${this.apiUrl}/jobs-free`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      params: data,
    });

    return request.pipe(
      catchError((error) => {
        if (error.status === 0 || error.message === 'Sin conexión a Internet') {
          return throwError(() => error);
        }

        let errorMessage =
          'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 200 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        if (opts?.showError) {
          this.presentAlert(errorMessage);
        }
        return throwError(() => error);
      })
    );
  }

  getChat(data: any) {
    return this.http.get<ChatMessage | ChatMessage[]>(`${this.apiUrl}/chats`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      params: data,
    });
  }

  getUserChat(data: any) {
    return this.http.get<ChatMessage | ChatMessage[]>(`${this.apiUrl}/chats`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      params: data,
    });
  }

  postJobs(data: any) {
    return this.http.post(`${this.apiUrl}/jobs`, data, this.getOptions()).pipe(
      catchError((error) => {
        if (error.status === 0 || error.message === 'Sin conexión a Internet') {
          return throwError(() => error);
        }

        let errorMessage =
          'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 201 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.presentAlert(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {})
    );
  }

  postChats(data: any) {
    return this.http.post(`${this.apiUrl}/chats`, data, this.getOptions());
  }

  putJobs(data: any) {
    return this.http
      .put<JobModel>(`${this.apiUrl}/jobs`, data, this.getOptions())
      .pipe(
        catchError((error) => {
          if (error.status === 0 || error.message === 'Sin conexión a Internet') {
            return throwError(() => error);
          }
          let errorMessage =
            'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          if (error.status !== 201 && error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.presentAlert(errorMessage);
          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => {})
      );
  }

  postMessage(data: any) {
    return this.http.post(`${this.apiUrl}/messages`, data, this.getOptions());
  }

  putViewsAll(data: any) {
    const request = this.http.put(
      `${this.apiUrl}/viewsAll`,
      data,
      this.getOptions()
    );

    request.subscribe({
      error: (error) => {
        let errorMessage =
          'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 201 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.presentAlert(errorMessage);
      },
      complete: () => {},
    });

    return request;
  }

  deleteUser() {
    const request = this.http.delete(`${this.apiUrl}/user`, this.getOptions());

    return request.pipe(
      catchError((error) => {
        if (error.status === 0 || error.message === 'Sin conexión a Internet') {
          return throwError(() => error);
        }

        let errorMessage = 'Error al eliminar la cuenta. Por favor, inténtalo de nuevo.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.presentAlert(errorMessage);
        return throwError(() => error);
      })
    );
  }


  putUser(data: any) {
    const request = this.http.put(`${this.apiUrl}/user`, data, this.getOptions());

    return request.pipe(
      catchError((error) => {
        if (error.status === 0 || error.message === 'Sin conexión a Internet') {
          return throwError(() => error);
        }

        let errorMessage =
          'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 201 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        if (error.status === 304) {
          errorMessage = 'Sin cambios.';
        }

        this.presentAlert(errorMessage);
        return throwError(() => error);
      })
    );
  }

  getUser() {
    const request = this.http.get(`${this.apiUrl}/user`, this.getOptions());

    request.subscribe({
      error: (error) => {
        let errorMessage =
          'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 200 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.presentAlert(errorMessage);
      },
      complete: () => {},
    });

    return request;
  }

  postJobsApplied(data: any) {
    const request = this.http.post(
      `${this.apiUrl}/applied_jobs`,
      data,
      this.getOptions()
    );

    return request.pipe(
      catchError((error) => {
        if (error.status === 0 || error.message === 'Sin conexión a Internet') {
          return throwError(() => error);
        }

        let errorMessage =
          'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 201 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.presentAlert(errorMessage);
        return throwError(() => error);
      })
    );
  }

  getWallet() {
    const request = this.http.get(`${this.apiUrl}/wallet`, this.getOptions());

    request.subscribe({
      error: (error) => {
        let errorMessage =
          'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 200 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.presentAlert(errorMessage);
      },
      complete: () => {},
    });

    return request;
  }

  getUserByPhone(phone: string): Observable<any> {

    const request = this.http.get(`${this.apiUrl}/user/search_phone?phone=${encodeURIComponent(phone)}`, this.getOptions());

    request.subscribe({
      error: (error) => {
        let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 200 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.presentAlert(errorMessage);
      },
      complete: () => {},
    });

    return request;
  }

  getPotentialEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPrefixUrl}/potentialEmployee`, this.getOptions());
  }

  getPotentialEmployeesJobs(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPrefixUrl}/potentialEmployee?jobs_id=${id}`, this.getOptions());
  }
}
