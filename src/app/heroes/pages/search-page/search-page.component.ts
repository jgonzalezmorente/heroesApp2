import { Component, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor( private heroesService: HeroesService ) {}

  searchHero(): void {
    const value: string = this.searchInput.value || '';
    this.heroesService.getSuggestions( value ).subscribe(
      heroes => this.heroes = heroes
    );
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    console.log( event.option.value );
    if ( !event.option.value ) {
      return this.selectedHero = undefined;
    }
    const hero: Hero = event.option.value;
    this.selectedHero = hero;
    this.searchInput.setValue( this.selectedHero.superhero );
  }

}
