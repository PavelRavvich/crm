import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../shared/services/material.service";

@Component({
    selector: 'app-history-list',
    templateUrl: './history-list.component.html',
    styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {

    @Input() orders: Order[];

    @ViewChild('modal') modalRef: ElementRef;
    modal: MaterialInstance;

    selectedOrder: Order;

    ngOnDestroy() {
        this.modal.destroy();
    }

    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modalRef);
    }

    computePrice(order: Order): number {
        return order.list.reduce((total, item) => {
            return total += item.quantity * item.cost
        }, 0);
    }

    selectOrder(order: Order) {
        this.selectedOrder = order;
        this.modal.open();
    }

    closeModal() {
        this.modal.close();
    }
}
