import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ExpertsListPageComponent } from './modules/experts/pages/experts-list-page/experts-list-page.component';
import { TagsListPageComponent } from './modules/tags/pages/tags-list-page/tags-list-page.component';


const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full',
    redirectTo: 'experts'
  },
  {
    path: 'auth',
    component: LoginPageComponent
  },
  
  {
    path: 'experts',
    component: ExpertsListPageComponent,
    canActivate: [AuthGuard]
  },
  {
  path: 'tags', 
    component: TagsListPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
