import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CreateTagPageComponent } from '../tags/pages/create-tag-page/create-tag-page.component';
import { ExpertDetailFormComponent } from './components/forms/expert-detail-form/expert-detail-form.component';
import { CreateExpertPageComponent } from './pages/create-expert-page/create-expert-page.component';

const routes: Routes = [
  {
    path: 'tags/nueva',
    component: CreateTagPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experts/nuevo',
    component: CreateExpertPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experts/:id',
    component: ExpertDetailFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertsRoutingModule { }
