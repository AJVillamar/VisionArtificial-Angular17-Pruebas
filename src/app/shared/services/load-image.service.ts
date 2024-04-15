import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadImageService {

  loadImage(
    canvasOrigen: HTMLCanvasElement,
    urlImage: string
  ): void {
    if (!canvasOrigen) {
      console.error('El elemento canvas no se encontró en el DOM.');
      return;
    }
    let image = new Image()
    image.onload = () => {
      const ctx = canvasOrigen.getContext("2d")
      if (ctx) {
        canvasOrigen.width = image.width
        canvasOrigen.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
      }
    }
    image.src = urlImage
  }

}
