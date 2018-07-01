import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MaterialService} from "../../services/material.service";

@Component({
    selector: 'app-site-layout',
    templateUrl: './site-layout.component.html',
    styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {

    /**
     * Floating nav button.
     */
    @ViewChild('floating') floatingRef: ElementRef;

    /**
     * Nav bar lines,
     */
    links = [
        {url: '/overview', name: 'Обзор'},
        {url: '/analytics', name: 'Аналитика'},
        {url: '/history', name: 'История'},
        {url: '/order', name: 'Добавить заказ'},
        {url: '/categories', name: 'Ассортимент'}
    ];

    constructor(private auth: AuthService,
                private router: Router) {
    }

    /**
     * Initialize floating nav button after DOM initialized.
     */
    ngAfterViewInit() {
        MaterialService.initializeFloatingButton(this.floatingRef);
    }

    logout(event: Event) {
        event.preventDefault();
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
