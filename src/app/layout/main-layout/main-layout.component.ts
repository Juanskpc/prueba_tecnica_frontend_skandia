import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-main-layout',
    imports: [
        RouterModule,
        CommonModule
    ],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

    /**
     * Variable para capturar la acción de expandir el sidebar
     */
    isExpanded: boolean = false;

}
