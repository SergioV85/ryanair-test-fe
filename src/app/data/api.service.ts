import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AsyncSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiData {
    public ServerData: AsyncSubject<any>;
    private airportsUrl: string;

    constructor(private http: Http) {
        this.airportsUrl = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/';
        this.requestServerData();
        this.ServerData = new AsyncSubject();
    }

    private requestServerData() {
        this.http
            .get(this.airportsUrl)
            .map(this.parseData)
            .catch(this.handleError)
            .subscribe(
                data => {
                    this.ServerData.next(data);
                    this.ServerData.complete();
                }
            );
    }
    private parseData(res: Response) {
        return res.json();
    }
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
