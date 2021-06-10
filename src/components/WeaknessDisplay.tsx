import React from 'react';
import {createDisplayTypes} from '../resources/helperFunctions';
import {Types} from '../resources/interface';


type Props = Types;

export const WeaknessDisplay = (props: Props) => {
  const weaknessIcons: Array<string> = createDisplayTypes(props.weakness)
  return (
    <>
      {weaknessIcons.map((type: string) => (
        <img src={type} style={{height: '15%', width: '15%'}} alt={type} key={type}/>
      ))}
    </>
  )
}


