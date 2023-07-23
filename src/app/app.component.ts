import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStorage} from '@core/services/AppStorage';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    /**
     * Constructor
     */
    breadcrumbs: any[] = [];
    constructor( private activeRoute: ActivatedRoute, private router: Router, private _oathService: OAuthService) {}
    ngOnInit(): void {
      console.log(AppStorage.getAccessToken());
      console.log(AppStorage.getResourcePermission());
      console.log(this._oathService.getAccessToken());
    }



}
