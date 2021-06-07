import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemEntity } from '../item.entity';
import { JobEntity } from '../job.entity';
import { MusicCreateComponent } from '../music-create/music-create.component';
import { MusicDeleteComponent } from '../music-delete/music-delete.component';
import { MusicLoadContentComponent } from '../music-load-content/music-load-content.component';
import { MusicUpdateComponent } from '../music-update/music-update.component';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-get-by-job',
  templateUrl: './music-get-by-job.component.html',
  styleUrls: ['./music-get-by-job.component.css']
})
export class MusicGetByJobComponent implements OnInit {

  constructor(private musicService: MusicService,
    private matDialog: MatDialog,
    public matDialogRef: MatDialogRef<MusicGetByJobComponent>,
    @Inject (MAT_DIALOG_DATA) public jobData: JobEntity) { }

    title: string = 'Musicas do '+this.jobData.jobType+': '+this.jobData.name;
    musics: ItemEntity [];
  
    ngOnInit() {
      this.musicService.getmusicByJobCode(this.jobData.code)
        .subscribe(
          (m: ItemEntity[])=>{this.musics = m},
        );
      
    }
  
  
    openNewMusic(){
  
       const matDialogConfig= new  MatDialogConfig();
       matDialogConfig.disableClose = false;
       matDialogConfig.height = '1000px';
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
      matDialogConfig.height = '1000px';
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
