import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/http/pokemon/pokemon.service';
import { debounceTime, Observable } from 'rxjs';
import { Pokemon, PokemonForm } from 'src/app/types/pokemon.types';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons$: Observable<Pokemon[]>;
  isLoading = false;
  searchForm: FormGroup;
  showCreateUpdateForm: boolean = false;
  pokemon: Pokemon;

  constructor(
    private pokemonService: PokemonService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.getAllPokemons();
    this.searchForm = this.fb.group({
      name: [null]
    });
    this.name?.valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe((value) => {
        this.search(value);

      });
  }

  get name() {
    return this.searchForm.get('name');
  }

  getAllPokemons(name: string) {
    this.pokemons$ = this.pokemonService.getAllPokemons(name);
  }

  deletePokemon(id: number) {
    const shouldDelete = confirm('¿Esta seguro que desea eliminar el registro?');

    if (!shouldDelete) {
      return;
    }

    this.isLoading = true;
    this.pokemonService.deletePokemon(id)
      .subscribe({
        next: () => {
          this.getAllPokemons('');
          this.isLoading = false;
          alert('Registro eliminado');
        },
        error: () => {
          this.isLoading = false;
          alert('Error al eliminar el registro');
        }
      });
  }

  search(name: string) {
    this.getAllPokemons(name);
  }

  addPokemon() {
    this.showCreateUpdateForm = true;
  }

  editPokemon(pokemon: Pokemon) {
    this.showCreateUpdateForm = true;
    this.pokemon = pokemon;
  }

  closeForm() {
    this.showCreateUpdateForm = false;
  }

  submitForm($event: PokemonForm) {
    this.pokemon = {} as Pokemon;
    this.isLoading = true;

    if ($event.isCreating) {
      this.pokemonService.createPokemon($event.pokemon)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.getAllPokemons('');
            this.showCreateUpdateForm = false;
            alert('Registro creado');
          },
          error: () => {
            this.isLoading = false;
          }
        });
    } else {
      this.pokemonService.updatePokemon($event.pokemon.id, $event.pokemon)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.getAllPokemons('');
            this.showCreateUpdateForm = false;
            alert('Registro actualizado');
          },
          error: () => {
            this.isLoading = false;
            alert('Error al actualizar el registro');
          }
        });
    }
  }
}
