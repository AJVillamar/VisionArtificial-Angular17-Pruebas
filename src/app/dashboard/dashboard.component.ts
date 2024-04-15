import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from '../shared/side-nav/side-nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SideNavComponent,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html'
})
export default class DashboardComponent {

}
