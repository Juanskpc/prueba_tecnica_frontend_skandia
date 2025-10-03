import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: 'home',
        component: MainLayoutComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
