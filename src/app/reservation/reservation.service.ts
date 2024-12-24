import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';

// we're able to inject this reservation service into a constructor. inject an instance of the service in another place

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  // before ngOnInit lifecycle hook. when we start, immediately loads (for local storage logic)
  constructor() {
    let savedReservations = localStorage.getItem("reservations")
    this.reservations = savedReservations? JSON.parse(savedReservations):[];
   } 

  //http / mock api:
  // private baseUrl="http://localhost:3001";

  //constructor(private http: HttpClient){}


  //this service provided CRUD services for our app. here are the below methods: 

  // observable means we're sending it out to an external api and waiting for the results. other events can subscrip/listen to the result. 
  getReservations(): Reservation[] {
    return this.reservations;
    //return this.http.get<Reservation[]>(this.baseUrl+"/reservations")
  }

  // return a foudn reservation or an undefined value
  getReservation(id: string): Reservation | undefined{
    return this.reservations.find(res => res.id===id);
    //return this.http.get<Reservation>(this.baseUrl+"/reservations/"+id);
  }

  addReservation(reservation: Reservation) :void  {

    reservation.id=Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem("reservations",JSON.stringify(this.reservations))

    // return this.http.post<void>(`${this.baseUrl}/reservations`, reservation);

  }

  deleteReservation(id:string):void {

    let index = this.reservations.findIndex(res => res.id === id)
    this.reservations.splice(index, 1); // remove element at index position

    // return this.http.delete<void>(this.baseUrl+"/reservations/"+id);

    localStorage.setItem("reservations",JSON.stringify(this.reservations))
  }

  updateReservation(id: string, updatedReservation: Reservation):void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updatedReservation;

    localStorage.setItem("reservations",JSON.stringify(this.reservations))

    // return this.http.put<void>(this.baseUrl+"/reservations/"+id,updatedReservation);
  }

}
