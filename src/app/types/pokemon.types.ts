export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  attack: number;
  defense: number;
}

export interface PokemonForm {
  isCreating: boolean;
  pokemon: Pokemon;
}
