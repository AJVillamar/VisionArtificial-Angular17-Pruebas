import { Component } from '@angular/core';
import { dashboard } from '../../dashboard/dashboard.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './side-nav.component.html',
  styles: ``
})
export class SideNavComponent {

  public menuItems = dashboard
    .map(route => route.children ?? [])
    .flat()
    .filter(route => route && route.path)
    .filter(route => route && !route.path?.includes(':'))

}
