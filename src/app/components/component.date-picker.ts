import { Component } from '@angular/core';
import * as moment from 'moment';

class Datepicker {
    public dt: Date = new Date();
    public minDate: Date = moment().toDate();
    public format: string = 'DD-MM-YYYY';
    public dateOptions: any = {
        formatYear: 'YY',
        startingDay: 0
    };
    private opened: boolean = false;

    public get date(): any {
        return this.dt && this.dt.getTime() || new Date().getTime();
        /*
        return {
            max: moment(this.dt).add(3, 'd').format('YYYY-MM-DD'),
            min: moment(this.dt).subtract(3, 'd').format('YYYY-MM-DD'),
        };
        */
    }

    public disabled(date: Date, mode: string): boolean {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    }

    public open(): void {
        this.opened = !this.opened;
    }

    public clear(): void {
        this.dt = void 0;
    }

    public toggleMin(): void {
        this.dt = new Date(this.minDate.valueOf());
    }
}

@Component({
    selector: 'departure-date-picker',
    styleUrls: ['./../views/components/view.datepicker.less'],
    templateUrl: './../views/components/view.datepicker.html',
})
export class DepartureDatepicker extends Datepicker {
    constructor() {
        super();
    }
}

@Component({
    selector: 'arrival-date-picker',
    styleUrls: ['./../views/components/view.datepicker.less'],
    templateUrl: './../views/components/view.datepicker.html',
})
export class ArrivalDatepicker extends Datepicker {
    constructor() {
        super();
    }
}
