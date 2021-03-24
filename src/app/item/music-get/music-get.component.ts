import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';
import { ItemEntity } from '../item.entity';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MusicCreateComponent } from '../music-create/music-create.component';
import { MusicLoadContentComponent } from '../music-load-content/music-load-content.component';
import { MusicUpdateComponent } from '../music-update/music-update.component';
import { MusicDeleteComponent } from '../music-delete/music-delete.component';

@Component({
  selector: 'app-music-get',
  templateUrl: './music-get.component.html',
  styleUrls: ['./music-get.component.css']
})
export class MusicGetComponent implements OnInit {

  constructor(private musicService: MusicService,
              private matDialog: MatDialog) { }

  title: string = 'Musicas Disponiveis';
  musics: ItemEntity [];

  ngOnInit() {
    this.musicService.getmusic().subscribe((m: ItemEntity[])=>this.musics = m);
  }


  openNewMusic(){

     const matDialogConfig= new  MatDialogConfig();
     matDialogConfig.disableClose = false;
     matDialogConfig.height = '550px';
     matDialogConfig.width = '800px';
     matDialogConfig.id = 'newMusic';

     const dialog = this.matDialog.open(MusicCreateComponent,matDialogConfig);
     dialog.afterClosed().subscribe(x=>{this.ngOnInit()})


  }

  loadContent(music: ItemEntity){

    const matDialogConfig= new  MatDialogConfig();
    matDialogConfig.disableClose = false;
    matDialogConfig.height = '550px';
    matDialogConfig.width = '800px';
    matDialogConfig.id = 'loadContent';
    matDialogConfig.data = music;

    this.matDialog.open(MusicLoadContentComponent,matDialogConfig);

 }

 openUpdateMusic(music: ItemEntity){

  const matDialogConfig= new  MatDialogConfig();
    matDialogConfig.disableClose = false;
    matDialogConfig.height = '550px';
    matDialogConfig.width = '800px';
    matDialogConfig.id = 'loadContent';
    matDialogConfig.data = music;

    const dialog  = this.matDialog.open(MusicUpdateComponent,matDialogConfig);

    dialog.afterClosed().subscribe(x=>{this.ngOnInit()})


 }

 openDeleteMusic(itemCode: String){

  const  matDialogConf = new  MatDialogConfig();
  matDialogConf.disableClose = true;
  matDialogConf.height = '200px';
  matDialogConf.width = '600px';
  matDialogConf.data = itemCode;
  matDialogConf.id = 'deleteItem:' + itemCode;

  const dialog = this.matDialog.open(MusicDeleteComponent, matDialogConf);
  dialog.afterClosed().subscribe(x=>{ this.ngOnInit()});

 }

}
