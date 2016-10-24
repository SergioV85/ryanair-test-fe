import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

import { ShareData } from './../data/data.share.service';

class Datepicker {
    public dt: Date = new Date();
    public minDate: Date = moment().toDate();
    public dateInterval: number = 3;
    public datepickerType: string;
    public latestDate: Date;
    public maxFlightDate: string;
    public minFlightDate: string;

    public updateDateInterval() {
        this.maxFlightDate = moment(this.dt).add(this.dateInterval, 'd').format('YYYY-MM-DD');
        this.minFlightDate = moment.max(moment(this.minDate), moment(this.dt).subtract(this.dateInterval, 'd')).format('YYYY-MM-DD');
    }
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'departure-date-picker',
    styleUrls: ['./../views/components/view.datepicker.less'],
    templateUrl: './../views/components/view.datepicker.html',
})
export class DepartureDatepicker extends Datepicker {
    @Output() public departureDate = new EventEmitter<Date>();
    constructor(private shareData: ShareData) {
        super();
        this.datepickerType = 'departure';
        this.latestDate = shareData.LatestDeparturelDate;
        if (this.latestDate !== undefined && this.latestDate !== null) {
            this.dt = this.latestDate;
        }
        this.updateDateInterval();
    }
    public changeDate($event: Date) {
        this.dt = $event;
        this.updateDateInterval();
        this.departureDate.emit(this.dt);
    }
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'arrival-date-picker',
    styleUrls: ['./../views/components/view.datepicker.less'],
    templateUrl: './../views/components/view.datepicker.html',
})
export class ArrivalDatepicker extends Datepicker {
    @Output() public arrivalDate = new EventEmitter<Date>();

    constructor(private shareData: ShareData) {
        super();
        this.datepickerType = 'arrival';
        this.latestDate = shareData.LatestArrivalDate;
        if (this.latestDate !== undefined && this.latestDate !== null) {
            this.dt = this.latestDate;
        }
        this.updateDateInterval();
    }
    public changeDate($event: Date) {
        this.dt = $event;
        this.updateDateInterval();
        this.arrivalDate.emit(this.dt);
    }
    public setDate(date: Date) {
        this.minDate = date;
        this.dt = moment.max(moment(this.minDate), moment(this.dt)).toDate();
        this.updateDateInterval();
    }
}
