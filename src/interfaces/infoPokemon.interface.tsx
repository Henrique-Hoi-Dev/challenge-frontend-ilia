interface Value {
  type: string;
  value: string;
}

interface Dano {
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: string;
}

interface Dados {
  id: string;
  name: string;
  types: [string];
  imageUrl: string;
 resistances: Value[];
 weaknesses: Value[];
 attacks: Dano[];
}

type PokemonInfo = {
  card: Dados;
}

export default PokemonInfo