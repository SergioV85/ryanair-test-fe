import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ShareData {
    public arrivalSelected: Observable<Ryanair.CityObject>;
    public departureSelected: Observable<Ryanair.CityObject>;
    public twoWayTicket: Observable<boolean>;
    private arrivalSelectedSource = new Subject<Ryanair.CityObject>();
    private departureSelectedSource = new Subject<Ryanair.CityObject>();
    private twoWayTicketSource = new Subject<boolean>();

    constructor() {
        this.arrivalSelected = this.arrivalSelectedSource.asObservable();
        this.twoWayTicket = this.twoWayTicketSource.asObservable();
    }

    public arrivalSelect(airport: Ryanair.CityObject) {
        this.arrivalSelectedSource.next(airport);
    }

    public departureSelect(airport: Ryanair.CityObject) {
        this.departureSelectedSource.next(airport);
    }

    public twoWayChange(state: boolean) {
        this.twoWayTicketSource.next(state);
    }
}
