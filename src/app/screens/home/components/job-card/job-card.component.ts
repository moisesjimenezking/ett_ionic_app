import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, switchMap } from 'rxjs';
import { ApiService } from '@/service/api.service';
import { UtilsLib } from '@/lib/utils';
import { JobModel } from '@/types';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class JobCardComponent implements OnInit {
  @Input({ required: true }) job!: JobModel;
  @Output() onSeeDetails = new EventEmitter<JobModel>();

  readonly fullName = localStorage.getItem('fullname')
  readonly isCompanyAccount = localStorage.getItem('accountType') === "COMPANY" ? true : false;

  isApplying = false;
  applied: boolean = false;
  applyButton = 'Postularme';

  protected readonly utils = new UtilsLib();

  constructor(
    private readonly apiService: ApiService,
  ) { }

  ngOnInit() {
    this.applied = this.job.appliedUser;
    if (this.applied) {
      this.applyButton = 'Postulación enviada'
    }
  }


  goToDetails() {
    this.onSeeDetails.emit(this.job);
  }

  details() {
    const storedItemString = localStorage.getItem('jobs');
    if (storedItemString) {
      return JSON.parse(storedItemString);
    } else {
      return {};
    }
  }

  applicateJob() {
    if (!this.applied) {
      const body = {
        "jobs_id": this.job.id
      }

      this.isApplying = true;
      this.apiService.postJobsApplied(body)
        .pipe(

          catchError((error) => {
            this.isApplying = false;
            return error;
          }),
          switchMap(() => this.apiService.allJobsApi({ id: this.job.id })

          )
        )
        .subscribe({
          next: (jobs) => {
            const job = jobs.find(j => j.id == this.job.id)!;
            localStorage.setItem('jobs', JSON.stringify(job));
            this.job = job;
            this.applied = this.job.appliedUser;
            this.applyButton = this.applied
              ? "Postulación enviada"
              : "Postularme";
            this.isApplying = false;

          },
          error: () => {
            this.isApplying = false;
          }
        });
    }
  }

}
