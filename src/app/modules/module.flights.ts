import '../../../public/css/styles.css';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShareData } from './../data/data.share.service';
import { ConvertedData } from './../data/data.transform.service';

@Component({
    selector: 'flight-selector',
    styleUrls: ['./../views/view.flights.module.less'],
    templateUrl: './../views/view.flights.module.html',
})
export class FlightsComponent {
    private directFlightSubscripton: Subscription;
    private returnFlightSubscripton: Subscription;
    private showFlightSubscription: Subscription;
    private twoWayTicketSubscription: Subscription;

    private arrivalAirport: string;
    private departureAirport: string;
    private showFlights: boolean = false;
    private possibleToFlights: Array<Ryanair.Flight>;
    private possibleFromFlights: Array<Ryanair.Flight>;
    private twoWayTicket: boolean = true;

    constructor(private convertedData: ConvertedData, private shareData: ShareData) {
        this.directFlightSubscripton = shareData.directFlights.subscribe(
            flights => {
                this.possibleToFlights = flights;
                this.arrivalAirport = this.convertedData.arrivalAirportName;
                this.departureAirport = this.convertedData.departureAirportName;
            }
        );
        this.returnFlightSubscripton = shareData.returnFlights.subscribe(
            flights => this.possibleFromFlights = flights
        );
        this.showFlightSubscription = shareData.showFlights.subscribe(
            state => {
                this.showFlights = state;
            }
        );
        this.twoWayTicketSubscription = shareData.twoWayTicket.subscribe(
            state => {
                this.twoWayTicket = state;
            }
        );
    }
}
