import { Component, OnInit } from '@angular/core';
import { ItemEntity } from '../item.entity';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-get-read-olny',
  templateUrl: './music-get-read-olny.component.html',
  styleUrls: ['./music-get-read-olny.component.css']
})

export class MusicGetReadOlnyComponent implements OnInit {

  title: string = 'Musicas Disponiveis';
  musics: ItemEntity [];

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.musicService.getmusic().subscribe((m: ItemEntity[])=>this.musics = m);

  }

}
