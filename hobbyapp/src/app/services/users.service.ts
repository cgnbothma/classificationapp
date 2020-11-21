import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from "../models/user.model";
import { map, catchError } from 'rxjs/operators';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private headers: HttpHeaders;
  data = [];

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin':'*'});
  }

  getAll(): Observable<User[]> {
    console.log("getall");
    return this.http.get<User[]>(baseUrl + '/users');
  }

  // getAll() {
  //   return this.http.get(baseUrl + '/users').pipe(
  //     map((data: User[]) => {
  //       return data;
  //     }), catchError( error => {
  //       return throwError( 'Something went wrong!' );
  //     })
  //    )
  //  }


  getUsers() {
    const promise = new Promise((resolve, reject) => {
      const apiURL = baseUrl;
      this.http
        .get<User[]>(apiURL)
        .toPromise()
        .then(res => {
          this.data = res.map((res: any) => {
            console.log(res._id);
            return new User(
              res._id,
              res.name
            );
          });
          resolve();
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }

  // create(data): Observable<any> {
  //   return this.http.post(baseUrl + '/create', data);
  // }

  delete(id): Observable<any> {
    // var url = baseUrl + '/delete/' + id;
    // alert(url);

    return this.http.delete(baseUrl + '/delete/' + id, { headers: this.headers });
  }
}
