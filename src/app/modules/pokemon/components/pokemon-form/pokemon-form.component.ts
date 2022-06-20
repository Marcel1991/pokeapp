import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon, PokemonForm } from 'src/app/types/pokemon.types';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Output() submit = new EventEmitter<PokemonForm>();
  @Output() cancelForm = new EventEmitter<void>();

  form: FormGroup;
  sliderMin = 0;
  sliderMax = 100;

  mode: 'create' | 'update' = 'update';

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    if (!this.pokemon) {
      this.pokemon = {} as Pokemon;
      this.mode = 'create';
    }

    this.form = this.fb.group({
      id: [this.pokemon.id],
      name: [this.pokemon.name, Validators.required],
      imageUrl: [this.pokemon.imageUrl, Validators.required],
      attack: [this.pokemon.attack, Validators.required],
      defense: [this.pokemon.defense, Validators.required]
    });
  }

  get name() {
    return this.form.get('name');
  }

  get imageUrl() {
    return this.form.get('imageUrl');
  }

  get attack() {
    return this.form.get('attack');
  }

  get defense() {
    return this.form.get('defense');
  }

  cancel() {
    this.cancelForm.emit();
  }

  save() {
    const form: PokemonForm = {
      isCreating: this.mode === 'create',
      pokemon: this.form.value
    };

    this.submit.emit(form);
  }
}
