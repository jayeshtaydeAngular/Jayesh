import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  httpHeader:HttpHeaders = new HttpHeaders({
    "content-type": "application/json"
   })

  constructor(private httpClient:HttpClient) { }
  



   getDataFromServer(endPoint:string, httpParams?: HttpParams | undefined) {
    const URL = environment.baseurl + endPoint;
    return this.httpClient.get(URL,{headers:this.httpHeader,params:httpParams});
 }
  postDataToServer(endPoint:string,userDataObj:any){
    const baseUrl = environment.baseurl + endPoint;
    return this.httpClient.post(baseUrl,userDataObj,{headers:this.httpHeader})
  }

  putDataToServer(endPoint:string, userDataObj:any,httpParams?: HttpParams | undefined) {
    const URL = environment.baseurl + endPoint;
    return this.httpClient.put(URL,userDataObj,{headers:this.httpHeader,params:httpParams})
  }
  deleteDataFromServer(endPoint:string) {
    const URL = environment.baseurl + endPoint;
    return this.httpClient.delete(URL,{headers:this.httpHeader})
  }
}
