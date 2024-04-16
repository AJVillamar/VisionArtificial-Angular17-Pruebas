import { Injectable, inject } from '@angular/core';
import { ControlBEService } from './control-BE.service';
import { RgbColor } from '../../interfaces/rgbColor';
import { PixelCollection } from '../../interfaces/pixelCollection';

@Injectable({
  providedIn: 'root'
})
export class VideoProcessingService {

  private distanciaAceptableColor: number = 170
  private movimientoGradoAnterior: number = 0;
  private _peticiones = inject(ControlBEService)

  procesarVideo(
    videoElement: HTMLVideoElement,
    canvasElement: HTMLCanvasElement,
    color: RgbColor,
    imgcar: HTMLImageElement
  ): void {

    const ctx = canvasElement.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas.');
      return;
    }

    const drawFrame = () => {
      if (ctx && videoElement.videoWidth && videoElement.videoHeight) {
        canvasElement.width = videoElement.videoWidth
        canvasElement.height = videoElement.videoHeight

        ctx.drawImage(
          videoElement,
          0, 0,
          canvasElement.width,
          canvasElement.height
        )

        const imgData = ctx.getImageData(
          0, 0,
          canvasElement.width,
          canvasElement.height
        )
        const pixeles = imgData.data

        const objetos: PixelCollection[] = [];

        for (let p = 0; p < pixeles.length; p += 4) {
          const rojo = pixeles[p]
          const verde = pixeles[p + 1]
          const azul = pixeles[p + 2]
          const alpha = pixeles[p + 3]

          const distancia = Math.sqrt(
            Math.pow(color.r - rojo, 2) +
            Math.pow(color.g - verde, 2) +
            Math.pow(color.b - azul, 2)
          )

          if (distancia < this.distanciaAceptableColor) {
            const y = Math.floor(p / 4 / canvasElement.width)
            const x = (p / 4) % canvasElement.width

            let encontrado: boolean = false

            for (let i = 0; i < objetos.length; i++) {
              if (objetos[i].estaCerca(x, y)) {
                objetos[i].agegarPixel(x, y)
                encontrado = true
                break
              }
            }
            if (!encontrado) {
              objetos.push(new PixelCollection(x, y))
            }
          }
        }

        ctx.putImageData(imgData, 0, 0)

        const objetoUnido = PixelCollection.unirArreglos(objetos);

        let masGrande = null;
        let mayorTamano = -1;

        for (let pl = 0; pl < objetoUnido.length; pl++) {
          const width = objetoUnido[pl].xMaxima - objetoUnido[pl].xMinima
          const heigth = objetoUnido[pl].yMaxima - objetoUnido[pl].yMinima
          const area = width * heigth

          if (area > 1500) {
            if (masGrande === null || area > mayorTamano) {
              masGrande = objetoUnido[pl]
              mayorTamano = area
            }
          }
        }

        const sensibilidad: number = 1.2
        let movimientoGrado = 0

        if (masGrande !== null) {
          masGrande.dibujar(ctx);
          imgcar.style.transform = `rotate(${(masGrande.grados * -1) * sensibilidad}deg)`;

          movimientoGrado = masGrande.grados >= 10 ? -1 : masGrande.grados <= -10 ? 1 : 0;

          if (movimientoGrado !== this.movimientoGradoAnterior) {
            //this._peticiones.movimiento(movimientoGrado, masGrande.xMinima).subscribe()
          }
          this.movimientoGradoAnterior = movimientoGrado
        }

        requestAnimationFrame(drawFrame)

      } else {
        console.warn('El contexto del canvas no es válido o el video no tiene datos.');
      }
    }

    drawFrame()
  }

}
