import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialInstance, MaterialService} from "../shared/services/material.service";
import {OrderService} from "./order.service";
import {Order, Position} from "../shared/interfaces";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.css'],
    providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('modal') modelRef: ElementRef;

    modal: MaterialInstance;

    isRoot: boolean;

    pending: boolean = false;

    oSub: Subscription;

    constructor(private router: Router,
                private orderService: OrderService,
                private ordersService: OrdersService) {
    }

    ngOnInit() {
        this.isRoot = this.router.url === '/position';
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.isRoot = this.router.url === '/position';
            }
        });
    }

    ngOnDestroy() {
        this.modal.destroy();
        if (this.oSub) {
            this.oSub.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modelRef);

    }

    openModal() {
        this.modal.open();
    }

    cancel() {
        this.modal.close();
    }

    submit() {
        this.pending = true;
        const order: Order = {
            list: this.orderService.list.map(item => {
                delete item._id;
                return item;
            })
        };

        this.oSub = this.ordersService.create(order).subscribe(
            newOrder => {
                MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`);
                this.orderService.clear();
            }, error => {},
            () => {
                this.modal.close();
                this.pending = false;
            }
        );
    }

    removePosition(position: Position) {
        this.orderService.remove(position);
    }
}
