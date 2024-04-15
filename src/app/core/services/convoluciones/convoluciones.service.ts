import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvolucionesService {

  convolucionar(
    canvasOrigen: HTMLCanvasElement,
    canvasDestino: HTMLCanvasElement,
    kernel: number[][],
    divisor: number
  ): void {

    const ctxOrigen = canvasOrigen.getContext('2d', { willReadFrequently: true });
    const ctxDestino = canvasDestino.getContext('2d', { willReadFrequently: true });

    if (!ctxOrigen || !ctxDestino) {
      console.error('No se pudo obtener el contexto del canvas.');
      return;
    }

    ctxDestino.clearRect(0, 0, canvasDestino.width, canvasDestino.height);

    const imgDataOrigen = ctxOrigen.getImageData(0, 0, canvasOrigen.width, canvasOrigen.height);
    const pixelesOrigen = imgDataOrigen.data;

    const imgDataDestino = ctxDestino.getImageData(0, 0, canvasOrigen.width, canvasOrigen.height);
    const pixelesDestino = imgDataDestino.data;

    for (let y = 1; y < canvasOrigen.height - 1; y++) {
      for (let x = 1; x < canvasOrigen.width - 1; x++) {

        let idk = ((y * canvasOrigen.width) + x) * 4;
        let val = 0;

        for (let k1 = 0; k1 < kernel.length; k1++) {
          for (let k2 = 0; k2 < kernel[k1].length; k2++) {

            let k = kernel[k1][k2];
            let offset = Math.floor(kernel.length / 2);
            let ii = (((y + k1 - offset) * canvasOrigen.width) + (x + k2 - offset)) * 4;
            val += pixelesOrigen[ii] * k;

          }
        }

        val = val / divisor;

        pixelesDestino[idk] = val;
        pixelesDestino[idk + 1] = val;
        pixelesDestino[idk + 2] = val;
        pixelesDestino[idk + 3] = 255;
      }
    }

    ctxDestino.putImageData(imgDataDestino, 0, 0);
  }

}
