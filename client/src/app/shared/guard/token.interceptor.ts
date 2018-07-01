import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(private auth: AuthService,
                private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.auth.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.auth.getToken()
                }
            });
        }
        return next.handle(req).pipe(catchError((err => this.handleAuthError(err))));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this.router.navigate(['/login'], {
                queryParams: {
                    authTokenExpired: true
                }
            });
        }
        return throwError(err);
    }
}
