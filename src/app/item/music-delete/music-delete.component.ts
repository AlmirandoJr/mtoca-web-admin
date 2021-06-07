import { Component, OnInit, Inject } from '@angular/core';
import { MusicService } from '../music.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-music-delete',
  templateUrl: './music-delete.component.html',
  styleUrls: ['./music-delete.component.css']
})
export class MusicDeleteComponent implements OnInit {

  success: boolean = false;
  failture: boolean = false;
  sucessMessage: string = 'Musica removida com sucesso';
  failtureFailture: string = 'Erro ao remover Musica';

  constructor(public dialogRef: MatDialogRef<MusicDeleteComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private musicService: MusicService) { }

  ngOnInit() {
  }

  confirm(event) {
    
    this.musicService.deleteMusic(this.data)
    .subscribe(x => { event.target.disabled= true;
                      this.success=true;
                      this.failture=false},
      (error: HttpErrorResponse)    => {this.failture=true;
        this.success=false;
       this.failtureFailture  = error.error.message+"";

      });
  }

  dontConfirm() {
    this.dialogRef.close();
  }

}
