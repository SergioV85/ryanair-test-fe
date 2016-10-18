import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Airports {
    private airportsUrl: string;
    private cities: any;
    private countries: any;
    private routes: any;
    private rawData: Observable<any>;
    private errorMessage: any;

    constructor(private http: Http) {
        this.airportsUrl = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/';
    }

    public get Cities() {
        this.serverData.publishLast().refCount().subscribe(
            data => this.cities = JSON.stringify(data)
        );
        return this.cities;
    }

    public get Countries() {
        this.serverData.publishLast().refCount().subscribe(
            data => this.countries = JSON.stringify(data)
        );
        return this.countries;
    }

    public get Routes() {
        this.serverData.publishLast().refCount().subscribe(
            data => this.routes = JSON.stringify(data)
        );
        return this.routes;
    }

    private init() {
        this.serverData
            .subscribe(
                data => this.rawData = data,
                error =>  this.errorMessage = <any> error
            );
    }
    private get serverData() {
        return this.http
            .get(this.airportsUrl)
            .map(this.parseData)
            .catch(this.handleError);
    }
    private parseData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
