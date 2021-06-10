import {H1, Masonry, Panel, Text, Card, H2} from '@dossier/mithra-ui';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  fetchPokemonDetails,
  fetchPokemonEvolutions,
  fetchPokemonSpecies,
  fetchPokemonWeakness
} from '../resources/fetch';
import {createFlavorTextDisplay} from '../resources/helperFunctions';
import {loadingStyles} from '../resources/inlineStyles';
import {Evolution, Pokemon, Species} from '../resources/interface'
import {EvolutionDisplay} from './EvolutionDisplay';
import InformationAccordion from './InformationAccordion';
import {TypeDisplay} from './TypeDisplay';
import {WeaknessDisplay} from './WeaknessDisplay';

const Loading = require('react-loading-animation')

interface OwnProps {
  pokemon: Pokemon
}

type Props = OwnProps

/**
 * A clickable icon. Currently only supports a variant that looks the same as an icon without any special styling, except when hovering.
 */
const PokemonDetailView: FunctionComponent<Props> = (props) => {
  const [pokemon, setPokemon] = useState<Pokemon | any>()
  const [species, setSpecies] = useState<any>()
  const [types, setTypes] = useState<Array<string>>([])
  const [flavorText, setFlavorText] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [weakness, setWeakness] = useState<Array<string>>([])
  const [evoChain, setEvoChain] = useState<Array<Evolution>>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      try {
        const getPokemonDetails = async () => {
          setLoading(true)
          let pokemonDetail = await fetchPokemonDetails(props.pokemon.id)
          let pokemonSpecies = await fetchPokemonSpecies(props.pokemon.id)
          setPokemon(pokemonDetail)
          setSpecies(pokemonSpecies)
        }
        getPokemonDetails()
      } catch
        (e) {
        setError(e.message)
        alert(error)
      }
    }, [props.pokemon, error]
  )
  useEffect(() => {
    try {
      const pokemonTypes: Array<string> = []
      const getTypeDisplay = async (pokemon: Pokemon) => {
        if (!pokemon) return
        for (let type of pokemon.types) {
          pokemonTypes.push(type.type.name)
        }
      }
      getTypeDisplay(pokemon)
      setTypes(pokemonTypes)
    } catch (e) {
      setError(e.message)
      alert(error)
    }
  }, [pokemon, error])

  useEffect(() => {
    try {
      const getWeaknessDisplay = async (pokemon: Pokemon) => {
        if (!pokemon) return
        let weaknessArray: Array<string> = await fetchPokemonWeakness(pokemon.type_numbers)
        for (let type of pokemon.types) {
          weaknessArray = weaknessArray.filter(e => e !== type.type.name)
        }
        setWeakness(weaknessArray)
        setLoading(false)
      }
      getWeaknessDisplay(pokemon)
    } catch (e) {
      setError(e.message)
      alert(error)
    }
  }, [types, error, pokemon]);

  useEffect(() => {
    const createFlavorText = (array: Array<Species>) => {
      if (!species) return
      for (let text of species.flavor_text_entries) {
        if (text.language.name === 'en') {
          let display = createFlavorTextDisplay(text.flavor_text)
          setFlavorText(display)
          break
        }
      }
    }
    createFlavorText(species)
  }, [species])

  useEffect(() => {
    const getEvolutionChain = async () => {
      if (!species) return
      let evolutionChain = await fetchPokemonEvolutions(species.evolution_chain.url)
      setEvoChain(evolutionChain)
    }
    getEvolutionChain()
  }, [flavorText, species])


  const log = () => {
    if (!evoChain) return
    console.log(evoChain)
  }

  return (
    <div style={{maxWidth: '80vw'}}>
      <button onClick={() => log()}>Log species</button>
      {loading && (<Loading style={loadingStyles}/>)}
      {evoChain &&
      <div>
        <Masonry
          itemSizeFactors={{0: 2, 1: 2, 2: 2}}
          columnWidth={535}
          items={[
            <Panel>
              <div>
                <img src={pokemon.image_display} style={{height: '80%', width: '80%', display: 'block', margin: 'auto'}}
                     alt={pokemon.name_display}/>
               <Panel intent={'positive'}>
                 <H2 style={{textAlign: 'center'}}>#{pokemon.id_display} {pokemon.name_display}</H2>
               </Panel>
              </div>
            </Panel>,
            <Panel>
              <div>
                <Text>Type</Text>
                <TypeDisplay types={types} pokemon={pokemon} weakness={weakness}/>
                <Text>Weaknesses</Text>
                <WeaknessDisplay types={types} pokemon={pokemon} weakness={weakness}/>
              </div>
            </Panel>,
            <Panel>
              <div>
                <Text>{flavorText}</Text>
              </div>
            </Panel>,
            <EvolutionDisplay evolution={evoChain}/>,
            <InformationAccordion pokemon={pokemon}/>,
          ]}
        />
      </div>}
    </div>)
}


export default PokemonDetailView


