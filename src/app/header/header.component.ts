import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticate=false;
  private authSub:Subscription;
// @Output() featureSelected=new EventEmitter<string>();
  constructor(private dataStored:DataStorageService,private authService:AuthService) { }

  ngOnInit(){
   this.authSub=this.authService.user.subscribe(user=>{
     //this.isAuthenticate=!user? false:true;
     this.isAuthenticate=!!user //Meaning of this !!user is same as ternary operation
     console.log(!user);
     console.log(!!user);
   });
  }

  // onSelect(feature:string)
  // {
  //   this.featureSelected.emit(feature);
  // }

  onSaveData(){
    this.dataStored.storeRecipes();
  }

  onFetchData(){
    this.dataStored.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }
}
