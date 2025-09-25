import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '@/service/api.service';
import { UtilsLib } from '@/lib/utils';
import { JobModel } from '@/types';

@Component({
  selector: 'app-job-card-not-login',
  templateUrl: './job-card-not-login.component.html',
  styleUrls: ['./job-card-not-login.component.scss'],
})
export class JobCardNotLoginComponent implements OnInit {
  @Input({ required: true }) job!: JobModel;
  @Output() onSeeDetails = new EventEmitter<JobModel>();

  applyButton = 'Iniciar sesión';
  applied: boolean = false;
  
  protected readonly utils = new UtilsLib();

  constructor(private router: Router) { }

  ngOnInit() {}

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }
}
