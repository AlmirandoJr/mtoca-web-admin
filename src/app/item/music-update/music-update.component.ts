import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MusicEntity } from '../music';
import { FormBuilder } from '@angular/forms';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-update',
  templateUrl: './music-update.component.html',
  styleUrls: ['./music-update.component.css']
})
export class MusicUpdateComponent implements OnInit {

  constructor(public matDiaLogRef: MatDialogRef<MusicUpdateComponent>,
    @Inject (MAT_DIALOG_DATA) public data: MusicEntity,
    private formBuilder: FormBuilder,
    private musicService: MusicService)  { }

    sucess :boolean=false;
    failture :boolean=false;
    sucessMessage:string = `Dados da musica ` + this.data.code+` actualizados com sucesso`;
    errorMessage:string = `Erro ao actualizar os dados da musica: ` + this.data.code+``;
     


  ngOnInit() {
  }


  form = this.formBuilder.group({
    code: this.data.code,
    author: this.data.author.name,
    price: this.data.price,
    title: this.data.title,
    genre: this.data.genre,
    colaborators: this.data.colaborators,
    releaseDate: this.data.releaseDate
  });

  update(){


    const music = new  MusicEntity()

    
    console.log(this.data.code)
    music.code=this.data.code;
    console.log(music.code)
    music.createdBy=this.data.createdBy;
    music.creationDate=this.data.creationDate;
    music.price=this.form.controls.price.value;
    music.title=this.form.controls.title.value;
    music.genre=this.form.controls.genre.value;
    music.colaborators=this.form.controls.colaborators.value;
    music.releaseDate=this.form.controls.releaseDate.value;


    if(this.data.author.profile.hasOwnProperty('hibernateLazyInitializer')){
        delete  this.data.author.profile.hibernateLazyInitializer;
    }
    music.author=  this.data.author;


    this.musicService.updateMusic(music).subscribe (
        x=>{this.form.reset();
          this.sucess=true;
          this.failture=false;}
        ,x=>{this.failture=true;});
  }

}
