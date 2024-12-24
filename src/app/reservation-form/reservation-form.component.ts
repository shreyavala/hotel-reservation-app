import { Component, OnInit } from '@angular/core';
// create form group
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import service
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

// router. 'ActivatedRoute' - what you can see in browser url)
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{

  // make form group to bind to form
  reservationForm: FormGroup = new FormGroup({});

  // dependecy injection. as soon as we create an instance of our reservation form component or service, the constructer gets invoked
  constructor(private formBuilder:FormBuilder, private reservationService: ReservationService, private router: Router, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
      //group together & add validations to each form control input
      this.reservationForm = this.formBuilder.group({
        checkInDate: ['',Validators.required], //formcontrol (defined in html) - check in Date must be valid
        checkOutDate: ['',Validators.required],
        guestName: ['',Validators.required],
        email: ['',[Validators.required, Validators.email]], //check emial exists & is valid address
        roomNumber: ['',Validators.required]
      })

      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        let reservation = this.reservationService.getReservation(id)

        if(reservation)
          this.reservationForm.patchValue(reservation)
      }

      
      // let id = this.activatedRoute.snapshot.paramMap.get('id');
      // if(id){
      //   this.reservationService.getReservation(id)?.subscribe(reservation => {
      //     if(reservation){
      //       this.reservationForm.patchValue(reservation) // patch/'prefill' all values in reservation into form
      //     }
      //   });
      // }
  }

  onSubmit(){
    // check if reservation form is valid & add reservation

    if(this.reservationForm.valid){

      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        // Update
        this.reservationService.updateReservation(id, reservation)
      } else {
        // New
        this.reservationService.addReservation(reservation)   

      }

      this.router.navigate(['/list'])
    }



    // if(this.reservationForm.valid){
    //   console.log("valid")
    //   let reservation: Reservation = this.reservationForm.value;

    //   let id = this.activatedRoute.snapshot.paramMap.get('id'); // grab id from endpoint url
    //   if(id){ // we update existing reservation
    //     this.reservationService.updateReservation(id, reservation).subscribe(()=>{
    //       console.log("update processed");
    //       this.router.navigate(['/reservations']);
    //     })
    //   }else{ // we add a new reservation
    //     this.reservationService.addReservation(reservation).subscribe(()=>{
    //       console.log("add processed");
    //       this.router.navigate(['/reservations']);
    //     });
    //   }

    //   // navgiate the user to reservations list page after submit btn is clicked
    //   this.router.navigate(['/list'])

    // }
  }
}
