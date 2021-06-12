import React from 'react'
import {useState, useEffect} from "react";
import "@dossier/mithra-ui/dist/ds.css"
import {Card} from '@dossier/mithra-ui';
import {cardStyles, cardContainerStyles, loadingStyles} from '../resources/inlineStyles'
import {getDexChoiceParams} from '../resources/parameters'
import {fetchPokemonCollection} from '../resources/fetch'
import {Params, Pokemon, PokemonDisplayListProps} from '../resources/interface'
import PokemonDetailView from './PokemonDetailView';
// import PokemonSearchDisplay from "./PokemonSearchDisplay";

const Loading = require('react-loading-animation')

type Props = PokemonDisplayListProps

const PokemonDisplay: React.FC<Props> = props => {

  const [pokemonDisplayList, setPokemonDisplayList] = useState<Pokemon[]>([])
  const [params, setParams] = useState<Params | any>({offset: 0, limit: 898})
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchString, setSearchString] = useState<string>(props.search)
  const [filteredList, setFilteredList] = useState<Pokemon[]>([])
  const [allPokemonDisplayList, setAllPokemonDisplayList] = useState<Pokemon[]>([])


  useEffect(() => {
    const dexSelection = () => {
      try {
        setLoading(true)
        let select = props.match.path.substr(1)
        let parameters: Params | any = getDexChoiceParams(select)
        setParams(parameters)
        setPokemon(null)
      } catch (e) {
        setError(e.message)
        alert(error)
      }
    }
    dexSelection()
  }, [props.match.path, error])

  useEffect(() => {
    const showPokemon = async () => {
      try {
        let pokemonList = await fetchPokemonCollection(params)
        let fullList = await fetchPokemonCollection({offset: 0, limit: 898})
        setPokemonDisplayList(pokemonList)
        setAllPokemonDisplayList(fullList)
      } catch (e) {
        setError(e.message)
        alert(error)
      }
    }
    showPokemon()
    setLoading(false)
  }, [params, error, searchString])

  useEffect(() => {
    const handleSearchInput = () => {
      if(searchString) {
        let filtered = allPokemonDisplayList
          .filter(pokemon =>
            pokemon.name_display
              .toLowerCase()
              .includes(searchString.toLowerCase()) || pokemon.id.toString() === searchString)
        setFilteredList(filtered)
      }
    }
    handleSearchInput()
  }, [allPokemonDisplayList]);

  const handlePokemonCardClick = (pokemon: Pokemon | null) => {
    setPokemon(pokemon)
  }

  return (
    <div>
      {/*<button onClick={set}>set list</button>*/}
      {/*<button onClick={log}>log list</button>*/}
      {loading && (<Loading style={loadingStyles}/>)}
      {pokemon && (<PokemonDetailView pokemon={pokemon}/>)}
      {(!loading && !pokemon && !searchString)
        ?
        <div style={cardContainerStyles}>
          {pokemonDisplayList.map((pokemon, index) =>
            (<Card onClick={() => handlePokemonCardClick(pokemon)} key={index} style={cardStyles}>
              <img style={{width: '140px'}} alt={pokemon.name_display} src={pokemon.image_display}/>
              <p>#{pokemon.id_display} {pokemon.name_display}</p>
            </Card>))}
        </div>
        : <></>
      }
      {(!loading && !pokemon && searchString)
        ?
        <div style={cardContainerStyles}>
          {filteredList.map((pokemon, index) =>
            (<Card onClick={() => handlePokemonCardClick(pokemon)} key={index} style={cardStyles}>
              <img style={{width: '140px'}} alt={pokemon.name_display} src={pokemon.image_display}/>
              <p>#{pokemon.id_display} {pokemon.name_display}</p>
            </Card>))}
        </div>
        : <></>
      }
    </div>)
}
export default PokemonDisplay
