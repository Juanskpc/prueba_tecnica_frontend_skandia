import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../core/services/home.service';
import { Card, ListCard } from '../../interfaces/card.interface';
import { catchError, of } from 'rxjs';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    imports: [
        CommonModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    @ViewChild('carrusel') carruselRef!: ElementRef;

    /**
     * Lista de productos para iterar las cards
     */
    lstProductosCard!: ListCard[];

    /**
     * Paso que da el usuario en px
     */
    step: number = 352 + 20; // Sumo el ancho de la card con el margen

    /**
     * Cantidad de traslación que lleva el carrusel
     */
    currentTranslate: number = 0;

    /**
     * Máximo que puede trasladar el carrusel
     */
    maxTranslate: number = 1; //Inicio en 1 para habilitar boton de mover carrusel a la derecha

    /**
     * Ancho del carrusel (dinámico para validar en móviles)
     */
    carruselWidth: number = 0;

    /**
     * Variable para obtener el año actual
     */
    year: number = (new Date()).getFullYear()

    /**
     * Bandera para capturar error del API de productos
     */
    errorCardList: boolean = false;

    constructor(
        private homeService: HomeService //Servicio para obtener la lista de productos
    ) {

    }

    ngOnInit(): void {
        //Obtiene la lista de productos para iterar en las cards
        this.homeService.getCardList()
            .pipe(
                catchError((error) => {
                    console.error(error)
                    this.errorCardList = true;
                    return of({ listCard: [] } as Card); // Retorno error del tipo que espera la petición
                })
            )
            .subscribe((res: Card) => {
                this.lstProductosCard = res.listCard;
                console.log(res);
            })
    }

    /**
     * Método que se ejecuta después de cargar el contenido visual
     */
    ngAfterViewInit() {
        this.carruselWidth = this.carruselRef.nativeElement.clientWidth; // equivale a tu calc(100% - 10rem)
        const trackWidth = this.carruselRef.nativeElement.querySelector('.carrusel-track').scrollWidth;

        this.maxTranslate = this.carruselWidth - trackWidth; // hasta dónde se puede mover
    }

    /**
     * Método para mover el carrusel a la izquierda
     */
    moverIzquierda() {
        //Se suma los clicks con el ancho de la card + el margen
        this.currentTranslate += this.step;
        // Evita que se pase de la izquierda
        if (this.currentTranslate > 0) {
            this.currentTranslate = 0;
        }
    }

    /**
     * Método para mover el carrusel a la derecha
     */
    moverDerecha() {
        // calcula el ancho total de todas las cards (sumo 1 porque hay una card estática, que no viene del arreglo del api)
        const totalWidth = (this.lstProductosCard.length + 1) * this.step;

        // usamos el ancho real del carrusel (responsive)
        const containerWidth = this.carruselWidth;

        this.currentTranslate -= this.step;

        // límite de movimiento
        this.maxTranslate = -(totalWidth - containerWidth);

        if (this.currentTranslate < this.maxTranslate) {
            this.currentTranslate = this.maxTranslate;
        }
    }

}
