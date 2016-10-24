import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ReplaySubject, Subscription } from 'rxjs';

import { ApiData } from './api.service';
import { ShareData } from './data.share.service';

@Injectable()
export class ConvertedData {
    public Airports: ReplaySubject<any> = new ReplaySubject(1);
    public Routes: ReplaySubject<any> = new ReplaySubject(1);

    private arrivalCodeSubscription: Subscription;
    private arrivalDateSubscription: Subscription;
    private departureCodeSubscription: Subscription;
    private departureDateSubscription: Subscription;

    private cities: Array<Ryanair.Airport>;
    private convertedCities: {};
    private routes: Ryanair.Routes;

    private arrivalAirrort: string;
    private arrivalDate: Date;
    private departureAirport: string;
    private departureDate: Date;

    constructor(private airports: ApiData, private shareData: ShareData) {
        this.init();

        this.departureCodeSubscription = shareData.departureAirport.subscribe(
            departure => {
                this.departureAirport = departure !== null ? departure.code : null;
            });
        this.arrivalCodeSubscription = shareData.arrivalAirport.subscribe(
            arrival => {
                this.arrivalAirrort = arrival !== null ? arrival.code : null;
            });

        this.departureDateSubscription = shareData.departureDate.subscribe(
            departureDate => {
                this.departureDate = departureDate;
            });
        this.arrivalDateSubscription = shareData.arrivalDate.subscribe(
            arrivalDate => {
                this.arrivalDate = arrivalDate;
            });
    }

    public get arrivalAirportName() {
        return this.convertedCities[this.arrivalAirrort];
    }
    public get departureAirportName() {
        return this.convertedCities[this.departureAirport];
    }
    public getDirectFlights() {
        this.airports.searchFlight(this.departureAirport, this.arrivalAirrort, this.departureMinDate, this.departureMaxDate)
            .subscribe(
                flights => {
                    this.shareData.DirectFlights(this.sortFlights(flights.flights));
                }
            );
    }
    public getReturnFlights() {
        this.airports.searchFlight(this.arrivalAirrort, this.departureAirport, this.arrivalMinDate, this.arrivalMaxDate)
            .subscribe(
                flights => {
                    this.shareData.ReturnFlights(this.sortFlights(flights.flights));
                }
            );
    }
    public getRoutes(departureCity: string) {
        return this.routes[departureCity].map((airportCode) => {
            return {
                code: airportCode,
                name: this.convertedCities[airportCode]
            };
        });
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
    private get arrivalMaxDate(): string {
        return moment(this.arrivalDate).add(3, 'd').format('YYYY-MM-DD');
    }
    private get arrivalMinDate(): string {
        return moment(this.arrivalDate).subtract(3, 'd').format('YYYY-MM-DD');
    }
    private get departureMaxDate(): string {
        return moment(this.departureDate).add(3, 'd').format('YYYY-MM-DD');
    }
    private get departureMinDate(): string {
        return moment(this.departureDate).subtract(3, 'd').format('YYYY-MM-DD');
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
    private sortFlights(flights: Array<Ryanair.Flight>) {
        return flights.sort((a, b) => a.price - b.price);
    }
}
