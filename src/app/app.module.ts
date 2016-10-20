import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule }  from '@angular/platform-browser';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Ng2CompleterModule } from 'ng2-completer';

import { CityComponent } from './modules/module.city-component';

import { ApiData } from './data/api.service';
import { ConvertedData } from './data/data.transform.service';
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
        Ng2CompleterModule,
        MaterialModule.forRoot()
    ],
    providers: [
        ApiData,
        ConvertedData
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
    public arrival: boolean = false;
    public departure: boolean = true;
}
