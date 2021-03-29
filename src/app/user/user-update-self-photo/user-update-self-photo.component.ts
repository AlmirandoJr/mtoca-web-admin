import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUtils } from 'src/app/generic/FileUtils';
import { UserEntity } from '../user.entity';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update-self-photo',
  templateUrl: './user-update-self-photo.component.html',
  styleUrls: ['./user-update-self-photo.component.css']
})
export class UserUpdateSelfPhotoComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<UserUpdateSelfPhotoComponent>,
   private  userService: UserService,
    @Inject (MAT_DIALOG_DATA) public user: UserEntity,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer) { }


  ngOnInit(): void {


    this.userService.downLoadPhoto(this.user.username)
      .subscribe((baseImage : any) => {
        this.createImageFromBlob(baseImage);
      } );
  }

  sucessLoading: boolean = false;
  sucessLoadingMessage: string = 'Foto do utilizador carrgado com sucesso';

  failtureLoading: boolean = false;
  failtureLoadingMessage: string = 'Erro ocorreu ao carregar foto do utilizador';

  photoProgress:{percentage :number}={percentage :0};
  photoContent: File;

  userPhoto: any;



  form = this.formBuilder.group({
    photoContent: new FormControl('')
  });

  loadPhoto(){

    const formData = new FormData();
    console.log(this.photoContent);
    
    formData.append('photo',this.photoContent,this.photoContent.name);
    console.log(formData.get('photo')); 

    this.userService.uploadPhoto(this.user.username,formData) 
          .subscribe(event =>{ 
            if(event.type===HttpEventType.UploadProgress){
              this.photoProgress.percentage = Math.round(100 * event.loaded / event.total);
            }
            else  if(event.type===HttpEventType.Response){
              this.sucessLoading =true; 
              this.failtureLoading=false;

              this.userService.downLoadPhoto(this.user.username)
                .subscribe((baseImage : any) => {
                  this.createImageFromBlob(baseImage)});
              this.form.reset();
            }
            this.sucessLoading=false;},
                    e => {this.failtureLoading=true;});

  }

  selectPhotoFile(event){
    this.photoContent  = event.target.files[0];
    console.log('>>>>>>>>>'  +this.photoContent);
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.userPhoto = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
