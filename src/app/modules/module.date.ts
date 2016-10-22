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

    private departureSubscription: Subscription;
    private showFlightSubscription: Subscription;
    private twoWayTicketSubscription: Subscription;
    private isArrivalSelect: boolean = false;
    private showFlights: boolean = false;
    private twoWayTicket: boolean = true;

    constructor(private convertedData: ConvertedData, private shareData: ShareData) {
        this.departureSubscription = shareData.arrivalAirport.subscribe(
            arrival => {
                this.isArrivalSelect = true;
            });
        this.showFlightSubscription = shareData.showFlights.subscribe(
            state => {
                this.showFlights = state;
            }
        );
        this.twoWayTicketSubscription = shareData.twoWayTicket.subscribe(
            state => {
                this.twoWayTicket = state;
            }
        );
    }

    public dateSelect(date: Date, isArrival: boolean) {
        if (isArrival) {
            this.shareData.arrivalDateSelect(date);
        } else {
            this.shareData.departureDateSelect(date);
        }
    }
}
