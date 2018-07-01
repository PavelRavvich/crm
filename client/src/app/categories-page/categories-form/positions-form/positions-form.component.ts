import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PositionsService} from "../../../shared/services/positions.service";
import {Position} from "../../../shared/interfaces";
import {MaterialModal, MaterialService} from "../../../shared/services/material.service";

@Component({
    selector: 'app-positions-form',
    templateUrl: './positions-form.component.html',
    styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
    /**
     * Category id received from parent category.
     */
    @Input('categoryId') categoryId;
    /**
     * Reference on modal HTML template.
     */
    @ViewChild('modal') modalRef: ElementRef;

    positions: Position[] = [];

    loading = false;

    modal: MaterialModal;

    constructor(private route: ActivatedRoute,
                private positionService: PositionsService) {
    }

    ngOnInit() {
        this.loading = true;
        this.positionService.fetch(this.categoryId).subscribe(positions => {
            this.positions = positions;
            this.loading = false;
        });
    }

    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modalRef);
    }

    ngOnDestroy() {
        this.modal.destroy();
    }

    onSelectPosition(position: Position) {
        this.modal.open();
    }

    onAddPosition() {
        this.modal.open();
    }

    onCancel() {
        this.modal.close();
    }
}
