import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaksDetailComponent } from './pages/taks-detail/taks-detail.component';
import { TaskComponent } from './pages/task/task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/task',
    pathMatch: 'full'
  },
  {
    path: 'task',
    component: TaskComponent,
  },
  { 
    path: 'task/:id', 
    component: TaksDetailComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
