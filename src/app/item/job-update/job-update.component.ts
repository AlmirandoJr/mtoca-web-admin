import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEntity } from 'src/app/user/user.entity';
import { JobEntity } from '../job.entity';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.css']
})
export class JobUpdateComponent implements OnInit {

  constructor(matDialogRef: MatDialogRef<JobUpdateComponent>,
    private jobService: JobService,
    @Inject (MAT_DIALOG_DATA) public job: JobEntity,
    private formBuilder: FormBuilder) { }

  
jobTypes: String [] = [];
sucessMessage = `Trabalho discografico ${this.job.code} actualizado com sucesso`;
errorMessage: string =`Erro ao actualizar trabalho discografico ${this.job.code}`;
sucess: boolean= false;
failture: boolean = false;

  ngOnInit(): void {

    this.jobService.getJobtypes()
      .subscribe((x: String[])=>{this.jobTypes =x;})
  }

  form = this.formBuilder.group({
    code: this.job.code,
    name: this.job.name,
    price: this.job.price,
    author: this.job.author.name,
    type: this.job.jobType,
    releaseDate: this.job.releaseDate
  });

  updateJob(){
    const  username:string = this.job.author.username;
    this.job.jobType = this.form.controls.type.value;
    this.job.name = this.form.controls.name.value;
    this.job.releaseDate = this.form.controls.releaseDate.value;
    this.job.price =  this.form.controls.price.value;

    this.jobService.updateJob(this.job,username)
      .subscribe(
        succeed => {this.failture =false;
                    this.sucess = true;
                    console.log(`Trabalho discografico ${this.job.code} actualizado com sucesso`);
                    this.form.reset();
        },
        (error: HttpErrorResponse) => {
                    this.failture =true;
                    this.sucess = false;
                    this.errorMessage = error.error.message+"";
                    console.error(`Erro ao actualizar trabalho discografico ${this.job.code}`)
        });

  }



}
