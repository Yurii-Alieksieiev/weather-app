import {ChangeDetectionStrategy, Component, inject, OnDestroy, output, signal} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {OpenWeatherService} from '../../services/open-weather.service';
import {
  BehaviorSubject, catchError,
  debounceTime,
  distinctUntilChanged,
  finalize, map,
  of, Subscription,
  switchMap
} from 'rxjs';
import {ICityInfo, ICityShortInfo} from '../../interfaces/city.interface';

@Component({
  selector: 'app-autocomplete',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatAutocomplete,
    MatOption,
    MatProgressSpinner,
    MatAutocompleteTrigger,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './autocomplete.component.html',
  standalone: true,
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnDestroy {
  private readonly _openWeatherService = inject(OpenWeatherService);
  citiesList$ = new BehaviorSubject<ICityShortInfo[] | null>(null);
  isLoading = signal<boolean>(false);

  searchControl = new FormControl('');
  autocompleteChange = output<string>();
  sub$: Subscription;

  constructor() {
   this.sub$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => {
        if (!value || value.trim().length === 0) {
          return of(null);
        }

        this.isLoading.set(true);

        return this._openWeatherService.searchCity(value).pipe(
          map((res: any) => res.list as ICityShortInfo[]),
          catchError(() => of(null)),
          finalize(() => this.isLoading.set(false)),
        )
      })
    ).subscribe((res) => {
      this.citiesList$.next(res);
    });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  onSelectionChange(cityIdx: number) {
    if (this.citiesList$.value) {
      this.autocompleteChange.emit(this.citiesList$.value[cityIdx].name.toLowerCase());
    }
  }

  cleanSearch() {
    this.searchControl.setValue('');
  }
}
