import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';


import {
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { MessageListComponent } from './messagelist/messagelist.component';
import { HttpModule } from '@angular/http';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { StoresComponent } from './stores/stores.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListViewComponent } from './shopping-list-view/shopping-list-view.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreListViewComponent } from './store-list-view/store-list-view.component';
import { StoreComponent } from './store/store.component';
import { LoadLocationDirective } from './load-location.directive';
import { ItemComponent } from './item/item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; 
import { DashboardModule } from './dashboard/dashboard.module';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'implicit/callback',component: OktaCallbackComponent},
  { path: '**', component: PageNotFoundComponent }
  /*
  { path: 'home', component: HomeComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'settings', component: SettingsComponent } */
];


const config = {
  issuer: 'https://dev-592450.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oa1qf2z5uDnqNM5s357',
  pkce: true
};


@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    AppSidebarComponent,
    ListsComponent,
    HomeComponent,
    StoresComponent,
    SettingsComponent,
    HeaderBarComponent,
    ShoppingListComponent,
    ShoppingListViewComponent,
    StoreListComponent,
    StoreListViewComponent,
    StoreComponent,
    LoadLocationDirective,
    ItemComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatSidenavModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    DashboardModule,
    OktaAuthModule.initAuth(config),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[StoreComponent]
})
export class AppModule { }
