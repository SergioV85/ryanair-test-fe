import { Component, Input} from '@angular/core';
import * as moment from 'moment';

class Flight {
    @Input('flight') public flight: {};

    private getDate(time: string): string {
        return moment(time).format('YYYY-MM-DD');
    }

    private getTime(time: string): string {
        return moment(time).format('HH:mm');
    }
}

@Component({
    selector: 'possible-to-flight',
    styleUrls: ['./../views/view.possibleflight.less'],
    templateUrl: './../views/view.possibleflight.html',
})
export class PossibleToFlight extends Flight {
    @Input('flight') public flight: {};
}

@Component({
    selector: 'possible-from-flight',
    styleUrls: ['./../views/view.possibleflight.less'],
    templateUrl: './../views/view.possibleflight.html',
})
export class PossibleFromFlight extends Flight {
    @Input('flight') public flight: {};
}