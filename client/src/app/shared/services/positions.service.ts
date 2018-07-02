import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Massage, Position} from "../interfaces";


@Injectable({
    providedIn: 'root'
})
export class PositionsService {

    constructor(private http: HttpClient) {
    }

    fetch(categoryId: string):Observable<Position[]> {
        return this.http.get<Position[]>(`/api/position/${categoryId}`);
    }

    create(position: Position) {
        return this.http.post<Position>('/api/position', position);
    }

    update(position: Position) {
        return this.http.patch<Position>(`/api/position/${position._id}`, position);
    }

    delete(position: Position) {
        return this.http.delete<Massage>(`/api/position/${position._id}`);
    }
}
