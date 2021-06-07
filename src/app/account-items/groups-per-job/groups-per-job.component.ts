import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { AccountItemService } from '../account-item.service';
import { GroupsPerJobDTO } from '../group-per-job-dto';

@Component({
  selector: 'app-groups-per-job',
  templateUrl: './groups-per-job.component.html',
  styleUrls: ['./groups-per-job.component.css']
})
export class GroupsPerJobComponent implements OnInit {

  groupsPerJobDTOs: GroupsPerJobDTO [];

  title :string = 'Numero de Vendas por Trabalho Discografico';

  constructor(private accountItemService: AccountItemService,
    public dialogRef:MatDialogRef<GroupsPerJobComponent>,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    if(this.authenticationService.user.profile.name === 'ARTIST'){
      this.accountItemService.getNumberOGroupPerJobByArtist(this.authenticationService.user.username).subscribe
      (
        success=>{this.groupsPerJobDTOs = success;},
        error => {console.error(error);}
    )}else{
      const groupPerJobDtosObservable :Observable<GroupsPerJobDTO []> =
      this.accountItemService.getNumberOGroupPerJob();

      groupPerJobDtosObservable.subscribe( 
        (success: GroupsPerJobDTO[]) =>  {this.groupsPerJobDTOs = success},
        error => {console.error(error)});

    }

    
    
    
  }

}
