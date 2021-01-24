import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient : HttpClient) { }

  getAllData(){
    return this.httpClient.get("http://jivoxdevuploads.s3.amazonaws.com/eam-dev/files/44939/Rule%20JSON.json");
  }
}
