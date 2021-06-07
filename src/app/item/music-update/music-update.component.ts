import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemEntity } from '../item.entity';
import { FormBuilder } from '@angular/forms';
import { MusicService } from '../music.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-music-update',
  templateUrl: './music-update.component.html',
  styleUrls: ['./music-update.component.css']
})
export class MusicUpdateComponent implements OnInit {

  constructor(public matDiaLogRef: MatDialogRef<MusicUpdateComponent>,
    @Inject (MAT_DIALOG_DATA) public data: ItemEntity,
    private formBuilder: FormBuilder,
    private musicService: MusicService)  { }

    freeItemArrayValues: boolean [] = [false,true];


    sucess :boolean=false;
    unsupportedMusicSeqNumber :boolean=false;
    failture :boolean=false;
    sucessMessage :string = `Dados da musica ` + this.data.code+` actualizados com sucesso`;
    errorMessage :string = `Erro ao actualizar os dados da musica: ` + this.data.code+``;
    unsupportedMusicSeqNumberMessage :string ='o numero de faixa dever variar enre 1 a 50';
    genreTypes: string[]=['Afro',
    'Afro House',
    'Afro Pop',
    'Afro Jazz',
    'Amapiano',
    'Blues',
    'Clássica / Erudita',
    'Funana',
    'Funk',
    'Gospel',
    'Hip Hop / Rap',
    'House',
    'Jazz',
    'Kwassa Kwassa',
    'Latina',
    'Marrabenta',
    'Pandza',
    'Pop',
    'Ragga / Dancehall',
    'Reggae',
    'R & B / Soul',
    'Rock',
    'Samba',
    'Semba',
    'Zouk / Kizomba'];



  ngOnInit() {
  }


  form = this.formBuilder.group({
    code: this.data.code,
    price: this.data.price,
    name: this.data.name,
    genre: this.data.genre,
    colaborators: this.data.colaborators,
    author:  this.data.job.author.name,
    seqNumber: this.data.seqNumber,
    isFreeItem: this.data.freeItem
  
  });

  update(){


    const music = new  ItemEntity()
    
    console.log(this.data.code)
    music.code=this.data.code;
    console.log(music.code)
    music.createdBy=this.data.createdBy;
    music.creationDate=this.data.creationDate;
    music.price=this.form.controls.price.value;
    music.name=this.form.controls.name.value;
    music.genre=this.form.controls.genre.value;
    music.colaborators=this.form.controls.colaborators.value;
    music.id = this.data.id;
    music.active = this.data.active;
    music.job = this.data.job;
    music.seqNumber = this.form.controls.seqNumber.value;
    music.freeItem = this.form.controls.isFreeItem.value;

    console.log(music);

    if(music.seqNumber<1 || music.seqNumber>50){
      this.unsupportedMusicSeqNumber =true;
      return;
    }


    this.musicService.updateMusic(music).subscribe (
        sucess=>{
          this.sucess=true;
          this.failture=false;
          this.unsupportedMusicSeqNumber =false;
          this.form.reset();
        }
        ,(error: HttpErrorResponse)=>{this.failture=true;
          this.sucess=false;
          
          this.errorMessage = error.error.message+"";
          
          this.unsupportedMusicSeqNumber =false;
          console.error(error.error)
        });
  }

}
