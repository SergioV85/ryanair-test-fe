import '../../public/css/styles.css';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { ConvertedData } from './data/data.transform.service';
import { ArrivalDatepicker, DepartureDatepicker } from './modules/module.date-picker';

@Component({
    selector: 'city-selector',
    styleUrls: ['./views/view.citycomponent.less'],
    templateUrl: './views/view.citycomponent.html',
})
export class CityComponent implements AfterViewInit {
    @ViewChild(ArrivalDatepicker) public arrivalDate: ArrivalDatepicker;
    @ViewChild(DepartureDatepicker) public departureDate: DepartureDatepicker;

    public isDepartureSelect: boolean = false;
    private arrivalCity: string;
    private arrivalCode: string;
    private departureCity: string;
    private departureCode: string;
    private gotFlights: boolean = false;
    private isArrivalSelect: boolean = false;
    private mainTile: number = 4;
    private possibleToFlights: Array<Ryanair.Flight>;
    private possibleFromFlights: Array<Ryanair.Flight>;
    private possibleRoutes: Array<{}> = [];
    private possibleRoutesisShown: boolean = false;
    private twoWayTicket: boolean = true;

    constructor(private convertedData: ConvertedData) { }

    public ngOnInit() {}
    public ngAfterViewInit() {}

    private citySelect(value: Ryanair.CitySelection, target: string) {
        if (value !== null && value !== undefined) {
            if (target === 'arrival') {
                this.isArrivalSelect = true;
                this.arrivalCode = value.originalObject.code;
                this.arrivalCity = value.title;
            } else {
                this.isDepartureSelect = true;
                this.possibleRoutesisShown = true;
                this.mainTile = 3;
                this.departureCode = value.originalObject.code;
                this.departureCity = value.title;
                this.possibleRoutes = this.convertedData.getRoutes(this.departureCode);
            }
        }
    }
    private cleanParameters() {
        this.departureCity = null;
        this.arrivalCity = null;
        this.isArrivalSelect = false;
        this.isDepartureSelect = false;
    }
    private directSelect(value: {code: string, name: string}) {
        this.isArrivalSelect = true;
        this.arrivalCode = value.code;
        this.arrivalCity = value.name;
        this.possibleRoutes = [];
        this.possibleRoutesisShown = false;
    }
    private editSearch(event: Event) {
        this.gotFlights = false;
        this.possibleToFlights = [];
        this.possibleFromFlights = [];
    }
    private newSearch(event: Event) {
        this.gotFlights = false;
        this.possibleToFlights = [];
        this.possibleFromFlights = [];
        this.cleanParameters();
    }
    private searchFlights(event: Event) {
        const departureDates = this.departureDate.date;
        const arrivalDates = this.arrivalDate.date;


        this.convertedData.getFlights(this.departureCode, this.arrivalCode, departureDates.min, departureDates.max)
            .flatMap(data => {
                this.gotFlights = true;
                this.possibleToFlights = data.flights;
                return this.convertedData.getFlights(this.arrivalCode, this.departureCode, arrivalDates.min, arrivalDates.max);
            })
            .subscribe(data => {
                this.possibleFromFlights = data.flights;
            });
    }
}
