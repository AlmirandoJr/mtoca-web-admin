import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileService } from '../../user/profile.service';
import { UserProfileEntity } from '../../user/user-profile.entity';
import { ItemEntity } from '../item.entity';
import { MusicService } from '../music.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/user/user.service';
import { UserEntity } from 'src/app/user/user.entity';
import { JobService } from '../job.service';
import { JobEntity } from '../job.entity';

@Component({
  selector: 'app-music-create',
  templateUrl: './music-create.component.html',
  styleUrls: ['./music-create.component.css']
})
export class MusicCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MusicCreateComponent> ,
    private formBuilder: FormBuilder,
              private userService: UserService,
              private  musicService: MusicService,
              private jobService: JobService) { }

  artists: UserEntity [] = [];

  jobs: JobEntity [] = [];

  sucess = false;
  failture = false;
  errorMessage = null;
  sucessMessage = null;


  form = this.formBuilder.group({
    author: [''],
    jobs: [''],
    price: [''],
    name: [''],
    genre: [''],
    colaborators: [''],
    releaseDate: ['']
  });

  ngOnInit() {

    this.userService.findUsersByProfileName('artist')
        .subscribe((a:UserEntity [])=> {this.artists = a });
  }

  getJobsByArtist(event){
    const user : UserEntity =  event;

    console.log(user.name)
    
    this.jobService.getJobsByArtist(user.username)
    .subscribe((succeed: JobEntity [] ) =>{
        this.jobs = succeed;
      },
      error=>{
        console.error('Error loading jobs for the artist:',error.message);
      }
    );

       
  }

  saveMusic() {

    const username: string = this.form.controls.author.value;
   
    const music: ItemEntity = {
      id: null,
      creationDate: null,
      createdBy: null,
      updateDate: null,
      updatedBy: null,
      active: null,
      job: null,
      name: this.form.controls.name.value,
      colaborators: this.form.controls.colaborators.value,
      genre: this.form.controls.genre.value,
      price: this.form.controls.price.value,
      releaseDate:this.form.controls.releaseDate.value,
      code: null,
    };

    const selectedJob: JobEntity = this.form.controls.jobs.value

    this.musicService.saveMusic(music, selectedJob.code)
        .subscribe(x => { this.sucess = true;
                          this.sucessMessage = 'Upload da musica efectuado com sucesso!!!'; 
                          this.form.reset();
                        },
                          
                   e => { this.failture = true;
                          this.errorMessage = 'Erro ocorrido ao fazer upload da musica!!!';
                          console.error(e.message);
        });


  }

}
