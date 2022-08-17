import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/api";

@NgModule({
    declarations: [
        AppComponent,
        CalculatorComponent
    ],
    imports: [
        BrowserModule,
        CalendarModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
