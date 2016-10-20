import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { ApiData } from './../data/api.service';

@Injectable()
export class ConvertedData {
    public Airports: ReplaySubject<any> = new ReplaySubject(1);
    public Routes: ReplaySubject<any> = new ReplaySubject(1);
    private cities: Array<Ryanair.Airport>;
    private convertedCities: {};
    private routes: Ryanair.Routes;
    constructor(private airports: ApiData) {
        this.init();
    }

    public getRoutes(departureCity: string) {
        return this.routes[departureCity].map((airportCode) => { 
            return {
                code: airportCode,
                name: this.convertedCities[airportCode]
            };
        });
    }
    public getFlights(departure: string, arrival: string, departureDate: string, arrivalDate?: string) {
        return this.airports.searchFlight(departure, arrival, departureDate, arrivalDate);
    }
    private prepareAirportsForRoutes() {
        this.convertedCities = this.cities.reduce((obj, elem) => {
            obj[elem.iataCode] = `${elem.name} (${elem.country.name})`;
            return obj;
        }, {});
    }
    private get airportsForSelect(): Array<{}> {
        const airports = this.cities.map((airport: Ryanair.Airport) => {
            return {
                code: airport.iataCode,
                name: `${airport.name} (${airport.country.name})`,
            };
        });
        return airports;
    }
    private init() {
        this.airports.ServerData.subscribe(
            (data: Ryanair.GlobalData) => {
                this.cities = data.airports;
                this.Airports.next(this.airportsForSelect);
                this.prepareAirportsForRoutes();

                this.routes = data.routes;
                this.Routes.next(data.routes);
            }
        );
    }
}
