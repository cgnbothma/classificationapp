import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  SERVER_URL = "https://file.io";

  constructor(private httpClient:HttpClient) { }

  upload(formData) {
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
