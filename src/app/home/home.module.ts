import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], exports:[ //export Home component to allow other modules to use this component
    HomeComponent // allowed to export bc it's declared
  ]
})
export class HomeModule { }
