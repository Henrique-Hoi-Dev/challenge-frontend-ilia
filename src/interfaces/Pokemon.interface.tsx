interface Dados {
  id?: string;
  name?: string;
  types?: [string];
  imageUrl?: string;
}

type Pokemons = {
  cards?: Dados[];
}

export default Pokemons;
