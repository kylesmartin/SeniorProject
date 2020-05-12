import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { StoresComponent } from '../stores/stores.component';
import { ListsComponent } from '../lists/lists.component';
import { SettingsComponent  } from '../settings/settings.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { LayoutComponent } from './layout/layout.component';
export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home',component:HomeComponent},
    { path: 'lists', component: ListsComponent },
    { path: 'stores', component: StoresComponent },
    { path: 'settings', component: SettingsComponent } 
    ]
  }
];
