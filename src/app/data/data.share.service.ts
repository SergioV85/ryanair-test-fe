import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ShareData {
    public arrivalAirport: Observable<Ryanair.CityObject>;
    public arrivalDate: Observable<Date>;
    public departureAirport: Observable<Ryanair.CityObject>;
    public departureDate: Observable<Date>;
    public directFlights: Observable<Array<Ryanair.Flight>>;
    public returnFlights: Observable<Array<Ryanair.Flight>>;
    public showFlights: Observable<boolean>;
    public twoWayTicket: Observable<boolean>;
    private arrivalAirportSource = new Subject<Ryanair.CityObject>();
    private arrivalDateSource = new Subject<Date>();
    private departureAirportSource = new Subject<Ryanair.CityObject>();
    private departureDateSource = new Subject<Date>();
    private directFlightsSource = new Subject<Array<Ryanair.Flight>>();
    private returnFlightsSource = new Subject<Array<Ryanair.Flight>>();
    private showFlightsSource = new Subject<boolean>();
    private twoWayTicketSource = new Subject<boolean>();

    constructor() {
        this.arrivalAirport = this.arrivalAirportSource.asObservable();
        this.arrivalDate = this.arrivalDateSource.asObservable();
        this.departureAirport = this.departureAirportSource.asObservable();
        this.departureDate = this.departureDateSource.asObservable();
        this.directFlights = this.directFlightsSource.asObservable();
        this.returnFlights = this.returnFlightsSource.asObservable();
        this.showFlights = this.showFlightsSource.asObservable();
        this.twoWayTicket = this.twoWayTicketSource.asObservable();
    }

    public arrivalAirportSelect(airport: Ryanair.CityObject) {
        this.arrivalAirportSource.next(airport);
    }
    public arrivalDateSelect(date: Date) {
        this.arrivalDateSource.next(date);
    }
    public departureAirportSelect(airport: Ryanair.CityObject) {
        this.departureAirportSource.next(airport);
    }
    public departureDateSelect(date: Date) {
        this.departureDateSource.next(date);
    }
    public directFlightsSet(flights: Array<Ryanair.Flight>) {
        this.directFlightsSource.next(flights);
    }
    public returnFlightsSet(flights: Array<Ryanair.Flight>) {
        this.returnFlightsSource.next(flights);
    }
    public showFlightsSet(showFlights: boolean) {
        this.showFlightsSource.next(showFlights);
    }
    public twoWayChange(state: boolean) {
        this.twoWayTicketSource.next(state);
    }
    public updateParameters(cleanSettings: boolean) {
        this.showFlightsSet(false);
        this.directFlightsSource.next([]);
        this.returnFlightsSource.next([]);
    }
}
