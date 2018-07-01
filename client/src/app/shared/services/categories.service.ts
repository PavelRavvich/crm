import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../interfaces";
import {Observable} from "rxjs/index";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient) {
    }

    fetch(): Observable<Category[]> {
        return this.http.get<Category[]>('/api/category');
    }
}
