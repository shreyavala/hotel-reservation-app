import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation [] = [];

  // load reservations from reservations service 
  constructor(private reservationService: ReservationService){}
  ngOnInit(): void {
    // this.loadReservations();
    this.reservations = this.reservationService.getReservations();
  }

  // loadReservations(){
  //   // this.reservationService.getReservations().subscribe(reservations => {
  //   //   this.reservations = reservations
  //   // });
  // }

  deleteReservation(id: string){
    // this.reservationService.deleteReservation(id).subscribe(()=>{
    //   console.log("Delete Processed")
    //   this.loadReservations();
    // });
    this.reservationService.deleteReservation(id);
  }
}
