import { Injectable, inject } from '@angular/core';
import { ConvolucionesService } from './convoluciones.service';

@Injectable({
  providedIn: 'root' 
})
export class OptionsService {

  private _convolucionesService = inject(ConvolucionesService)

  optionsMethod(
    option: string,
    canvasOrigen: HTMLCanvasElement,
    canvasDestino: HTMLCanvasElement
  ) {
    let kernel

    switch (option) {

      /* Identidad */
      case '1':
        kernel = [
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 0],
        ];
        this._convolucionesService.convolucionar(canvasOrigen, canvasDestino, kernel, 1)
        break

      /* Eje basico */
      case '2':
        kernel = [
          [-1, -1, -1],
          [-1, 8, -1],
          [-1, -1, -1],
        ];
        this._convolucionesService.convolucionar(canvasOrigen, canvasDestino, kernel, 1)
        break

      /* Desenfoque basico mal */
      case '3':
        kernel = [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ];
        this._convolucionesService.convolucionar(canvasOrigen, canvasDestino, kernel, 1)
        break

      /* Desenfoque basico */
      case '4':
        kernel = [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ];
        this._convolucionesService.convolucionar(canvasOrigen, canvasDestino, kernel, 9)
        break

      /* Desenfoque Gaussiano */
      case '5':
        kernel = [
          [1, 4, 6, 4, 1],
          [4, 16, 24, 16, 4],
          [6, 24, 36, 24, 6],
          [4, 16, 24, 16, 4],
          [1, 4, 6, 4, 1],
        ];
        this._convolucionesService.convolucionar(canvasOrigen, canvasDestino, kernel, 256)
        break

      /* Enfocar */
      case '6':
        kernel = [
          [0, -1, 0],
          [-1, 5, -1],
          [0, -1, 0],
        ];
        this._convolucionesService.convolucionar(canvasOrigen, canvasDestino, kernel, 1)
        break

      /* Realzar */
      case '7':
        kernel = [
          [-2, -1, 0],
          [-1, 1, 1],
          [0, 1, 2],
        ];
        this._convolucionesService.convolucionar(canvasOrigen, canvasDestino, kernel, 1)
        break

      /* Sobel horizontal */
      case '8':
        kernel = [
          [-1, -2, -1],
          [0, 0, 0],
          [1, 2, 1],
        ];
        this._convolucionesService.convolucionar(canvasOrigen, canvasDestino, kernel, 1)
        break

      /* Sobel vertical */
      case '9':
        kernel = [
          [-1, 0, 1],
          [-2, 0, 2],
          [-1, 0, 1],
        ];
        this._convolucionesService.convolucionar(canvasOrigen, canvasDestino, kernel, 1)
        break
    }
    
  }

}
