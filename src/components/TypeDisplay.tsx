import React from 'react';
import {createDisplayTypes} from '../resources/helperFunctions';
import {Types} from '../resources/interface';


type Props = Types;

export const TypeDisplay = (props: Props) => {
  const typeIcons = createDisplayTypes(props.types)
  return (
    <>
      {typeIcons.map((type: string) => (
        <img src={type} style={{height: '15%', width: '15%'}} alt={type} key={type}/>
      ))}
    </>
  )
}



