import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Card } from '../../interfaces/card.interface';

describe('HomeService', () => {
    let service: HomeService;
    let httpMock: HttpTestingController;

    // Datos simulados según la respuesta del API de productos
    const dummyCards: Card = {
        listCard: [
            {
                nameProduct: "MFUND",
                numberProduct: "789654123",
                balanceProduct: "4000000",
                detaildProduct: "Ya tienes un 15% de tu objetivo "
            },
            {
                nameProduct: "CREA",
                numberProduct: "156123456",
                balanceProduct: "40000000",
                detaildProduct: "Ya tienes un 80% de tu objetivo "
            },
            {
                nameProduct: "FICS",
                numberProduct: "11213",
                balanceProduct: "15000",
                detaildProduct: "Ya tienes un 18% de tu objetivo "
            },
            {
                nameProduct: "BOLT",
                numberProduct: "122220",
                balanceProduct: "50000",
                detaildProduct: "Ya tienes un 1% de tu objetivo "
            }
        ]
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HomeService]
        });

        service = TestBed.inject(HomeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Verifica que no hayan solicitudes pendientes
    });

    // Prueba de creación
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // Prueba de respuesta exitosa
    it('should return a list of cards', () => {
        service.getCardList().subscribe(cards => {
            expect(cards.listCard.length).toBe(4);
            expect(cards).toEqual(dummyCards);
        });

        const req = httpMock.expectOne(service['apiUrl']);
        expect(req.request.method).toBe('GET');
        req.flush(dummyCards); // Respuesta simulada del API de productos
    });

    // Prueba de manejo de errores
    it('should handle error', () => {
        service.getCardList().subscribe({
            next: () => fail('should have failed with 500 error'),
            error: (error) => {
                expect(error.status).toBe(500);
            }
        });

        const req = httpMock.expectOne(service['apiUrl']);
        req.flush('Error del servidor', { status: 500, statusText: 'Server Error' });
    });
});