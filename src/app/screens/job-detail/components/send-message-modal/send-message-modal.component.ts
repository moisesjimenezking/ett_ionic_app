import { ApiService } from '@/service/api.service';
import { JobModel } from '@/types';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-send-message-modal',
  templateUrl: './send-message-modal.component.html',
  styleUrls: ['./send-message-modal.component.scss'],
})
export class SendMessageModalComponent implements OnInit {
  @Input({ required: true }) job!: JobModel;

  protected message: string = '';

  isAccountCompany = localStorage.getItem('accountType') == 'COMPANY';
  protected isSubmitting = false;


  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit() { }



  sendMessage(message: string, modal: IonModal) {
    if (this.isSubmitting) return; // Evita múltiples clics
    this.isSubmitting = true;

    const body = {
      "user_sending_id": localStorage.getItem('user_id'),
      "user_recept_id": this.job.user_id
    }

    this.apiService.postChats(body)
      .pipe(
        catchError((error) => {
          this.isSubmitting = false;
          return throwError(() => error);
        }),
        switchMap((data: any) => {
          const body = {
            'message': message,
            'chats_id': data.id,
            'jobs_id': this.job.id
          }

          return this.apiService.postMessage(body)
        }),
        tap((_) => {

          this.message = '';
          this.isSubmitting = false;
          this.cdr.detectChanges();
          modal.dismiss();

          this.router.navigateByUrl('/bottom-tab-bar/chats');
        })
      )
      .subscribe({
        error: (error) => {
          // Manejar el error de postChats aquí
          this.isSubmitting = false;
          console.error("Error al crear el chat:", error);
        }
      });
  }

}
