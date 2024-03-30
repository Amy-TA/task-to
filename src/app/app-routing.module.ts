import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const childRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
 
];

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: HomeComponent,
  // },
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGaurd],
    children: childRoutes
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
