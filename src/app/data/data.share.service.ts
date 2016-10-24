import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ShareData {
    public arrivalAirport: Observable<Ryanair.CityObject>;
    public arrivalDate: Observable<Date>;
    public arrivalDateLatest: Date;
    public cleanSettings: Observable<boolean>;
    public departureAirport: Observable<Ryanair.CityObject>;
    public departureDate: Observable<Date>;
    public departureDateLatest: Date;
    public directFlights: Observable<Array<Ryanair.Flight>>;
    public returnFlights: Observable<Array<Ryanair.Flight>>;
    public showFlights: Observable<boolean>;
    public twoWayTicket: Observable<boolean>;
    private arrivalAirportSource = new Subject<Ryanair.CityObject>();
    private arrivalDateSource = new Subject<Date>();
    private cleanSettingsSource = new Subject<boolean>();
    private departureAirportSource = new Subject<Ryanair.CityObject>();
    private departureDateSource = new Subject<Date>();
    private directFlightsSource = new Subject<Array<Ryanair.Flight>>();
    private returnFlightsSource = new Subject<Array<Ryanair.Flight>>();
    private showFlightsSource = new Subject<boolean>();
    private twoWayTicketSource = new Subject<boolean>();

    constructor() {
        this.arrivalAirport = this.arrivalAirportSource.asObservable();
        this.arrivalDate = this.arrivalDateSource.asObservable();
        this.cleanSettings = this.cleanSettingsSource.asObservable();
        this.departureAirport = this.departureAirportSource.asObservable();
        this.departureDate = this.departureDateSource.asObservable();
        this.directFlights = this.directFlightsSource.asObservable();
        this.returnFlights = this.returnFlightsSource.asObservable();
        this.showFlights = this.showFlightsSource.asObservable();
        this.twoWayTicket = this.twoWayTicketSource.asObservable();
    }

    public ArrivalAirport(airport: Ryanair.CityObject) {
        this.arrivalAirportSource.next(airport);
    }
    public ArrivalDate(date: Date) {
        this.arrivalDateSource.next(date);
        this.arrivalDateLatest = date;
    }
    public CleanSettings() {
        this.cleanSettingsSource.next(true);
    }
    public DepartureAirport(airport: Ryanair.CityObject) {
        this.departureAirportSource.next(airport);
    }
    public DepartureDate(date: Date) {
        this.departureDateSource.next(date);
        this.departureDateLatest = date;
    }
    public DirectFlights(flights: Array<Ryanair.Flight>) {
        this.directFlightsSource.next(flights);
    }
    public get LatestArrivalDate(): Date {
        return this.arrivalDateLatest;
    }
    public get LatestDeparturelDate(): Date {
        return this.departureDateLatest;
    }
    public ReturnFlights(flights: Array<Ryanair.Flight>) {
        this.returnFlightsSource.next(flights);
    }
    public ShowFlights(showFlights: boolean) {
        this.showFlightsSource.next(showFlights);
    }
    public TwoWayChange(state: boolean) {
        this.twoWayTicketSource.next(state);
    }
    public UpdateParameters(cleanSettings: boolean) {
        this.ShowFlights(false);
        if (cleanSettings) {
            this.CleanSettings();
        }
        this.directFlightsSource.next([]);
        this.returnFlightsSource.next([]);
    }
}
