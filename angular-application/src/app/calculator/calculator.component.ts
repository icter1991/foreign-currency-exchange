import {Component, OnInit} from '@angular/core';
import {CalculatorService} from "../services/calculator.service";
import {DateTime} from "luxon";
import {MessageService} from "primeng/api";
import {ExchangeRates, HistoricalExchangeRate} from "../models/historical-exchange-rate";

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
    dateValue: Date = new Date();
    minDate: Date;
    maxDate: Date;
    loading = {
        rate: false
    };
    results: HistoricalExchangeRate;
    exchangeCurrency: string[] = [];
    baseCurrency: string;

    currencies: any[] = [];

    exchangeRates: ExchangeRates;
    resultExchangeCurrencies: [string, any][];
    private initialLoad = true;

    constructor(private calculatorService: CalculatorService,
                private messageService: MessageService) {

    }

    ngOnInit(): void {
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(1999);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
        this.getExchangeRates();

    }

    getExchangeRates() {
        this.loading.rate = true;
        const date = DateTime.fromJSDate(this.dateValue).toFormat('yyyy-MM-dd');

        let exchangeCurrency = ''
        this.exchangeCurrency.forEach(item => {
            exchangeCurrency += item + ','
        })
        this.calculatorService.getCurrencyExchangeRateByDate(date, exchangeCurrency, this.baseCurrency).subscribe({
            next: value => {
                this.results = value
                this.exchangeRates = value.rates

                this.resultExchangeCurrencies = Object.entries(value.rates);
                if (this.initialLoad) {

                    Object.keys(this.exchangeRates).forEach(key => this.currencies.push({name: key, value: key}));
                    this.initialLoad = false;
                }
            }, error: err => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: err})
                this.loading.rate = false;
            }, complete: () => {
                this.loading.rate = false;
            }
        })
    }
}
