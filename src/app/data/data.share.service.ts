import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ShareData {
    public arrivalAirport: Observable<Ryanair.CityObject>;
    public arrivalDate: Observable<Ryanair.DateSelection>;
    public departureAirport: Observable<Ryanair.CityObject>;
    public departureDate: Observable<Ryanair.DateSelection>;
    public twoWayTicket: Observable<boolean>;
    private arrivalAirportSource = new Subject<Ryanair.CityObject>();
    private arrivalDateSource = new Subject<Ryanair.DateSelection>();
    private departureAirportSource = new Subject<Ryanair.CityObject>();
    private departureDateSource = new Subject<Ryanair.DateSelection>();
    private twoWayTicketSource = new Subject<boolean>();

    constructor() {
        this.arrivalAirport = this.arrivalAirportSource.asObservable();
        this.arrivalDate = this.arrivalDateSource.asObservable();
        this.departureAirport = this.departureAirportSource.asObservable();
        this.departureDate = this.departureDateSource.asObservable();
        this.twoWayTicket = this.twoWayTicketSource.asObservable();
    }

    public arrivalAirportSelect(airport: Ryanair.CityObject) {
        this.arrivalAirportSource.next(airport);
    }
    public arrivalDateSelect(date: Ryanair.DateSelection ) {
        this.arrivalDateSource.next(date);
    }
    public departureAirportSelect(airport: Ryanair.CityObject) {
        this.departureAirportSource.next(airport);
    }
    public departureDateSelect(date: Ryanair.DateSelection ) {
        this.departureDateSource.next(date);
    }
    public twoWayChange(state: boolean) {
        this.twoWayTicketSource.next(state);
    }
}
