import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonFormComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class PokemonModule { }
