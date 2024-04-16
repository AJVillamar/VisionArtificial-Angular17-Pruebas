import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CameraService } from '../../../shared/services/camera.service';
import { VideoProcessingService } from '../../../core/services/control/video-processing.service';
import { RgbColor } from '../../../core/interfaces/rgbColor';
import { TitleComponent } from '../../../shared/title/title.component';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [
    TitleComponent
  ],
  templateUrl: './control.component.html',
  styles: ``
})
export default class ControlComponent implements OnInit, AfterViewInit, OnDestroy {

  loading: boolean = true;

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>
  @ViewChild('canva') canva!: ElementRef<HTMLCanvasElement>
  @ViewChild('imgcar') imgcar!: ElementRef<HTMLImageElement>

  constructor(
    private _camaraService: CameraService,
    private _processingService: VideoProcessingService
  ) { }

  ngOnInit(): void {
    this.openCamara()
  }

  ngOnDestroy(): void {
    this.closeCamara();
  }

  ngAfterViewInit(): void {
    this.video.nativeElement.addEventListener('canplay', () => {
      this.loading = false;
      this.procesarCamara();
    });
  }

  private openCamara() {
    this._camaraService.openCamera(300, 300)
      .then((stream) => this.video.nativeElement.srcObject = stream)
      .catch((error) => console.error('Error accessing camera:', error));
  }

  private closeCamara() {
    this._camaraService.closeCamera();
  }

  private procesarCamara() {
    const rgbColor:  RgbColor = {
      r: 255,
      g: 0,
      b: 0
    }
    this._processingService.procesarVideo(
      this.video.nativeElement,
      this.canva.nativeElement,
      rgbColor,
      this.imgcar.nativeElement
    );
  }

}
