import React from 'react'
import {useState, useEffect} from "react";
import "@dossier/mithra-ui/dist/ds.css"
import {Card} from '@dossier/mithra-ui';
import {cardStyles, cardContainerStyles, loadingStyles} from '../resources/inlineStyles'
import {getDexChoiceParams} from '../resources/parameters'
import {fetchPokemonCollection} from '../resources/fetch'
import {Params, Pokemon, PokemonDisplayListProps} from '../resources/interface'
import PokemonDetailView from './PokemonDetailView';

const Loading = require('react-loading-animation')

type Props = PokemonDisplayListProps

const PokemonDisplay: React.FC<Props> = props => {

  const [pokemonDisplayList, setPokemonDisplayList] = useState<Pokemon[]>([])
  const [params, setParams] = useState<Params | any>({offset: 0, limit: 898})
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)


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
        setPokemonDisplayList(pokemonList)
        setLoading(false)
      } catch (e) {
        setError(e.message)
        alert(error)
      }
    }
    showPokemon()
  }, [params, error])

  const handlePokemonCardClick = (pokemon: Pokemon | null) => {
    setPokemon(pokemon)
  }

  return (
    <div>
      {loading && (<Loading style={loadingStyles}/>)}
      {pokemon && (<PokemonDetailView pokemon={pokemon}/>)}
      {(!loading && !pokemon)
        ?
        <div style={cardContainerStyles}>
          {pokemonDisplayList.map((pokemon, index) =>
            (<Card onClick={() => handlePokemonCardClick(pokemon)} key={index} style={cardStyles}>
              <img style={{width: '140px'}} alt={"{pokemon}"} src={pokemon.image_display}></img>
              <p>#{pokemon.id_display} {pokemon.name_display}</p>
            </Card>))}
        </div>
        : <></>
      }
    </div>)
}
export default PokemonDisplay
