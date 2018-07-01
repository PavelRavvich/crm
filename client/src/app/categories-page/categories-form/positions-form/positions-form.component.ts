import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-positions-form',
    templateUrl: './positions-form.component.html',
    styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit {


    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
    }


}
