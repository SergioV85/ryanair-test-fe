import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { CompleterData, CompleterService } from 'ng2-completer';

import { ConvertedData } from './../data/data.transform.service';

class CitySelector implements OnInit {
    public selectedCity: Ryanair.CitySelection;
    public highlightedCity: Ryanair.CitySelection;
    public title: string;
    public dataService: CompleterData;
    public inputDisabled: boolean = true;
    private cities: Array<Ryanair.CitySelection>;

    constructor(public convertedData: ConvertedData, public completerService: CompleterService) { }

    public ngOnInit() {
        this.convertedData.Airports.subscribe(
            (data: Array<Ryanair.CitySelection>) => {
                this.cities = data;
                this.dataService = this.completerService.local(this.cities, 'name', 'name');
                this.enableInput();
            }
        );
    }
    public enableInput() {}
    public highlighted($event: any) {
        this.highlightedCity = $event;
    }
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'departure-selector',
    styleUrls: ['./../views/components/view.cityselector.less'],
    templateUrl: './../views/components/view.cityselector.html',
})
export class DepartureSelector extends CitySelector {
    @Input('departureCity') public selectedCity: any;
    @Output() public onChange = new EventEmitter<Ryanair.CitySelection>();

    constructor(public convertedData: ConvertedData, public completerService: CompleterService) {
        super(convertedData, completerService);
        this.title = 'Departure airport';
    }
    public blur($event: any) {
        this.onChange.emit(this.highlightedCity);
    }
    public enableInput() {
        this.inputDisabled = false;
    }
    public selectCity(value: Ryanair.CitySelection) {
        this.onChange.emit(value);
    }
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'arrival-selector',
    styleUrls: ['./../views/components/view.cityselector.less'],
    templateUrl: './../views/components/view.cityselector.html',
})
export class ArrivalSelector extends CitySelector {
    @Output() public onChange = new EventEmitter<Ryanair.CitySelection>();
    @Input('directCity') public selectedCity: any;
    @Input('departureSelect') public inputDisabled: boolean;

    constructor(public convertedData: ConvertedData, public completerService: CompleterService) {
        super(convertedData, completerService);
        this.title = 'Arrival Airport';
    }
    public blur($event: any) {
        this.onChange.emit(this.highlightedCity);
    }
    public enableInput() {}
    public selectCity(value: Ryanair.CitySelection) {
        this.onChange.emit(value);
    }
}
