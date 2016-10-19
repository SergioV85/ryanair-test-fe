import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { ConvertedData } from './../data/data.transform.service';

class CitySelector implements OnInit {
    public selectedCity: string;
    public title: string;
    private cities: Array<Ryanair.CitySelection>;

    constructor(public convertedData: ConvertedData) { }

    public ngOnInit() {
        this.convertedData.Airports.subscribe(
            (data: Array<Ryanair.CitySelection>) => this.cities = data
        );
    }
}

@Component({
    selector: 'departure-selector',
    styleUrls: ['./../views/view.cityselector.css'],
    templateUrl: './../views/view.cityselector.html',
})
export class DepartureSelector extends CitySelector {
    @Output() public onChange = new EventEmitter<Ryanair.CitySelection>();

    constructor(public convertedData: ConvertedData) {
        super(convertedData);
        this.title = 'Departure Airport';
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
export class ArrivalSelector extends CitySelector {
    @Output() public onChange = new EventEmitter<Ryanair.CitySelection>();
    @Input('directCity') public selectedCity: any;
    constructor(public convertedData: ConvertedData) {
        super(convertedData);
        this.title = 'Arrival Airport';
    }
    public selectCity(value: Ryanair.CitySelection) {
        this.onChange.emit(value);
    }
}
