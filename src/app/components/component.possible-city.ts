import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'possible-city',
    styleUrls: ['./../views/components/view.possiblecity.less'],
    templateUrl: './../views/components/view.possiblecity.html',
})
export class PossibleCity implements OnInit {
    @Input('city') public cityName: string;
    @Output() public citySelect = new EventEmitter<string>();

    public ngOnInit() {}

    public selectCity(value: string) {
        this.citySelect.emit(value);
    }

}
