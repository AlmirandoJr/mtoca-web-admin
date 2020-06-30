import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicCreateComponent } from './music-create/music-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MusicGetComponent } from './music-get/music-get.component';
import { MusicLoadContentComponent } from './music-load-content/music-load-content.component';
import { MusicUpdateComponent } from './music-update/music-update.component';
import { MusicDeleteComponent } from './music-delete/music-delete.component';



@NgModule({
  declarations: [MusicCreateComponent, MusicGetComponent, MusicLoadContentComponent, MusicUpdateComponent, MusicDeleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ItemModule { }
