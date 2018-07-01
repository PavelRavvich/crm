import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {MaterialService} from "../../shared/services/material.service";
import {Category, Massage} from "../../shared/interfaces";

@Component({
    selector: 'app-categories-form',
    templateUrl: './categories-form.component.html',
    styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

    @ViewChild('imgInput') inputRef: ElementRef;

    image: File;

    imagePreview;

    form: FormGroup;

    isNew = true;

    category: Category;

    constructor(private route: ActivatedRoute,
                private categoriesService: CategoriesService,
                private router: Router) {
    }

    ngOnInit() {

        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required])
        });
        this.form.disable();

        this.route.params
            .pipe(switchMap(
                (params: Params) => {
                    if (params['id']) {
                        this.isNew = false;
                        return this.categoriesService.getById(params['id']);
                    } else {
                        return of(null);
                    }
                }))
            .subscribe(
                (category: Category) => {
                    if (category) {
                        this.category = category;
                        this.form.patchValue({name: category.name});
                        this.imagePreview = category.imageSrc;
                        MaterialService.updateTextInputs();
                    }
                    this.form.enable();
                },
                error => MaterialService.toast(error.error.massage));
    }

    triggerClick() {
        this.inputRef.nativeElement.click();
    }

    onImgUpload(event: any | Event) {
        const img = event.target.files[0];
        this.image = img;

        const reader = new FileReader();
        reader.onload = () => this.imagePreview = reader.result;

        reader.readAsDataURL(img)
    }

    onSubmit() {
        let obs$;

        this.form.disable();

        if (this.isNew) {
            obs$ = this.categoriesService.create(this.form.value.name, this.image);
        } else {
            obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
        }

        obs$.subscribe(
            category => {
                this.category = category;
                MaterialService.toast('Изменения сохранены');
                this.form.enable();
            },
            error => {
                MaterialService.toast(error.error.massage);
                this.form.enable();
            }
        );
    }

    deleteCategory() {
        const decision = window.confirm(`Вы уверены что хотите удалить ${this.category.name}?`);
        if (decision) {
            this.categoriesService.delete(this.category._id).subscribe(
                    (res) => {
                        MaterialService.toast(res.massage);
                    },
                    (err) => {
                        MaterialService.toast(err.error.massage);
                    },
                    () => {
                        this.router.navigate(['/categories']);
                    }
                );
        }
    }
}
