import { NgModule } from '@angular/core';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login.component';
import { SignupComponent } from '../components/auth/signup/signup.component';
import { AuthGuard } from '../services/auth-guard';
import { PostListComponent } from '../components/posts/post-list/post-list.component';
import { PostCreateComponent } from '../components/posts/post-create/post-create.component';
import { PostEditComponent } from '../components/posts/post-edit/post-edit.component';
import { LoggedInGuard } from '../services/loggedIn-guard';

const appRoutes: Routes = [
  {path:  '', component: DashboardComponent},
  {path:  'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  {path:  'signup', component: SignupComponent, canActivate: [LoggedInGuard]},
  { path: 'posts', component: PostListComponent },
  { path: 'posts/create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'posts/edit/:id', component: PostEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoggedInGuard]
})
export class AppRoutingModule {}
