import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/httpService/http.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
})
export class UserUpsertComponent {
  userForm !: FormGroup
  selectedUser: string | null = null;
  actionName: string | null = null;
  UserFormBtn:boolean = false;


  constructor(private UF: FormBuilder, private httpSvc: HttpService, private activateroute: ActivatedRoute, private router:Router) {
    this.selectedUser = this.activateroute.snapshot.paramMap.get('userID');
    this.actionName = this.activateroute.snapshot.queryParamMap.get('action');
    console.log(this.actionName)
  }

  ngOnInit() {
    this.userForm = this.UF.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.-]+[@][a-z]+[.][a-z]{2,3}')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    })

    if (this.actionName == 'EDIT') {
      this.getUserDetails();
      this.UserFormBtn = true;
    }
  }

  getUserDetails() {
    const endPoint = 'UserData/' + this.selectedUser;
    this.httpSvc.getDataFromServer(endPoint).subscribe({
      next: (response: any) => {
        this.userForm.patchValue(response);
      }
    })
  }
  submit() { 
    this.router.navigate(['/user-list']);
    const httpParams = new HttpParams()
      .set('firstName', this.userForm.get('firstName')?.value)
      .set('lastName', this.userForm.get('lastName')?.value)

    this.httpSvc.getDataFromServer('UserData', httpParams).subscribe((resp: any) => {
      if (resp && resp.length > 0) {
        alert("User Already Exist");
        alert("Refresh the user-list")
        const userId = resp[0].id;
        const endPoint = 'UserData/' + userId;
    const userDataObj = this.userForm.value;
    this.httpSvc.putDataToServer(endPoint,userDataObj).subscribe({
      next: (response: any) => {
        console.log("Data Updated successfully");
      }
    })
      }
      else {
        console.log(this.userForm.value);
        var userDataObj = this.userForm.value;
        this.httpSvc.postDataToServer("UserData", userDataObj).subscribe({
          next: (response: any) => {
            console.log("Response Received ", response);
            alert("New User Added")
            alert("Refresh List")
          },
    
          error: (error) => {
            console.log("Error Occured ", error);
          },
    
          complete: () => {
    
          }
        })
      }
    })
  }
  
  update() {
    this.router.navigate(['/user-list']);
    const endPoint = 'UserData/' + this.selectedUser;
    const userDataObj = this.userForm.value;
    this.httpSvc.putDataToServer(endPoint, userDataObj).subscribe({
      next: (response: any) => {
        console.log("Data Updated successfully");
      }
    })
  }

}
