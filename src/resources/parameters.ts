import { Params } from './interface'

export const getDexChoiceParams = (pokedexSelect:string) => {
  let params: Params
  switch(pokedexSelect) {
    case '':
      params = {limit: 898, offset: 0}
      return params
    case 'Kanto':
      params = {limit: 151, offset: 0}
      return params
    case 'Johto':
      params = {limit: 100, offset: 151}
      return params
    case 'Hoenn':
      params = {limit: 134, offset: 251}
      return params
    case 'Sinnoh':
      params = {limit: 108, offset: 386}
      return params
    case 'Unova':
      params =  {limit: 155, offset: 494}
      return params
    case 'Kalos':
      params = {limit: 72, offset: 649}
      return params
    case 'Alola':
      params = {limit: 88, offset: 721}
      return params
    case 'Galar':
      params = {limit: 89, offset: 809}
      return params
  }
}
