import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewUsersComponent } from './components/users/view-users/view-users.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: ViewUsersComponent },
  { path: 'files', component: UploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
