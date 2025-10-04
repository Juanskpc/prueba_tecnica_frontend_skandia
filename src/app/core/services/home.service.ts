import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, ListCard } from '../../interfaces/card.interface';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    /**
     * Declaración del api
     */
    private apiUrl = 'https://62e152f8fa99731d75d44571.mockapi.io/api/v1/test-front-end-skandia/cards';

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método que permite obtener la lista de productos
     * @returns { Array } Lista de productos para las cards
     */
    getCardList(): Observable<Card>{
        return this.http.get<Card>(this.apiUrl)
    }
}
