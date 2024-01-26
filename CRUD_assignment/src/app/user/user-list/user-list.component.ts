import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpService } from 'src/app/httpService/http.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent{
  UserListData:any;

  constructor(private httpSVC:HttpService){}
 ngOnInit(){
  this.getData();
 }

  getData(){
    this.httpSVC.getDataFromServer("UserData").subscribe((resp:any)=> {
      if(resp && resp.length > 0) {
        this.UserListData = resp;
        console.log(this.UserListData)
      }
    })
  }
  delete(id:number,index:number){
    const selection =  confirm("Are Your sure");
    if(selection){
     const endPoint = "UserData/"+id;
     this.httpSVC.deleteDataFromServer(endPoint).subscribe({
       next:(response:any)=>{
         this.UserListData.splice(index,1)
       }
     })
      
    }
  }
}
