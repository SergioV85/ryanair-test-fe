import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule }  from '@angular/platform-browser';

import { ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2CompleterModule } from 'ng2-completer';

import { ApiData } from './data/api.service';
import { ShareData } from './data/data.share.service';
import { ConvertedData } from './data/data.transform.service';

import { CityComponent } from './modules/module.city';
import { DateComponent } from './modules/module.date';

import { ArrivalSelector, DepartureSelector } from './components/component.city-selector';
import { ArrivalDatepicker, DepartureDatepicker } from './components/component.date-picker';
import { PossibleCity } from './components/component.possible-city';
import { PossibleFromFlight, PossibleToFlight } from './components/component.possible-flight';

@NgModule({
    bootstrap: [CityComponent, DateComponent],
    declarations: [
        DepartureSelector,
        ArrivalSelector,
        PossibleCity,
        PossibleFromFlight,
        PossibleToFlight,
        DepartureDatepicker,
        ArrivalDatepicker,
        CityComponent,
        DateComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        Ng2CompleterModule,
        FormsModule,
        ButtonsModule,
        DatepickerModule,
        MaterialModule.forRoot()
    ],
    providers: [
        ApiData,
        ConvertedData,
        ShareData
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
