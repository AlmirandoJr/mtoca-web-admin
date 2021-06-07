import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgModel } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UserEntity } from 'src/app/user/user.entity';
import { UserService } from 'src/app/user/user.service';
import { AccountItemService } from '../account-item.service';
import { PurchasePerArtistComponent } from '../purchase-per-artist/purchase-per-artist.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  authors: UserEntity [] = [];

  
  form = this.formBuilder.group({
    author: ['']  })
  

  constructor( private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef:MatDialogRef<SearchComponent>,
    private accountItemService: AccountItemService,
    private matDialog:MatDialog) { }

    selectedAuthor :string ;
    

  ngOnInit(): void {
    this.userService.findUsersByProfileName('artist')
      .subscribe((x: UserEntity[])=>{
        this.authors = x;}, 
        e => {console.error(e)}
      );
  }


  searchPurchases(){

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.height = '700px';
    matDialogConfig.width = '1200px';
    matDialogConfig.id= 'purchases-per-artist';
    matDialogConfig.data = this.selectedAuthor;

    //matDialogConfig.data = 'apple.gabriel@email.com';

    this.matDialog.open(PurchasePerArtistComponent, matDialogConfig);
    
  }

  onSelectArtist(event){

   const user: string= event;

   this.selectedAuthor  = user;

  }

}
