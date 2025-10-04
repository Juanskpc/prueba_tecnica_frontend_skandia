import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
    {
        path: 'app',
        component: MainLayoutComponent,
        children: [ 
            {
                path: 'home',
                component: HomeComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'app/home'
    }
];
