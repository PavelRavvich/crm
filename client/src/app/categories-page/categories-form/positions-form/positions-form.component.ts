import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PositionsService} from "../../../shared/services/positions.service";
import {Position} from "../../../shared/interfaces";
import {MaterialModal, MaterialService} from "../../../shared/services/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {el} from "@angular/platform-browser/testing/src/browser_util";

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

    form: FormGroup;

    positionId = null;

    constructor(private route: ActivatedRoute,
                private positionService: PositionsService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            cost: new FormControl(1, [Validators.required, Validators.min(1)])
        });

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
        this.positionId = position._id;
        this.form.patchValue({
            name: position.name,
            cost: position.cost
        });
        this.modal.open();
        MaterialService.updateTextInputs();
    }

    onAddPosition() {
        this.positionId = null;
        this.form.reset({
            name: null,
            cost: 1
        });
        this.modal.open();
        MaterialService.updateTextInputs();

    }

    onCancel() {
        this.modal.close();
    }

    onSubmit() {
        this.form.disable();

        const position: Position = {
            name: this.form.value.name,
            cost: this.form.value.cost,
            category: this.categoryId
        };

        const competed = () => {
            this.modal.close();
            this.form.enable();
            this.form.reset({name: '', cost: 1});
        };

        if (this.positionId) {
            // Edit.
            position._id = this.positionId;
            this.positionService.update(position).subscribe(position => {
                    MaterialService.toast('Позиция отредактирована');
                    const index = this.positions.findIndex(p => p._id === position._id);
                    this.positions[index] = position;
                }, error => MaterialService.toast(error.error.massage), competed
            )
        } else {
            // Create.
            this.positionService.create(position).subscribe(position => {
                    MaterialService.toast('Позиция создана');
                    this.positions.push(position);
                }, error => MaterialService.toast(error.error.massage), competed
            )
        }

    }

    onDeletePosition(event: Event, position: Position) {
        event.stopPropagation();
        const decision = window.confirm(`Удалить позицию ${position.name}?`);

        if (decision) {
            this.positionService.delete(position).subscribe(responce => {
                    const index = this.positions.findIndex(p => p._id === position._id);
                    this.positions.splice(index, 1);
                    MaterialService.toast(`Позиция ${position.name} успешно удалена.`);
                }, error => MaterialService.toast(error.error.massage));
        }
    }
}
