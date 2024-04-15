import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: '',
                loadChildren: () => import('./dashboard/dashboard.routes').then(r => r.dashboard)
            }
        ]
    }
];
