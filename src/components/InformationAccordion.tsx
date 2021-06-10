import {
  AccordionCardButton,
  Stack,
  Accordion,
  AccordionContent,
  Card,
  H6
} from '@dossier/mithra-ui';
import React, {useState} from 'react';
import { displayName } from '../resources/helperFunctions';
import {Pokemon} from '../resources/interface';

interface OwnProps {
  pokemon: Pokemon
}

type Props = OwnProps;


const InformationAccordion = (props: Props) => {
  const [expandedCard, setExpandedCard] = useState<string[]>(["0"]);
  const [pokemon, setPokemon] = useState<Pokemon>(props.pokemon)
  
  return (
    <>
      <Accordion
        expanded={expandedCard}
        setExpanded={setExpandedCard}
        style={{maxWidth: "535px"}}
      >
        <AccordionCardButton
          accentColor={5}
          id={"1"}
          headerText={pokemon.name_display}
          text="Stats"
        />
        <AccordionContent id={"1"} className={"AccordionContent1"}>
          <Stack flexDirection="column" alignItems="stretch">
            {pokemon.stats.map((pokemon :any, index: any) =>
              (<Card key={index}>
                <Stack spacing="none">
                  <div
                    style={{
                      flexGrow: 1
                    }}
                  >
                    <H6>{displayName(pokemon.stat.name)}: {pokemon.base_stat}</H6>
                  </div>
                </Stack>
              </Card>))}
          </Stack>
        </AccordionContent>
      </Accordion>
      </>
  )
}

export default InformationAccordion