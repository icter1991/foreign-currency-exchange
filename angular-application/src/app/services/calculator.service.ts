import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HistoricalExchangeRate} from "../models/historical-exchange-rate";

@Injectable({
    providedIn: 'root'
})
export class CalculatorService {

    private readonly apiKey: string;
    private readonly apiBaseUrl: string;
    private readonly headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.apiKey = environment.apiKey
        this.apiBaseUrl = environment.apiBaseUrl
        this.headers = new HttpHeaders().set('apikey', this.apiKey).set('Access-Control-Allow-Origin', '*');

    }

    // Returns real-time exchange rate data updated every 60 minutes, every 10 minutes or every 60 seconds.
    getLatestCurrencyExchangeRate(): Observable<HistoricalExchangeRate> {
        return this.http.get<HistoricalExchangeRate>(`${this.apiBaseUrl}/latest`, {headers: this.headers})
    }

    // You can query the Fixer API for historical rates by appending a date (format YYYY-MM-DD) to the base URL.
    getCurrencyExchangeRateByDate(date: string): Observable<HistoricalExchangeRate> {
        return this.http.get<HistoricalExchangeRate>(`${this.apiBaseUrl}/${date}`, {headers: this.headers})
    }

}
