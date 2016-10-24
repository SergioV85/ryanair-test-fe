import '../../../public/css/styles.css';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShareData } from './../data/data.share.service';
import { ConvertedData } from './../data/data.transform.service';

@Component({
    selector: 'city-selector',
    styleUrls: ['./../views/view.city.module.less'],
    templateUrl: './../views/view.city.module.html',
})
export class CityComponent {
    private cleanSettingsSubscription: Subscription;
    private showFlightSubscription: Subscription;
    private isDepartureSelect: boolean = false;
    private showFlights: boolean = false;
    private arrivalCity: string;
    private departureCity: string;
    private possibleRoutes: Array<{}> = [];
    private possibleRoutesisShown: boolean = false;
    private twoWayTicket: string = 'true';

    constructor(private convertedData: ConvertedData, private shareData: ShareData) {
        this.showFlightSubscription = shareData.showFlights.subscribe(
            state => {
                this.showFlights = state;
            }
        );
        this.cleanSettingsSubscription = shareData.cleanSettings.subscribe(
            clean => {
                this.arrivalCity = null;
                this.departureCity = null;
                this.possibleRoutes = [];
                this.possibleRoutesisShown = false;
                this.shareData.DepartureAirport(null);
                this.shareData.ArrivalAirport(null);
                this.isDepartureSelect = false;
            }
        );
    }
    public changeFlightType(event: boolean) {
        this.twoWayTicket = event.toString();
        this.shareData.TwoWayChange(event);
    }
    public directSelect(value: Ryanair.CityObject) {
        this.citySelect(value, true);
    }
    public selectEvent(value: Ryanair.CitySelection, target: string) {
        if (value !== null && value !== undefined) {
            if (target === 'arrival') {
                this.citySelect({
                    code: value.originalObject.code,
                    name: value.title
                }, true);
            } else {
                this.citySelect({
                    code: value.originalObject.code,
                    name: value.title
                }, false);
            }
        }
    }
    private citySelect(value: Ryanair.CityObject, isArrival: boolean) {
        if (isArrival) {
            this.updateRoutes();
            this.arrivalCity = value.name;
            this.shareData.ArrivalAirport(value);
        } else {
            this.isDepartureSelect = true;
            this.departureCity = value.name;
            this.updateRoutes(value.code);
            this.shareData.DepartureAirport(value);
        }
    }
    private updateRoutes(code?: string) {
        if (code) {
            this.possibleRoutesisShown = true;
            this.possibleRoutes = this.convertedData.getRoutes(code);
        } else {
            this.possibleRoutes = [];
            this.possibleRoutesisShown = false;
        }
    }
}
