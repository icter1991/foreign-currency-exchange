import {Component, OnInit} from '@angular/core';
import {CalculatorService} from "../services/calculator.service";
import {DateTime} from "luxon";
import {MessageService} from "primeng/api";
import {HistoricalExchangeRate} from "../models/historical-exchange-rate";

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
    }


    getExchangeRates() {
        this.loading.rate = true;
        let date = DateTime.fromJSDate(this.dateValue).toFormat('yyyy-MM-dd');
        this.calculatorService.getCurrencyExchangeRateByDate(date).subscribe({
            next: value => {
                this.results = value
            }, error: err => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: err})
                this.loading.rate = false;
            }, complete: () => {
                this.loading.rate = false;
            }
        })
    }
}
