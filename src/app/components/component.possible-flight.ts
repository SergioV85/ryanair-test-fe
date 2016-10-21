import { Component, Input} from '@angular/core';
import * as moment from 'moment';

class Flight {
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
    @Input('flight') public flight: {};
}

@Component({
    selector: 'possible-from-flight',
    styleUrls: ['./../views/components/view.possibleflight.less'],
    templateUrl: './../views/components/view.possibleflight.html',
})
export class PossibleFromFlight extends Flight {
    @Input('flight') public flight: {};
}
