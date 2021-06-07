import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobEntity } from '../job.entity';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-delete',
  templateUrl: './job-delete.component.html',
  styleUrls: ['./job-delete.component.css']
})
export class JobDeleteComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<JobDeleteComponent>,
    private jobService: JobService,
    @Inject (MAT_DIALOG_DATA) public job: JobEntity) { }

  ngOnInit(): void {
  }
  success: boolean =false;
  failture: boolean =false;
  sucessMessage: string = `Removido com sucesso o ${this.job.jobType} - ${this.job.code} e suas musicas associadas`;
  failtureFailture: string = 'Erro ao remover  o trabalho discografico';


  deleteJob(event){
    this.jobService.deleteJob(this.job.code)
      .subscribe(
        succeed => { 
          event.target.disabled = true;
          this.success = true;
          this.failture = false;
        },
        (error: HttpErrorResponse) => {
          this.success = false;
          this.failture = true;
          this.failtureFailture = error.error.message+"";

        });
  }

  cancel(){
    this.matDialogRef.close();
  }


}
