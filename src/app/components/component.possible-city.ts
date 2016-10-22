import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'possible-city',
    styleUrls: ['./../views/components/view.possiblecity.less'],
    templateUrl: './../views/components/view.possiblecity.html',
})
export class PossibleCity {
    @Input('city') public cityName: string;
    @Output() public citySelect = new EventEmitter<string>();

    public selectCity(value: string) {
        this.citySelect.emit(value);
    }

}
