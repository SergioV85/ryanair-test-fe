import '../../../public/css/styles.css';
import { Component, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShareData } from './../data/data.share.service';
import { ConvertedData } from './../data/data.transform.service';

import { PossibleFromFlight, PossibleToFlight } from './../components/component.possible-flight';

@Component({
    selector: 'flight-selector',
    styleUrls: ['./../views/view.flights.module.less'],
    templateUrl: './../views/view.flights.module.html',
})
export class FlightsComponent {
    @ViewChildren(PossibleToFlight) public directFlights: any;
    @ViewChildren(PossibleFromFlight) public returnFlights: any;

    private directFlightSubscripton: Subscription;
    private returnFlightSubscripton: Subscription;
    private showFlightSubscription: Subscription;
    private twoWayTicketSubscription: Subscription;

    private arrivalAirport: string;
    private departureAirport: string;
    private directFlightPrice: number = 0;
    private possibleToFlights: Array<Ryanair.Flight>;
    private possibleFromFlights: Array<Ryanair.Flight>;
    private returnFlightPrice: number = 0;
    private showDirectEmptyMessage: boolean = false;
    private showFlights: boolean = false;
    private showReturnEmptyMessage: boolean = false;
    private totalPrice: string = '0';
    private twoWayTicket: boolean = true;

    constructor(private convertedData: ConvertedData, private shareData: ShareData) {
        this.directFlightSubscripton = shareData.directFlights.subscribe(
            flights => {
                this.possibleToFlights = flights;
                this.showDirectEmptyMessage = flights.length === 0;
                this.arrivalAirport = this.convertedData.arrivalAirportName;
                this.departureAirport = this.convertedData.departureAirportName;
            }
        );
        this.returnFlightSubscripton = shareData.returnFlights.subscribe(
            flights => {
                this.possibleFromFlights = flights;
                this.showReturnEmptyMessage = flights.length === 0;
            }
        );
        this.showFlightSubscription = shareData.showFlights.subscribe(
            state => {
                if (!state) {
                    this.directFlightPrice = 0;
                    this.returnFlightPrice = 0;
                    this.totalPrice = '0';
                }
                this.showFlights = state;
            }
        );
        this.twoWayTicketSubscription = shareData.twoWayTicket.subscribe(
            state => {
                this.twoWayTicket = state;
            }
        );
    }

    public directFlightSelected(index: number, flight: Ryanair.Flight) {
        this.directFlights._results.forEach((elm: any) => elm.selectedFlight = false);
        this.directFlights._results[index].selectedFlight = true;
        this.calculatePrice(flight, true);
    }
    public returnFlightSelected(index: number, flight: Ryanair.Flight) {
        this.returnFlights._results.forEach((elm: any) => elm.selectedFlight = false);
        this.returnFlights._results[index].selectedFlight = true;
        this.calculatePrice(flight, false);
    }

    private calculatePrice(flight: Ryanair.Flight, isDirectFlight: boolean) {
        if (isDirectFlight) {
            this.directFlightPrice = flight.price;
        } else {
            this.returnFlightPrice = flight.price;
        }
        if (this.twoWayTicket && this.directFlightPrice !== 0 && this.returnFlightPrice !== 0) {
            this.totalPrice = `${flight.currency} ${(this.directFlightPrice + this.returnFlightPrice).toFixed(2)}`;
        } else if (!this.twoWayTicket && this.directFlightPrice !== 0) {
            this.totalPrice = `${flight.currency} ${this.directFlightPrice.toFixed(2)}`;
        }
    }
}
