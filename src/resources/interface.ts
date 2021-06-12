export interface Type {
  type: {
    url: string
    name: string
  }
}

export interface Evolution {
  pokemon: {
    name: string
    image: string
  }
}

export interface Species {
  flavor_text_entries: FlavorText[]
  evolution_chain: {
    url: string
  }
}

export interface FlavorText {
  flavor_text: string
}

export interface TypeObject {
  damage_relations : {
    double_damage_to: string
    double_damage_from: string
    half_damage_to: string
    half_damage_from: string
  }
}
export interface PokemonDisplayListProps {
  match: {
    path: string
  }
  search: string
}

export interface Params {
  offset: number
  limit: number
}

export interface Pokemon {
  id: number,
  name: string,
  id_display: number,
  name_display: string,
  image_display: string
  type_numbers: Array<string>
  [x: string]: any
}

export interface Types {
  types: Array<string>
  weakness: Array<string>
  pokemon: Pokemon
}