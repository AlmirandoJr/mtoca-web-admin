import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemEntity } from '../item.entity';
import { FormBuilder } from '@angular/forms';
import { MusicService } from '../music.service';

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

    sucess :boolean=false;
    unsupportedMusicSeqNumber :boolean=false;
    failture :boolean=false;
    sucessMessage:string = `Dados da musica ` + this.data.code+` actualizados com sucesso`;
    errorMessage:string = `Erro ao actualizar os dados da musica: ` + this.data.code+``;
    unsupportedMusicSeqNumberMessage:string ='o numero de faixa dever variar enre 1 a 50'


  ngOnInit() {
  }


  form = this.formBuilder.group({
    code: this.data.code,
    price: this.data.price,
    name: this.data.name,
    genre: this.data.genre,
    colaborators: this.data.colaborators,
    releaseDate: this.data.releaseDate,
    author:  this.data.job.author.name,
    seqNumber: this.data.seqNumber
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
    music.releaseDate=this.form.controls.releaseDate.value;
    music.id = this.data.id;
    music.active = this.data.active;
    music.job = this.data.job;
    music.seqNumber = this.form.controls.seqNumber.value;

    if(music.seqNumber<1 || music.seqNumber>50){
      this.unsupportedMusicSeqNumber =true;
      return;
    }


    this.musicService.updateMusic(music).subscribe (
        sucess=>{this.form.reset();
          this.sucess=true;
          this.failture=false;
          this.unsupportedMusicSeqNumber =false;
        }
        ,error=>{this.failture=true;
          this.sucess=false;
          this.unsupportedMusicSeqNumber =false;
          console.error('error ao actualizar os dados da musica: ',error.message)
        });
  }

}
