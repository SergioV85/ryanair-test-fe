import { Component, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

class Datepicker {
    public dt: Date = new Date();
    public minDate: Date = moment().toDate();
    public format: string = 'DD-MM-YYYY';
    public dateOptions: any = {
        formatYear: 'YY',
        startingDay: 0
    };
}

@Component({
    selector: 'departure-date-picker',
    styleUrls: ['./../views/components/view.datepicker.less'],
    templateUrl: './../views/components/view.datepicker.html',
})
export class DepartureDatepicker extends Datepicker {
    @Output() public departureDate = new EventEmitter<Date>();
    constructor() {
        super();
    }
    public changeDate($event: Date) {
        this.dt = $event;
        this.departureDate.emit(this.dt);
    }
}

@Component({
    selector: 'arrival-date-picker',
    styleUrls: ['./../views/components/view.datepicker.less'],
    templateUrl: './../views/components/view.datepicker.html',
})
export class ArrivalDatepicker extends Datepicker {
    @Output() public arrivalDate = new EventEmitter<Date>();
    constructor() {
        super();
    }
    public changeDate($event: Date) {
        this.dt = $event;
        this.arrivalDate.emit(this.dt);
    }
}
