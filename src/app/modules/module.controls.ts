import '../../../public/css/styles.css';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShareData } from './../data/data.share.service';
import { ConvertedData } from './../data/data.transform.service';

@Component({
    selector: 'page-controls',
    styleUrls: ['./../views/view.controls.module.less'],
    templateUrl: './../views/view.controls.module.html',
})
export class ControlsComponent {
    private departureSubscription: Subscription;
    private flightSubscription: Subscription;
    private showFlightSubscription: Subscription;
    private twoWayTicketSubscription: Subscription;
    private isArrivalSelect: boolean = false;
    private isFlightsReturned: boolean = false;
    private showFlights: boolean = false;
    private twoWayTicket: boolean = true;

    constructor(private shareData: ShareData, private convertedData: ConvertedData) {
        this.departureSubscription = shareData.arrivalAirport.subscribe(
            arrival => {
                this.isArrivalSelect = arrival !== null;
        });
        this.flightSubscription = shareData.directFlights.subscribe(
            flights => {
                this.isFlightsReturned = true;
            }
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

    public updateSearch(state: boolean) {
        this.shareData.UpdateParameters(state);
    }

    public searchFlights(event: Event) {
        this.convertedData.getDirectFlights();
        if (this.twoWayTicket) {
            this.convertedData.getReturnFlights();
        }
        this.shareData.ShowFlights(true);
    }
}
