import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicCreateComponent } from './music-create/music-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MusicGetComponent } from './music-get/music-get.component';
import { MusicLoadContentComponent } from './music-load-content/music-load-content.component';
import { MusicUpdateComponent } from './music-update/music-update.component';
import { MusicDeleteComponent } from './music-delete/music-delete.component';
import { JobsGetComponent } from './jobs-get/jobs-get.component';
import { JobsCreateComponent } from './jobs-create/jobs-create.component';
import { JobUpdateComponent } from './job-update/job-update.component';
import { JobDeleteComponent } from './job-delete/job-delete.component';



@NgModule({
  declarations: [MusicCreateComponent, MusicGetComponent, MusicLoadContentComponent, MusicUpdateComponent, MusicDeleteComponent, JobsGetComponent, JobsCreateComponent, JobUpdateComponent, JobDeleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ItemModule { }
