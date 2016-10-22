import '../../../public/css/styles.css';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShareData } from './../data/data.share.service';

@Component({
    selector: 'page-controls',
    styleUrls: ['./../views/view.controls.module.less'],
    templateUrl: './../views/view.controls.module.html',
})
export class ControlsComponent {
    public arrivalCodeSubscription: Subscription;
    public arrivalDateSubscription: Subscription;
    public departureCodeSubscription: Subscription;
    public departureDateSubscription: Subscription;

   private arrivalAirrort: string;
    private arrivalDate: string;
    private departureAirport: string;
    private departureDate: string;

    constructor(private shareData: ShareData) {
        this.departureCodeSubscription = shareData.departureAirport.subscribe(
            departure => {
                this.departureAirport = departure.code;
            });
        this.arrivalCodeSubscription = shareData.arrivalAirport.subscribe(
            arrival => {
                this.arrivalAirrort = arrival.code;
            });
        /*
        this.departureDateSubscription = shareData.arrivalSelected.subscribe(
            arrival => {
                this.departureDate = arrival.code;
            });
        this.arrivalDateSubscription = shareData.arrivalSelected.subscribe(
            arrival => {
                this.arrivalDate = arrival.code;
            });
        */
    }

    public searchFlights(event: Event) {
        console.log(`Departure airport is ${this.departureAirport} with dates interval`);
        console.log(`Arrival airport is ${this.arrivalAirrort} with dates interval`);
    }
}
