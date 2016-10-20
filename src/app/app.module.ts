import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule }  from '@angular/platform-browser';

import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2CompleterModule } from 'ng2-completer';

import { CityComponent } from './app.component';

import { ApiData } from './data/api.service';
import { ConvertedData } from './data/data.transform.service';
import { ArrivalSelector, DepartureSelector } from './modules/module.city-selector';
import { ArrivalDatepicker, DepartureDatepicker } from './modules/module.date-picker';
import { PossibleCity } from './modules/module.possible-city';
import { PossibleFromFlight, PossibleToFlight } from './modules/module.possible-flight';

@NgModule({
    bootstrap: [CityComponent],
    declarations: [
        DepartureSelector,
        ArrivalSelector,
        PossibleCity,
        PossibleFromFlight,
        PossibleToFlight,
        DepartureDatepicker,
        ArrivalDatepicker,
        CityComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        Ng2CompleterModule,
        FormsModule,
        DatepickerModule,
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
