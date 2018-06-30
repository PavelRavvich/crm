import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

    form: FormGroup;
    aSub: Subscription;

    constructor(private auth: AuthService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });

        this.route.queryParams.subscribe((params: Params) => {
            if (params['registered']) {
                // OK
            } else if (params['accessDenied']) {
                // ERR
            }
        })
    }

    onSubmit() {
        this.form.disable();

        this.aSub = this.auth.register(this.form.value).subscribe(
            () => this.router.navigate(['/login'], {
                queryParams: {
                    registered: true
                }
            }),
            () => this.form.enable()
        );
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    }
}
