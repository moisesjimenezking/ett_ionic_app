import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { catchError, throwError, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NgZone } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  // private apiUrl = 'http://172.20.0.1:1263';
  private apiUrl = "https://d6dsddk6-1263.use2.devtunnels.ms";
  // private apiUrl = 'http://149.50.141.62:1263/'
  // private apiUrl = 'https://api-tunnel.flippoapp.com/proxy/';
  // private apiUrl = 'http://app.ettvenezuela.com:1263/';



  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
    timeout: 20000
  };

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private zone: NgZone
  ) {
    localStorage.setItem('rute', this.apiUrl);
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen)
  }

  redirect(uri: string) {
    return this.router.createUrlTree([uri]);
  }

  async showSpinner() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
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
      buttons: ['OK']
    });

    await alert.present();
  }

  //TODO: REQUEST
  getData() {
    return this.http.get(`${this.apiUrl}/`);
  }

  postToken(data: any) {
    this.showSpinner();
    return this.http.post(`${this.apiUrl}/token`, data, this.options)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
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
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('fullname', response.user.fullname);
          localStorage.setItem('email', response.user.email);
          localStorage.setItem('icon_profile', response.user.icon);
          localStorage.setItem('icon_front', response.user.icon_front);
          localStorage.setItem('social_link', JSON.stringify(response.user.social_link));
          localStorage.setItem('specialization', response.user.specialization);
          localStorage.setItem('phone', response.user.phone);
          localStorage.setItem('address', response.user.address);
          localStorage.setItem('sex', response.user.sex);
          localStorage.setItem('civil_status', response.user.civil_status);
          localStorage.setItem('family_responsibilities', response.user.family_responsibilities);
          localStorage.setItem('birthdate', response.user.birthdate);
          localStorage.setItem('identification', response.user.identification);
          localStorage.setItem('license', response.user.license);
          localStorage.setItem('rif', response.user.rif);
          localStorage.setItem('level_study', response.user.level_study);
          localStorage.setItem('blood_type', response.user.blood_type);
          localStorage.setItem('allergies', response.user.allergies);
          localStorage.setItem('accountType', response.user.account);
          localStorage.setItem('user_id', response.user.id);
          localStorage.setItem('location', response.user.location);
          localStorage.setItem('experienceYear', response.user.experience);
          localStorage.setItem('about', response.user.about);

          this.goTo(localStorage.getItem('accountType') === "PERSON"
            ? 'bottom-tab-bar/home'
            : 'bottom-tab-bar-company/home'
          );
        }
      );
  }

  getVerificEmail(data: any) {
    let params = new HttpParams();
    for (let key in data) {
      params = params.append(key, data[key]);
    }
    // this.showSpinner();
    return this.http.get(`${this.apiUrl}/verific_email`, { params: params })
      .pipe(
        catchError((error) => {
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
      )
      .subscribe(
        (response: any) => {
          localStorage.setItem('fullname', response.fullname);
          localStorage.setItem('email', response.email);
          localStorage.setItem('icon_profile', response.user.icon);
          localStorage.setItem('icon_front', response.user.icon_front);
          localStorage.setItem('social_link', JSON.stringify(response.user.social_link));
          localStorage.setItem('specialization', response.user.specialization);
          localStorage.setItem('phone', response.phone);
          localStorage.setItem('address', response.address);
          localStorage.setItem('sex', response.sex);
          localStorage.setItem('civil_status', response.civil_status);
          localStorage.setItem('family_responsibilities', response.family_responsibilities);
          localStorage.setItem('birthdate', response.birthdate);
          localStorage.setItem('identification', response.identification);
          localStorage.setItem('license', response.license);
          localStorage.setItem('rif', response.rif);
          localStorage.setItem('level_study', response.level_study);
          localStorage.setItem('blood_type', response.blood_type);
          localStorage.setItem('allergies', response.allergies);
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('location', response.location);
          localStorage.setItem('experienceYear', response.experience);
          localStorage.setItem('about', response.about);
        }
      );
  }

  getVerificEmailFalse(data: any) {
    let params = new HttpParams();
    let id = 0;

    for (let key in data) {
      params = params.append(key, data[key]);
    }

    this.http.get(`${this.apiUrl}/verific_email`, { params: params })
      .pipe(
        catchError((error) => {
          let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          if (error.status === 200) {
            this.presentAlert("Este email ya se encuentra registrado");
          }

          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => { })
      )
      .subscribe(
        (response: any) => {
          id = response.id;
          if (id != 0) {
            this.presentAlert("Este email ya se encuentra registrado");
          }
        }
      );
  }

  postUser(data: any) {
    this.showSpinner();
    this.http.post(`${this.apiUrl}/register`, data, this.options)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
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
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('fullname', response.user.fullname);
          localStorage.setItem('email', response.user.email);
          localStorage.setItem('phone', response.user.phone);
          localStorage.setItem('accountType', response.user.account);
          localStorage.setItem('user_id', response.user.id);

          this.goTo(localStorage.getItem('accountType') === "PERSON"
            ? 'bottom-tab-bar/home'
            : 'bottom-tab-bar-company/home'
          );
        }
      );
  }

  allJobsApi(data: any) {
    const request = this.http.get<any[]>(`${this.apiUrl}/jobs`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, params: data });

    request.subscribe({
      error: (error) => {
        let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 200 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.presentAlert(errorMessage);
      },
      complete: () => { }
    });

    return request;
  }


  getChat(data: any) {
    return this.http.get(`${this.apiUrl}/chats`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, params: data });
  }

  postJobs(data: any) {
    let result = true;

    this.http.post(`${this.apiUrl}/jobs`, data, this.options)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          if (error.status !== 201 && error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.presentAlert(errorMessage);
          result = false;
          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => { })
      ).subscribe(
        (response: any) => { }
      );

    return result;
  }

  postChats(data: any) {

    return this.http.post(`${this.apiUrl}/chats`, data, this.options);

  }

  putJobs(data: any) {
    let result = true;

    this.http.put(`${this.apiUrl}/jobs`, data, this.options)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          if (error.status !== 201 && error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.presentAlert(errorMessage);
          result = false;
          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => { })
      ).subscribe(
        (response: any) => { }
      );

    return result;
  }

  postMessage(data: any) {
    return this.http.post(`${this.apiUrl}/messages`, data, this.options);
  }

  putViewsAll(data: any) {
    const request = this.http.put(`${this.apiUrl}/viewsAll`, data, this.options);

    request.subscribe({
      error: (error) => {
        let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 201 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.presentAlert(errorMessage);
      },
      complete: () => { }
    });

    return request
  }

  putUser(data: any) {
    const request = this.http.put(`${this.apiUrl}/user`, data, this.options);

    request.subscribe({
      error: (error) => {
        let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 201 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        if (error.status === 304) {
          errorMessage = "Sin cambios."
        }

        this.presentAlert(errorMessage);
      },
      complete: () => { }
    });

    return request
  }

  getUser() {

    const request = this.http.get(`${this.apiUrl}/user`, this.options);

    request.subscribe({
      error: (error) => {
        let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 200 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.presentAlert(errorMessage);
      },
      complete: () => { }
    });

    return request
  }

  postJobsApplied(data: any) {
    const request = this.http.post(`${this.apiUrl}/applied_jobs`, data, this.options);

    request.subscribe({
      error: (error) => {
        let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 201 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.presentAlert(errorMessage);
      },
      complete: () => { }
    });

    return request
  }

  getWallet() {
    const request = this.http.get(`${this.apiUrl}/wallet`, this.options);

    request.subscribe({
      error: (error) => {
        let errorMessage = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
        if (error.status !== 200 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.presentAlert(errorMessage);
      },
      complete: () => { }
    });

    return request
  }
}
