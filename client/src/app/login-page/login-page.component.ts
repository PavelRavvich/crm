import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs/index";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

    form: FormGroup;
    aSub: Subscription;

    constructor(private auth: AuthService,
                private route: ActivatedRoute,
                private router: Router) {}

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
        });
    }

    onSubmit() {
        this.form.disable();

        this.aSub = this.auth.login(this.form.value).subscribe(
            () => this.router.navigate(['/overview']),
            () => this.form.enable()
        );
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    }
}
