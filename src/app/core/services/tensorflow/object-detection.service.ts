import { Injectable } from '@angular/core';
import * as cocoSSD from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectDetectionService {

  async predictWithCocoModel(
    canva: HTMLCanvasElement,
    video: HTMLVideoElement
  ) {
    try {
      await tf.setBackend('webgl')
      const model = await cocoSSD.load()
      this.detectFrame(canva, video, model)
    } catch (error) {
      console.error('Error loading COCO-SSD model: ', error);
    }
  }

  detectFrame(
    canva: HTMLCanvasElement,
    video: HTMLVideoElement,
    model: cocoSSD.ObjectDetection
  ) {
    model.detect(video)
      .then(predictions => {
        this.renderPredictions(canva, video, predictions)
        requestAnimationFrame(() => this.detectFrame(canva, video, model))
      })
  }

  renderPredictions = (
    canva: HTMLCanvasElement,
    video: HTMLVideoElement,
    predictions: cocoSSD.DetectedObject[]
  ) => {

    const ctx = canva.getContext('2d', { willReadFrequently: true });

    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas.');
      return;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    //Font options
    const font = '26px sans-serif'
    ctx.font = font
    ctx.textBaseline = "top"

    ctx.drawImage(video, 0, 0, canva.width, canva.height)

    const cornerRadius = 5;

    predictions.forEach(prediction => {
      const { bbox: [x, y, width, height], class: label } = prediction;

      ctx.beginPath();
      ctx.moveTo(x + cornerRadius, y);
      ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
      ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
      ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
      ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);

      ctx.strokeStyle = "#0F0";
      ctx.lineWidth = 4;
      ctx.stroke(); // Draw the rounded border

      ctx.fillStyle = '#0F0';
      const padding = 5

      // Draw the label text with horizontal inversion
      ctx.save();
      ctx.scale(-1, 1);
      ctx.fillText(label, -x - width + padding, y + padding);
      ctx.restore(); 
    });
  }

}