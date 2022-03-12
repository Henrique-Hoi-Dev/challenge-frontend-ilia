interface Dados {
  id?: string;
  name?: string;
  types?: [string];
  imageUrl?: string;
}

type PokemonsHome = {
  cards: Dados[];
}

export default PokemonsHome