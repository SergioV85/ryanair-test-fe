import '../../../public/css/styles.css';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShareData } from './../data/data.share.service';
import { ConvertedData } from './../data/data.transform.service';

import { ArrivalDatepicker, DepartureDatepicker } from './../components/component.date-picker';

@Component({
    selector: 'date-selector',
    styleUrls: ['./../views/view.date.module.less'],
    templateUrl: './../views/view.date.module.html',
})
export class DateComponent implements AfterViewInit {
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
        this.subscription = shareData.arrivalAirport.subscribe(
            arrival => {
                this.isArrivalSelect = true;
            });
        /*
        this.shareData.departureDateSelect(this.departureDate.date);
        this.shareData.departureDateSelect(this.arrivalDate.date);
        */
    }

    public ngAfterViewInit() {
        const date = this.departureDate;
        console.log(date);
        /*
        console.log(date);
        setTimeout(() => {
            console.log(this.departureDate);
        }, 1000);
        */
        // this.shareData.departureDateSelect(this.departureDate.date);
        // this.shareData.departureDateSelect(this.arrivalDate.date);
    }
}
