import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, signal, viewChild } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import { CameraService } from '../../../shared/services/camera.service';
import { ObjectDetectionService } from '../../../core/services/tensorflow/object-detection.service';

@Component({
  selector: 'app-tensorflow',
  standalone: true,
  imports: [
    TitleComponent
  ],
  templateUrl: './tensorflow.component.html'
})
export default class TensorflowComponent implements OnInit, OnDestroy, AfterViewInit {

  public loading = signal<boolean>(true);

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>
  @ViewChild('canva') canva!: ElementRef<HTMLCanvasElement>

  constructor(
    private _camaraService: CameraService,
    private _objectDetection: ObjectDetectionService
  ) { }

  ngOnInit(): void {
    this.openCamara()
  }

  ngOnDestroy(): void {
    this.closeCamara()
  }

  ngAfterViewInit(): void {
    this.video.nativeElement.addEventListener('canplay', () => {
      this._objectDetection.predictWithCocoModel(
        this.canva.nativeElement,
        this.video.nativeElement,
      ).then(() => this.loading.set(false))
    })
  }

  private openCamara() {
    this._camaraService.openCamera(400, 400)
      .then((stream) => this.video.nativeElement.srcObject = stream)
      .catch((error) => console.error('Error accessing camera: ', error))
  }

  private closeCamara() {
    this._camaraService.closeCamera()
  }

}
