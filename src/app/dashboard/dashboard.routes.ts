import { Routes } from "@angular/router";

export const dashboard: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'informacion',
                pathMatch: 'full'
            },
            {
                path: 'info',
                title: 'Información',
                data: {
                    icon: 'fa-solid fa-circle-info',
                    colors: 'text-orange-500'
                },
                loadComponent: () => import('./pages/informacion/informacion.component')
            },
            {
                path: 'convoluciones',
                title: 'Convoluciones',
                data: {
                    icon: 'fa-solid fa-file-image',
                    colors: 'text-green-500'
                },
                loadComponent: () => import('./pages/convoluciones/convoluciones.component')
            },
            {
                path: 'control',
                title: 'Control',
                data: {
                    icon: 'fa-solid fa-gamepad',
                    colors: 'text-purple-500'
                },
                loadComponent: () => import('./pages/control/control.component')
            },
            {
                path: 'tensorflow',
                title: 'TensorFlow',
                data: {
                    icon: 'fa-solid fa-robot',
                    colors: 'text-yellow-500'
                },
                loadComponent: () => import('./pages/tensorflow/tensorflow.component')
            }
        ]
    }
]