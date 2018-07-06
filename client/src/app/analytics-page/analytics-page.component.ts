import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticsPage} from "../shared/interfaces";
import {Chart} from 'chart.js'
import {Subscription} from "rxjs/index";

@Component({
    selector: 'app-analytics-page',
    templateUrl: './analytics-page.component.html',
    styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

    @ViewChild('gain') gainRef: ElementRef;
    @ViewChild('order') orderRef: ElementRef;

    aSub: Subscription;

    average: number;
    pending = true;

    constructor(private analyticsService: AnalyticsService) {
    }

    ngAfterViewInit() {

        const gainConfig: any = {
            label: 'Выручка',
            color: 'rgb(255, 99, 132)'
        };

        const orderConfig: any = {
            label: 'Заказы',
            color: 'rgb(255, 99, 235)'
        };


        this.aSub = this.analyticsService.getAnalytics().subscribe((data: AnalyticsPage) => {
            this.average = data.average;

            gainConfig.labels = data.chart.map(day => day.label);
            gainConfig.data = data.chart.map(item => item.gain);

            orderConfig.labels = data.chart.map(day => day.label);
            orderConfig.data = data.chart.map(item => item.order);

            // **** GAIN TEMP ****
            // gainConfig.labels.push('05,07.2018');
            // gainConfig.data.push(2500);
            // gainConfig.labels.push('06,07.2018');
            // gainConfig.data.push(7500);
            // **** TEMP ****

            const gainContext = this.gainRef.nativeElement.getContext('2d');
            gainContext.canvas.height = '300px';
            new Chart(gainContext, this.createChartConfig(gainConfig));


            // **** ORDER TEMP ****
            // orderConfig.labels.push('05,07.2018');
            // orderConfig.data.push(8);
            // orderConfig.labels.push('06,07.2018');
            // orderConfig.data.push(3);
            // **** TEMP ****

            const orderContext = this.orderRef.nativeElement.getContext('2d');
            orderContext.canvas.height = '300px';
            new Chart(orderContext, this.createChartConfig(orderConfig));

            this.pending = false;
        })
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    }

    createChartConfig({labels, data, label, color}) {
        return {
            type: 'line',
            options: {
                responsive: true
            },
            data: {
                labels,
                datasets:
                    [
                        {
                            label, data,
                            borderColor: color,
                            steppedLine: false,
                            fill: false
                        }
                ]
            }
        }
    }
}
