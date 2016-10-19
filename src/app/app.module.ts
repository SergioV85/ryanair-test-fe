import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { CityComponent } from './modules/module.city-component';

import { ApiData } from './data/api.service';
import { ArrivalSelector, DepartureSelector } from './modules/module.city-selector';
import { PossibleCity } from './modules/module.possible-city';

@NgModule({
    bootstrap: [CityComponent],
    declarations: [
        DepartureSelector,
        ArrivalSelector,
        PossibleCity,
        CityComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        Ng2AutoCompleteModule,
    ],
    providers: [
        ApiData
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
    public arrival: boolean = false;
    public departure: boolean = true;
}
