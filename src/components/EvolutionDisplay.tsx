import React from 'react';
import {H6, Icon, Panel} from '@dossier/mithra-ui';
import {createDisplayTypes} from '../resources/helperFunctions';
import {Evolution} from '../resources/interface';

export interface OwnProps {
  evolution: Array<Evolution>
}

type Props = OwnProps

export const EvolutionDisplay = (props: Props) => {
  if (!props.evolution[0].pokemon.name) return <></>
  return (<>
    {props.evolution[0].pokemon.image
    && !props.evolution[1].pokemon.image
    &&
    <Panel>
      <div>
        <H6>Evolutions</H6>
        <img
          src={props.evolution[0].pokemon.image}
          alt={props.evolution[0].pokemon.name}
          style={{maxWidth: '90px'}}
        />
      </div>
    </Panel>}
    {props.evolution[1].pokemon.image
    && !props.evolution[2].pokemon.image
    && <Panel>
      <div>
        <H6>Evolutions</H6>
        <img
          src={props.evolution[0].pokemon.image}
          alt={props.evolution[0].pokemon.name}
          style={{maxWidth: '90px'}}
        />
        <Icon
          icon='ChevronRight'
          size='100px'>
        </Icon>
        <img
          src={props.evolution[1].pokemon.image}
          alt={props.evolution[1].pokemon.name}
          style={{maxWidth: '100px'}}
        />
      </div>
    </Panel>}
    {props.evolution[2].pokemon.image
    &&
    <Panel>
      <div>
        <H6>Evolutions</H6>
        <img
          src={props.evolution[0].pokemon.image}
          alt={props.evolution[0].pokemon.name}
          style={{maxWidth: '90px'}}/>
        <Icon
          icon='ChevronRight'
          size='100px'>
        </Icon>
        <img
          src={props.evolution[1].pokemon.image}
          alt={props.evolution[1].pokemon.name}
          style={{maxWidth: '100px'}}/>
        <Icon
          icon='ChevronRight'
          size='100px'>
        </Icon>
        <img
          src={props.evolution[2].pokemon.image}
          alt={props.evolution[2].pokemon.name}
          style={{maxWidth: '110px'}}/>
      </div>
    </Panel>}
  </>)
}



