import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileService } from '../../user/profile.service';
import { UserProfileEntity } from '../../user/user-profile.entity';
import { MusicEntity } from '../music';
import { MusicService } from '../music.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/user/user.service';
import { UserEntity } from 'src/app/user/user.entity';

@Component({
  selector: 'app-music-create',
  templateUrl: './music-create.component.html',
  styleUrls: ['./music-create.component.css']
})
export class MusicCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MusicCreateComponent> ,
    private formBuilder: FormBuilder,
              private userService: UserService,
              private  musicService: MusicService) { }

  artists: UserEntity [] = [];

  sucess = false;
  failture = false;
  errorMessage = null;
  sucessMessage = null;


  form = this.formBuilder.group({
    author: [''],
    price: [''],
    title: [''],
    genre: [''],
    colaborators: [''],
    releaseDate: ['']
  });

  ngOnInit() {

    this.userService.findUsersByProfileName('artist')
        .subscribe((a:UserEntity [])=> {this.artists = a });
  }

  saveMusic() {

    const username: string = this.form.controls.author.value;
   
    const music: MusicEntity = {
      id: null,
      creationDate: null,
      createdBy: null,
      updateDate: null,
      updatedBy: null,
      active: null,
      author: null,
      title: this.form.controls.title.value,
      colaborators: this.form.controls.colaborators.value,
      genre: this.form.controls.genre.value,
      price: this.form.controls.price.value,
      releaseDate:this.form.controls.releaseDate.value,
      code: null,
      job: null
    };

    this.musicService.saveMusic(music, username)
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
