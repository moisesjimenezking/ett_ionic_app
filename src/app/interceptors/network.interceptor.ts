import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  private alertOpen = false;

  constructor(private alertController: AlertController) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        // Error de red (sin conexión, timeout, DNS, etc.)
        if (error.status === 0) {
          this.presentNoConnectionAlert();
        }

        // ⚠️ MUY IMPORTANTE:
        // nunca bloquees el flujo desde un interceptor
        return throwError(() => error);
      })
    );
  }

  private async presentNoConnectionAlert() {
    // Evita duplicados y errores de overlay
    const top = await this.alertController.getTop();
    if (top || this.alertOpen) {
      return;
    }

    this.alertOpen = true;

    const alert = await this.alertController.create({
      header: 'Sin conexión',
      message: 'No tienes conexión a Internet. Verifica tu red para continuar.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            this.alertOpen = false;
          },
        },
      ],
    });

    await alert.present();

    await alert.onDidDismiss();
    this.alertOpen = false;
  }
}
