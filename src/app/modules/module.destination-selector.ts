import '../../../public/css/styles.css';
import { Component, OnInit } from '@angular/core';

import { Airports } from './../data/airports.service';

@Component({
    providers: [Airports],
    selector: 'destination-selector',
    styleUrls: ['./../views/view.cityselector.css'],
    templateUrl: './../views/view.cityselector.html',
})
export class CitySelector implements OnInit {
    private cities: any;
    private countries: any;
    private routes: any;

    constructor(private airports: Airports) { }

    public ngOnInit() {
        this.cities = this.airports.Cities;
        this.countries = this.airports.Countries;
        this.routes = this.airports.Routes;
    }
 }
