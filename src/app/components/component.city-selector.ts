import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { CompleterData, CompleterService } from 'ng2-completer';

import { ConvertedData } from './../data/data.transform.service';

class CitySelector implements OnInit {
    public selectedCity: string;
    public title: string;
    public dataService: CompleterData;
    public inputDisabled: boolean;
    private cities: Array<Ryanair.CitySelection>;

    constructor(public convertedData: ConvertedData, public completerService: CompleterService) { }

    public ngOnInit() {
        this.convertedData.Airports.subscribe(
            (data: Array<Ryanair.CitySelection>) => {
                this.cities = data;
                this.dataService = this.completerService.local(this.cities, 'name', 'name');
            }
        );
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
        this.inputDisabled = false;
        this.title = 'Departure airport';
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
    public selectCity(value: Ryanair.CitySelection) {
        this.onChange.emit(value);
    }
}
