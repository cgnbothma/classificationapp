import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, filter, finalize, catchError, tap, map } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

export class ViewUsersComponent implements OnInit {
  users: User[];
  //public users = [];
  currentUser = null;
  currentIndex = -1
  name = '';

  displayedColumns = ["name"];
  headElements = ['name'];

  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("init");
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.retrieveUsers();
  }

  retrieveUsers() {
    this.userService
    .getAll()
    .subscribe((data:any) => {
      console.log(data);
      this.dataSource.data = data;
      this.users = data.data;
    });
  }


  // retrieveUsers(): void {
  //   this.userService.getAll()
  //     .subscribe(
  //       data => {
  //         this.users = data;
  //         this.dataSource.data = data;
  //       }
  //     )
  // }

  // retrieveUsers() {
  //   this.userService.getAll().pipe(
  //     mergeMap((users: User[]) => {
  //       if (users && users.length){
  //         console.log("users");
  //         console.log(users);
  //       }
  //       console.log("bonobo");
  //       return of([]);
  //     })
  //   ).subscribe((users: User[]) => {
  //     console.log(users);
  //     for(user of users){
  //
  //       console.log(users.name);
  //     }
  //   });
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser() {
    this.router.navigate(['/users/add']);
  }

  deleteUser(userid){
    this.userService.delete(userid).subscribe((data)=>{
      alert("successfully deleted");
    });
    location.reload();
    return false;
  }

  fileUpload() {
    this.router.navigate(['/files']);
  }
}
