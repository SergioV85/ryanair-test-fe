import { Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';

class Flight {
    public selectedFlight: boolean = false;
    @Input('flight') public flight: {};

    public getDate(time: string): string {
        return moment(time).format('YYYY-MM-DD');
    }

    public getTime(time: string): string {
        return moment(time).format('HH:mm');
    }
}

@Component({
    selector: 'possible-to-flight',
    styleUrls: ['./../views/components/view.possibleflight.less'],
    templateUrl: './../views/components/view.possibleflight.html',
})
export class PossibleToFlight extends Flight {
    @Output() public departureFlight = new EventEmitter<any>();
    @Input('flight') public flight: {};
    public flightSelected() {
        this.departureFlight.emit();
    }
}

@Component({
    selector: 'possible-from-flight',
    styleUrls: ['./../views/components/view.possibleflight.less'],
    templateUrl: './../views/components/view.possibleflight.html',
})
export class PossibleFromFlight extends Flight {
    @Output() public returnFlight = new EventEmitter<any>();
    @Input('flight') public flight: {};
    public flightSelected() {
        this.returnFlight.emit();
    }
}
