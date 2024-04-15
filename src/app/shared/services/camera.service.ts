import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private stream: MediaStream | null = null;

  async openCamera(width: number, height: number): Promise<MediaStream> {
    const options = {
      audio: false,
      video: {
        width: width,
        height: height
      }
    };
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(options);
      return this.stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
      throw error;
    }
  }

  closeCamera(): void {
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
      this.stream = null;
    }
  }

}
