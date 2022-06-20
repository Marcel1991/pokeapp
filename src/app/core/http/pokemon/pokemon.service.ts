import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/types/pokemon.types';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly URL = environment.appApiUrl + '/pokemons';

  constructor(
    private http: HttpClient
  ) {
  }

  getAllPokemons(name?: string): Observable<Pokemon[]> {
    if (name) {
      const params = {name};
      return this.http.get<Pokemon[]>(this.URL, {params});
    }
    return this.http.get<Pokemon[]>(this.URL);
  }

  createPokemon(body: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.URL, body);
  }

  updatePokemon(id: number, body: Pokemon): Observable<Pokemon> {
    const url = `${this.URL}/${id}`;
    return this.http.put<Pokemon>(url, body);
  }

  deletePokemon(id: number): Observable<boolean> {
    const url = `${this.URL}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
