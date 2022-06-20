import { TestBed } from '@angular/core/testing';

import { PokemonService } from 'src/app/core/http/pokemon/pokemon.service';
import {HttpClientModule} from "@angular/common/http";

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PokemonService);
  });

  it('Servicio Pokemon creado', () => {
    expect(service).toBeTruthy();
  });

  it('Debe realizar peticion de al menos 3 items', (done) => {
    service.getAllPokemons()
      .subscribe(results =>{
        expect(results.length >= 3).toBeTrue();
        done();
      })

  });
});
