import axios from 'axios'
import {displayName, displayNumber, typeNumber} from './helperFunctions'
import {Params, Pokemon} from './interface'

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/'
const TYPE_URL = 'https://pokeapi.co/api/v2/'
const IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'

export const fetchPokemonEvolutions = async (url: string) => {
  return axios.get(url)
    .then(res => res.data.chain)
    .then(evolution => {
      if (!evolution.evolves_to[0])
        return [{
          pokemon: {
            name: '',
            image: ''
          }
        },
          {
            pokemon: {
              name: '',
              image: ''
            }
          },
          {
            pokemon: {
              name: '',
              image: ''
            }
          }]
      switch (evolution.evolves_to[0].evolves_to.length) {
        case 0:
          return [{
            pokemon: {
              name: evolution.species.name,
              image: `${IMAGE_URL}${evolution.species.url.split('/')[6]}.png`
            }
          },
            {
              pokemon: {
                name: evolution.evolves_to[0].species.name,
                image: `${IMAGE_URL}${evolution.evolves_to[0].species.url.split('/')[6]}.png`
              }
            },
            {
              pokemon: {
                name: '',
                image: ''
              }
            }]
        case 1:
          return [{
            pokemon: {
              name: evolution.species.name,
              image: `${IMAGE_URL}${evolution.species.url.split('/')[6]}.png`
            }
          },
            {
              pokemon: {
                name: evolution.evolves_to[0].species.name,
                image: `${IMAGE_URL}${evolution.evolves_to[0].species.url.split('/')[6]}.png`
              }
            },
            {
              pokemon: {
                name: evolution.evolves_to[0].evolves_to[0].species.name,
                image: `${IMAGE_URL}${evolution.evolves_to[0].evolves_to[0].species.url.split('/')[6]}.png`
              }
            }]
       }
    })
}

export const fetchPokemonDetails = async (id: number) => {
  return axios.get(`${POKEMON_URL}${id}`)
    .then((res) => (res.data))
    .then((pokemon) => {
      const type_numbers = typeNumber(pokemon.types)
      const id_display = displayNumber(id)
      const name_display: string = displayName(pokemon.name)
      const image_display:
        string = `${IMAGE_URL}${id}.png`
      return {
        type_numbers,
        id_display,
        name_display,
        image_display,
        ...pokemon
      }
    })
}

export const fetchPokemonSpecies = async (id: number) => {
  return axios.get(`${TYPE_URL}pokemon-species/${id}`)
    .then(res => res.data)
}

export const fetchPokemonCollection = async (params: Params | undefined) => {
  return axios.get(POKEMON_URL, {params})
    .then((res) => res.data.results)
    .then((pokemons) => {
      return pokemons.map((pokemon: Pokemon) => {
        const id = parseInt(pokemon.url.split('/')[6])
        const id_display = displayNumber(id)
        const name_display: string = displayName(pokemon.name)
        const image_display:
          string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        return {
          id,
          name_display,
          id_display,
          image_display,
        }
      })
    })
}

// Takes an array of pokemon types and fetches and converts several arrays into a list of weaknesses for the given types

export const fetchPokemonWeakness = async (type: Array<string>) => {
  let weaknessArray: Array<string> = []
  for (let number of type) {
    await axios.get(`${TYPE_URL}type/${number}`)
      .then(res => res.data)
      .then(types => {
        for (let type of types.damage_relations.double_damage_from) {
          weaknessArray.push(type.name)
        }
        for (let type of types.damage_relations.double_damage_to) {
          weaknessArray = weaknessArray.filter(e => e !== type.name)
        }
        for (let type of types.damage_relations.half_damage_from) {
          weaknessArray = weaknessArray.filter(e => e !== type.name)
        }
        for (let type of types.damage_relations.no_damage_from) {
          weaknessArray = weaknessArray.filter(e => e !== type.name)
        }
      })
  }
  return weaknessArray
}
