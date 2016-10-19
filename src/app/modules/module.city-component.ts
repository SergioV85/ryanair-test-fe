import '../../../public/css/styles.css';
import { Component, OnInit } from '@angular/core';

import { ApiData } from './../data/api.service';
import { ConvertData } from './../data/data.transform.service';

@Component({
    selector: 'city-selector',
    template: `
      <departure-selector (onChange)="citySelect($event, 'departure')"></departure-selector>
      <p [hidden]="!isDepartureSelect">Direct flights from {{ departureCity }}: </p>
      <possible-city *ngFor="let city of possibleRoutes" [city]=city (citySelect)="directSelect($event)"></possible-city>
      <arrival-selector [hidden]="!isDepartureSelect" (onChange)="citySelect($event, 'arrival')" [directCity]="directFlight"></arrival-selector>
      <p [hidden]="!isArrivalSelect">Selected arrival city is {{ arrivalCity }}</p>
    `,
})
export class CityComponent implements OnInit {
    public directFlight: string;
    private arrivalCity: string;
    private arrivalCode: string;
    private departureCity: string;
    private departureCode: string;
    private isArrivalSelect: boolean = false;
    private isDepartureSelect: boolean = false;
    private routes: Ryanair.Routes;
    private possibleRoutes: Array<string> = [];

    constructor(private airports: ApiData) { }

    public ngOnInit() {
        this.airports.RawData.subscribe(
            data => this.routes = data.routes
        );
    }

    private citySelect(value: Ryanair.CitySelection, target: string) {
        if (value !== null && value !== undefined) {
            if (target === 'arrival') {
                this.isArrivalSelect = true;
                this.arrivalCode = value.key;
                this.arrivalCity = value.name;
            } else {
                this.isDepartureSelect = true;
                this.departureCode = value.key;
                this.departureCity = value.name;
                this.possibleRoutes = ConvertData.getRoutes(this.departureCode, this.routes);
            }
        }
    }

    private directSelect(value: string) {
        this.directFlight = value;
    }
}