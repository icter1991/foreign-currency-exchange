import {Timestamp} from "rxjs";

export class HistoricalExchangeRate {
    base: string;
    date: string;
    historical: boolean;
    rates: ExchangeRates
    success: boolean;
    timestamp: Timestamp<number>;
}

export class ExchangeRates {
    CAD: number;
    EUR: number;
    USD: number;
}
