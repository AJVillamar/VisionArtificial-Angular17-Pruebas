import { Component, ElementRef, ViewChild } from '@angular/core';
import { OptionsService } from '../../../core/services/convoluciones/options.service';
import { LoadImageService } from '../../../shared/services/load-image.service';
import { SubtitleComponent } from '../../../shared/subtitle/subtitle.component';
import { TitleComponent } from '../../../shared/title/title.component';

@Component({
  selector: 'app-convoluciones',
  standalone: true,
  imports: [
    TitleComponent,
    SubtitleComponent
  ],
  templateUrl: './convoluciones.component.html',
  styles: ``
})
export default class ConvolucionesComponent {

  private readonly _urlImage = 'assets/img/image.png'

  @ViewChild('canvasOrigen') canvasOrigen!: ElementRef<HTMLCanvasElement>
  @ViewChild('canvasDestino') canvasDestino!: ElementRef<HTMLCanvasElement>

  constructor(
    private _opcionesService: OptionsService,
    private _loadImg: LoadImageService
  ) { }

  ngAfterViewInit(): void {
    this._loadImg.loadImage(this.canvasOrigen.nativeElement, this._urlImage)
    this._loadImg.loadImage(this.canvasDestino.nativeElement, this._urlImage)
  }

  onOptionsChange(event: Event) {
    const target = event?.target as HTMLSelectElement
    this._opcionesService.optionsMethod(
      target.value,
      this.canvasOrigen.nativeElement,
      this.canvasDestino.nativeElement
    )
  }

  optionSelect = [
    { value: '1', title: 'Identidad' },
    { value: '2', title: 'Eje básico' },
    { value: '3', title: 'Desenfoque basico mal' },
    { value: '4', title: 'Desenfoque basico' },
    { value: '5', title: 'Desenfoque Gaussiano' },
    { value: '6', title: 'Enfocar' },
    { value: '7', title: 'Realzar' },
    { value: '8', title: 'Sobel horizontal' },
    { value: '9', title: 'Sobel vertical' }
  ]

}
