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
        this.headers = new HttpHeaders({apikey: this.apiKey});

    }

    // You can query the Fixer API for historical rates by appending a date (format YYYY-MM-DD) to the base URL.
    getCurrencyExchangeRateByDate(date: string, symbols?: string, base?: string): Observable<HistoricalExchangeRate> {
        return this.http.get<HistoricalExchangeRate>(`${this.apiBaseUrl}/${date}?${symbols ? 'symbols=' + symbols : ''}${base ? '&base=' + base : ''}`, {headers: this.headers})
    }

}
