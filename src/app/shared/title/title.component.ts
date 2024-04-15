import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  template: `
    <div class="w-max mb-5">
      <span class="text-3xl font-protestRiot text-white"> {{ label }} </span>
      <hr class="h-px bg-transparent mt-1 border-t-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-100" />
    </div>
  `
})
export class TitleComponent {

  @Input({ required: true }) label!: string

}
