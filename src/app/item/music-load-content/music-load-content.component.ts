import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemEntity } from '../item.entity';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MusicService } from '../music.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-music-load-content',
  templateUrl: './music-load-content.component.html',
  styleUrls: ['./music-load-content.component.css']
})
export class MusicLoadContentComponent implements OnInit {

  constructor(public matDiaLogRef: MatDialogRef<MusicLoadContentComponent>,
             @Inject (MAT_DIALOG_DATA) public data: ItemEntity,
             private formBuilder: FormBuilder,
             private musicService: MusicService) { }

             musicData: ItemEntity;
             photoContent: File;
             musicContent: File;

             details:string = null;
  ngOnInit() {
    this.musicData =  this.data;
    this.details = this.musicData.name +' '+ this.musicData.code;
  }
  sucessPhoto :boolean = false;
  failturePhoto :boolean = false;
  sucessMessagePhoto :string = 'Foto da musica carregada com sucesso';
  errorMessagePhoto :string = 'Erro ao carregar Foto musica';
  photoProgress:  { percentage: number } = { percentage: 0 }; 

  sucessMusic :boolean = false;
  failtureMusic :boolean = false;
  sucessMessageMusic :string = 'Musica carregada com sucesso';
  errorMessageMusic :string ='Erro ao carregar a musica';
  musicProgress: { percentage: number } = { percentage: 0 }; 


  formPhoto = this.formBuilder.group({
    photoContent: new FormControl('')
  });

  formMusic = this.formBuilder.group({
    content: new FormControl('')
  });

  selectPhotoFile(event){
    this.photoContent  = event.target.files[0];
    console.log('>>>>>>>>>'  +this.photoContent);
  }

  selectMusicFile(event){
    this.musicContent  = event.target.files[0];
    console.log('>>>>>>>>>'  +this.musicContent);
  }
   

  loadPhoto(){
  
    //this.photoContent  = this.formPhoto.controls.photo.value;
    const formData = new FormData();
    console.log(this.photoContent);
    
    formData.append('photo',this.photoContent,this.photoContent.name);
    console.log(formData.get('photo')); 

    this.musicService.uploadPhoto(this.musicData.code,formData) 
          .subscribe(event =>{ 
            if(event.type===HttpEventType.UploadProgress){
              this.photoProgress.percentage = Math.round(100 * event.loaded / event.total);
            }
            else  if(event.type===HttpEventType.Response){
              this.sucessPhoto =true; 
            }
            this.sucessPhoto=true;},
                    e => {this.failturePhoto=true;});
  }

  loadMusic(){

    const formData = new FormData();
    console.log(this.musicContent);
    
    formData.append('content',this.musicContent,this.musicContent.name);
    console.log(formData.get('content')); 

    this.musicService.uploadMusic(this.musicData.code,formData) 
          .subscribe(event =>{ 
            if(event.type===HttpEventType.UploadProgress){
              this.musicProgress.percentage = Math.round(100 * event.loaded / event.total);
            }
            else  if(event.type===HttpEventType.Response){
              this.sucessMusic =true; 
              this.failtureMusic=false;
            }
            this.sucessMusic=true;},
                    e => {this.failtureMusic=true;});
  }
}
