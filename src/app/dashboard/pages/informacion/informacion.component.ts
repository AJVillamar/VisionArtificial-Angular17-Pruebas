import { Component } from '@angular/core';
import { SubtitleComponent } from '../../../shared/subtitle/subtitle.component';
import { TitleComponent } from '../../../shared/title/title.component';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [
    TitleComponent,
    SubtitleComponent
  ],
  templateUrl: './informacion.component.html',
  styles: ``
})
export default class InformacionComponent {

  kernal = [
    { numero: 0 }, { numero: 0 }, { numero: 0 },
    { numero: 0 }, { numero: 1 }, { numero: 0 },
    { numero: 0 }, { numero: 0 }, { numero: 0 }
  ]

  blanca = [
    { numero: 1 }, { numero: 1 }, { numero: 1 },
    { numero: 1 }, { numero: 1 }, { numero: 1 },
    { numero: 1 }, { numero: 1 }, { numero: 1 }
  ]

  blur = [
    { numero: 1 }, { numero: 1 }, { numero: 1 }, { numero: '' },
    { numero: 1 }, { numero: 1 }, { numero: 1 }, { numero: '/ 9' },
    { numero: 1 }, { numero: 1 }, { numero: 1 }, { numero: '' }
  ]

  verticalSobel = [
    { numero: -1 }, { numero: 0 }, { numero: 1 },
    { numero: -2 }, { numero: 0 }, { numero: 2 },
    { numero: -1 }, { numero: 0 }, { numero: 1 }
  ]

  horizontalSobel = [
    { numero: -1 }, { numero: -2 }, { numero: -1 },
    { numero: 0 }, { numero: 0 }, { numero: 0 },
    { numero: 1 }, { numero: 2 }, { numero: 1 }
  ]

}
