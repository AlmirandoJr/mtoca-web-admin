import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserEntity } from 'src/app/user/user.entity';
import { UserService } from 'src/app/user/user.service';
import { JobEntity } from '../job.entity';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobs-create',
  templateUrl: './jobs-create.component.html',
  styleUrls: ['./jobs-create.component.css']
})
export class JobsCreateComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<JobsCreateComponent>,
    private userService: UserService,
    private jobService: JobService,
    private formBuilder: FormBuilder) { }

    success :boolean = false;
    failture: boolean = false;
    sucessMessage: string = '';
    errorMessage: string = '';

    form = this.formBuilder.group({
      author: [''],
      name: [''],
      type: [''],
      releaseDate: ['']
    })

    jobTypes: String [] = [];
    authors: UserEntity [] = [];

  ngOnInit(): void {
    this.jobService.getJobtypes().subscribe(
      (type: String []) => {this.jobTypes=type;});

      this.userService.findAuthors()
        .subscribe((u: UserEntity[])=>{ this.authors = u;});
  }

  saveJob(){

    const username:string  =  this.form.controls.author.value;

    const job: JobEntity = {
      id: null,
      creationDate: null,
      createdBy: null,
      updateDate: null,
      updatedBy: null,
      active: null,
      name: this.form.controls.name.value,
      author: new UserEntity(),
      jobType: this.form.controls.type.value,
      code: null , 
      releaseDate:this.form.controls.releaseDate.value,
      jobPhoto :null
    };

    this.jobService.createJob(job,username)
      .subscribe(
        x=>{
          this.success = true;
          this.failture = false;
          this.sucessMessage = 'Trabalho  discografico gravado com sucesso';
          console.log('Trabalho  discografico gravado com sucesso');
          this.form.reset();
        },
        e=>{
          this.failture = true;
          this.success = false;
          this.errorMessage = 'Erro ao gravar trabalho discografico';
          console.error('Erro ao gravar trabalho discografico:',e.message);
        }
    );
  }

}
