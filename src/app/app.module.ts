import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';

import { Airports } from './data/airports.service';
import { CitySelector } from './modules/module.destination-selector';

@NgModule({
    bootstrap: [
        CitySelector
    ],
    declarations: [
        CitySelector
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [
        Airports
    ]
})
export class AppModule { }
