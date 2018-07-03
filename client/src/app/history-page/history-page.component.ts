import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../shared/services/material.service";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs/index";
import {Order} from "../shared/interfaces";

const STEP = 2;

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {


    @ViewChild('tooltip') tooltipRef: ElementRef;
    tooltip: MaterialInstance;

    isFilterVisible: boolean = false;

    orders: Order[] = [];

    offset = 0;
    limit = STEP;

    oSub: Subscription;

    loadingPagination: boolean = false;
    noMoreOrders: boolean = false;

    reloading = false;


    constructor(private ordersService: OrdersService) {
    }

    ngOnInit() {
        this.reloading = true;
        this.fetch();
    }

    private fetch () {

        const params = {
            offset: this.offset,
            limit: this.limit
        };

        this.oSub = this.ordersService.fetch(params).subscribe(orders => {
            this.orders = this.orders.concat(orders);
            this.loadingPagination = false;
            this.noMoreOrders = orders.length < STEP;
            this.reloading = false;
        });
    }

    ngOnDestroy() {
        this.tooltip.destroy();
        this.oSub.unsubscribe();
    }

    ngAfterViewInit() {
        this.tooltip = MaterialService.initTooltip(this.tooltipRef);
    }

    loadMore() {
        this.offset += STEP;
        this.loadingPagination = true;
        this.fetch()
    }
}
