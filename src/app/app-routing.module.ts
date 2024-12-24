import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

//paths the user can explore in our app. we can change urls and see different components
const routes: Routes = [
  {path:"",component:HomeComponent}, //standard route, aka Home 
  {path:"new", component:ReservationFormComponent},
  {path:"list", component: ReservationListComponent},
  {path:"edit/:id", component: ReservationFormComponent}

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
