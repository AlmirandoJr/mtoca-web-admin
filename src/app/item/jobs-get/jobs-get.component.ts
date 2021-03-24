import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JobDeleteComponent } from '../job-delete/job-delete.component';
import { JobPhotoUploadComponent } from '../job-photo-upload/job-photo-upload.component';
import { JobUpdateComponent } from '../job-update/job-update.component';
import { JobEntity } from '../job.entity';
import { JobService } from '../job.service';
import { JobsCreateComponent } from '../jobs-create/jobs-create.component';

@Component({
  selector: 'app-jobs-get',
  templateUrl: './jobs-get.component.html',
  styleUrls: ['./jobs-get.component.css']
})
export class JobsGetComponent implements OnInit {

  constructor(private jobService: JobService,
    private matDialog:MatDialog) { }

  jobs: JobEntity []= [];
  title: string = 'Trabalhos discograficos';

  ngOnInit(): void {
    this.jobService.getAllJobs()
    .subscribe(
      x => { this.jobs = x; },
      e => { console.error(e); } );
  }
  openNewJobDialog(){
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = false;
    matDialogConfig.height = '600px';
    matDialogConfig.width = '800px';
    matDialogConfig.id = 'newJob';

   const dialog = this.matDialog.open(JobsCreateComponent,matDialogConfig);
    dialog.afterClosed().subscribe(x => {this.ngOnInit()});
  }

  openUpdateJobDialog(job: JobEntity){

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.height = '600px';
    matDialogConfig.width = '800px';
    matDialogConfig.id= 'updateJob';
    matDialogConfig.data = job;

    this.matDialog.open(JobUpdateComponent, matDialogConfig);

  }

  openDeleteJobDialog(job: JobEntity){
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.height = '200px';
    matDialogConfig.width = '800px';
    matDialogConfig.id= 'updateJob';
    matDialogConfig.data = job;

    this.matDialog.open(JobDeleteComponent, matDialogConfig);

  }

  openUploadPhoto( job: JobEntity){
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = "800px"
    matDialogConfig.height = "300px";
    matDialogConfig.data = job;

    this.matDialog.open(JobPhotoUploadComponent,matDialogConfig);
  }

}
