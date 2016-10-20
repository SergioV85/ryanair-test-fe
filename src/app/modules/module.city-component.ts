import '../../../public/css/styles.css';
import { Component, OnInit } from '@angular/core';

import { ConvertedData } from './../data/data.transform.service';

@Component({
    selector: 'city-selector',
    styleUrls: ['./../views/view.citycomponent.less'],
    templateUrl: './../views/view.citycomponent.html',
})
export class CityComponent implements OnInit {
    public directFlight: string;
    private arrivalCity: string;
    private arrivalCode: string;
    private departureCity: string;
    private departureCode: string;
    private isArrivalSelect: boolean = false;
    private isDepartureSelect: boolean = false;
    private possibleRoutes: Array<string> = [];
    private mainTile: number = 4;

    constructor(private convertedData: ConvertedData) { }

    public ngOnInit() {}

    private citySelect(value: Ryanair.CitySelection, target: string) {
        if (value !== null && value !== undefined) {
            if (target === 'arrival') {
                this.isArrivalSelect = true;
                this.arrivalCode = value.originalObject.code;
                this.arrivalCity = value.title;
            } else {
                this.isDepartureSelect = true;
                this.mainTile = 3;
                this.departureCode = value.originalObject.code;
                this.departureCity = value.title;
                this.possibleRoutes = this.convertedData.getRoutes(this.departureCode);
            }
        }
    }

    private directSelect(value: string) {
        this.directFlight = value;
    }
}
