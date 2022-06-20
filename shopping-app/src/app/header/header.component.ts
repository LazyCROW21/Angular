import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscriber, Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    authSub: Subscription;
    isAuthenticated = false;

    constructor (
        private dataStorageService: DataStorageService, 
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authSub = this.authService.user.subscribe((user) => {
            this.isAuthenticated = !!user;
        });
    }

    onLogout() {
        this.authService.logout();
    }

    saveData() {
        this.dataStorageService.saveRecipes();
    }

    fetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.authSub.unsubscribe();
    }
}