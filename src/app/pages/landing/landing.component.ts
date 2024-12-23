import {Component, inject} from '@angular/core';
import {AutocompleteComponent} from '../../components/autocomplete/autocomplete.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [
    AutocompleteComponent
  ],
  templateUrl: './landing.component.html',
  standalone: true,
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  private readonly _router = inject(Router);

  onAutocompleteChange(city: any) {
    this._router.navigate(['forecast'], { queryParams: { city } });
  }
}
