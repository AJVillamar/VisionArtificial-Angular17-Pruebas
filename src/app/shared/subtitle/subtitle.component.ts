import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  standalone: true,
  imports: [],
  template: `
    <div class="w-max ps-2 mt-5 mb-0.5">
      <span class="text-lg font-protestRiot text-white"> {{ label }} </span>
    </div>
  `
})
export class SubtitleComponent {

  @Input({ required: true }) label!: string

}
