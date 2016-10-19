import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { ApiData } from './../data/api.service';

@Injectable()
export class ConvertedData {
    public Airports: ReplaySubject<any> = new ReplaySubject(1);
    public Routes: ReplaySubject<any> = new ReplaySubject(1);
    private routes: Ryanair.Routes;
    constructor(private airports: ApiData) {
        this.init();
    }

    public getRoutes(departureCity: string) {
        return this.routes[departureCity];
    }
    private convertCities(cities: Array<Ryanair.Airport>): Array<Ryanair.CitySelection> {
        const airports = cities.map((airport: Ryanair.Airport) => {
            return {
                key: airport.iataCode,
                name: `${airport.name} (${airport.country.name})`,
            };
        });
        return airports;
    }
    private init() {
        this.airports.ServerData.subscribe(
            (data: Ryanair.GlobalData) => {
                const cities = this.convertCities(data.airports);
                this.Airports.next(cities);

                this.routes = data.routes;
                this.Routes.next(data.routes);
            }
        );
    }
}
