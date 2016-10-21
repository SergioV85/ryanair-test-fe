import '../../../public/css/styles.css';
import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShareData } from './../data/data.share.service';
import { ConvertedData } from './../data/data.transform.service';

import { ArrivalDatepicker, DepartureDatepicker } from './../components/component.date-picker';

@Component({
    selector: 'date-selector',
    styleUrls: ['./../views/view.date.module.less'],
    templateUrl: './../views/view.date.module.html',
})
export class DateComponent {
    @ViewChild(ArrivalDatepicker) public arrivalDate: ArrivalDatepicker;
    @ViewChild(DepartureDatepicker) public departureDate: DepartureDatepicker;
    public subscription: Subscription;

    private isArrivalSelect: boolean = false;
    private twoWayTicket: boolean = true;

    private gotFlights: boolean = false;
    private possibleToFlights: Array<Ryanair.Flight>;
    private possibleFromFlights: Array<Ryanair.Flight>;
    private possibleRoutes: Array<{}> = [];
    private possibleRoutesisShown: boolean = false;

    constructor(private convertedData: ConvertedData, private shareData: ShareData) {
        this.subscription = shareData.arrivalSelected.subscribe(
            arrival => {
                this.isArrivalSelect = true;
            });
    }

    public searchFlights(event: Event) {
        const departureDates = this.departureDate.date;
        const arrivalDates = this.arrivalDate.date;
        console.log(departureDates);
        console.log(arrivalDates);
    }
}
