import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobEntity } from '../job.entity';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-photo-upload',
  templateUrl: './job-photo-upload.component.html',
  styleUrls: ['./job-photo-upload.component.css']
})
export class JobPhotoUploadComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<JobPhotoUploadComponent>,
    private formBuilder: FormBuilder,
    private jobService: JobService,
   @Inject (MAT_DIALOG_DATA) public jobData: JobEntity ){}
    

  sucessPhoto: boolean = false;
  failturePhoto: boolean = false;
  sucessMessagePhoto: string = 'Imagem do trabalho discografico carregado com sucesso';
  errorMessagePhoto: string = 'Erro ao carregar Imagem do trabalho discografico';
  photoProgress:  { percentage: number } = { percentage: 0 }; 
  photoContent: File;
  jobPhoto:any;


  ngOnInit(): void {
    this.jobService.downLoadPhoto(this.jobData.code)
      .subscribe((baseImage : any) => {
      this.createImageFromBlob(baseImage);
    } );

  }

  formPhoto = this.formBuilder.group({
    photoContent: new FormControl('')
  });

  selectPhotoFile(event){
    this.photoContent  = event.target.files[0];
    console.log('>>>>>>>>>'  +this.photoContent);
  }

  loadPhoto(){
  
    //this.photoContent  = this.formPhoto.controls.photo.value;
    const formData = new FormData();
    console.log(this.photoContent);
    
    formData.append('photo',this.photoContent,this.photoContent.name);
    console.log(formData.get('photo')); 

    this.jobService.uploadPhoto(this.jobData.code,formData) 
          .subscribe(event =>{ 
            if(event.type===HttpEventType.UploadProgress){
              this.photoProgress.percentage = Math.round(100 * event.loaded / event.total);
            }
            else  if(event.type===HttpEventType.Response){
              this.sucessPhoto =true; 
              this.failturePhoto=false;

              this.jobService.downLoadPhoto(this.jobData.code)
              .subscribe((baseImage : any) => {
              this.createImageFromBlob(baseImage);
            } );
            this.formPhoto.reset();
            }
            this.sucessPhoto=false;},
                    e => {this.failturePhoto=true;});
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.jobPhoto = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
