import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { ApiData } from './../data/api.service';
import { ConvertData } from './../data/data.transform.service';

@Component({
    selector: 'departure-selector',
    styleUrls: ['./../views/view.cityselector.css'],
    templateUrl: './../views/view.cityselector.html',
})
export class DepartureSelector implements OnInit {
    @Output() public onChange = new EventEmitter<Ryanair.CitySelection>();
    public selectedCity: string;
    private cities: Array<{}>;
    private title: string;

    constructor(private airports: ApiData) { }

    public ngOnInit() {
        this.airports.RawData.subscribe(
            data => this.cities = ConvertData.convertCities(data.airports)
        );
        this.title = 'Departure City';
    }

    public selectCity(value: Ryanair.CitySelection) {
        this.onChange.emit(value);
    }
}

@Component({
    selector: 'arrival-selector',
    styleUrls: ['./../views/view.cityselector.css'],
    templateUrl: './../views/view.cityselector.html',
})
export class ArrivalSelector implements OnInit {
    @Input('directCity') public selectedCity: any;
    @Output() public onChange = new EventEmitter<Ryanair.CitySelection>();
    private cities: Array<{}>;
    private title: string;

    constructor(private airports: ApiData) { }

    public ngOnInit() {
        this.airports.RawData.subscribe(
            data => this.cities = ConvertData.convertCities(data.airports)
        );
        this.title = 'Arrival City';
    }

    public selectCity(value: Ryanair.CitySelection) {
        this.onChange.emit(value);
    }
}
