import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/auth/login/login/login.component';
import { RegisterComponent } from './components/auth/register/register/register.component';
import { HomeComponent } from './components/home/home/home.component';
import { MaintenanceComponent } from './components/maintenance/maintenance/maintenance.component';


const routes: Routes = [
{
  path: 'login',
  component: LoginComponent
},
{
  path: "register",
  component: RegisterComponent
},
{
  path: "home",
  component: HomeComponent
},
{
  path: "maintenance",
  component: MaintenanceComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
