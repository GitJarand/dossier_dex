import React, {useState} from 'react';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import PokemonDisplay from "./components/PokemonDisplay";
import 'semantic-ui-css/semantic.min.css'
import "./fonts/style.css"
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import {
  ApplicationLayout,
  MithraProvider,
  NavbarButton,
  NavbarSection,
  PageHeaderButton,
  Tray,
  TrayHeader,
  Text,
  SearchInput
} from '@dossier/mithra-ui'
// library.add(faCheckSquare, faCoffee)

const App: React.FC = () => {

  const [showTray, setShowTray] = useState<null | "Search">(null)
  const [headerText, setHeaderText] =
    useState<'Pokédex' | 'Kanto' | 'Johto' | 'Hoenn' | 'Sinnoh' | 'Unova' | 'Kalos' | 'Alola' | 'Galar'>("Pokédex")
  const [searchQuery, setSearchQuery] = useState('')

  // @ts-ignore
  function RouteWithRouteProps({ component: PokemonDisplay, ...rest }) {
    return (
      <Route
        {...rest}
        render={routeProps => (
            <PokemonDisplay {...routeProps} search={searchQuery}/>
        )}
      />
    );
  }

  return (
    <main className="container ds-typography-body">
      <MithraProvider>
        <BrowserRouter>
          <ApplicationLayout
            headerText={headerText}
            pageType={"admin"}
            isMainPage={true}
            hideNavbar={false}
            navbarSections={
              <>
                <NavbarSection>
                  <NavbarButton
                    as={NavLink}
                    to="/Kanto"
                    icon={"Twitter"}
                    text={"Kanto"}
                    onClick={() => setHeaderText("Kanto")}
                  />
                  <NavbarButton
                    as={NavLink}
                    to="/Johto"
                    icon={"Twitter"}
                    text={"Johto"}
                    onClick={() => setHeaderText("Johto")}
                  />
                  <NavbarButton
                    as={NavLink}
                    to="/Hoenn"
                    icon={"Twitter"}
                    text={"Hoenn"}
                    onClick={() => setHeaderText("Hoenn")}
                  />
                  <NavbarButton
                    as={NavLink}
                    to="/Sinnoh"
                    icon={"Twitter"}
                    text={"Sinnoh"}
                    onClick={() => setHeaderText("Sinnoh")}
                  />
                  <NavbarButton
                    as={NavLink}
                    to="/Unova"
                    icon={"Twitter"}
                    text={"Unova"}
                    onClick={() => setHeaderText("Unova")}
                  />
                  <NavbarButton
                    as={NavLink}
                    to="/Kalos"
                    icon={"Twitter"}
                    text={"Kalos"}
                    onClick={() => setHeaderText("Kalos")}
                  />
                  <NavbarButton
                    as={NavLink}
                    to="/Alola"
                    icon={"Twitter"}
                    text={"Alola"}
                    onClick={() => setHeaderText("Alola")}
                  />
                  <NavbarButton
                    as={NavLink}
                    to="/Galar"
                    icon={"Twitter"}
                    text={"Galar"}
                    onClick={() => setHeaderText("Galar")}
                  />
                </NavbarSection>
              </>
            }
            headerButtons={
              <>
                <PageHeaderButton
                  text="Search"
                  icon="Search"
                  onClick={() => setShowTray('Search')}
                />
              </>
            }
            tray={
              showTray && (
                <Tray
                  key={showTray}
                  width="632px"
                  onClose={() => setShowTray(null)}
                  closeButtonProps={{
                    title: "Close",
                  }}
                >
                  <TrayHeader>{showTray} all Pokémon</TrayHeader>
                  <SearchInput
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeSearch={setSearchQuery}
                    status={undefined}
                  />
                </Tray>
              )
            }>

            <Switch>
              <RouteWithRouteProps exact path="/" component={PokemonDisplay}/>
              <RouteWithRouteProps exact path="/Kanto" component={PokemonDisplay}/>
              <RouteWithRouteProps exact path="/Johto" component={PokemonDisplay}/>
              <RouteWithRouteProps exact path="/Hoenn" component={PokemonDisplay}/>
              <RouteWithRouteProps exact path="/Sinnoh" component={PokemonDisplay}/>
              <RouteWithRouteProps exact path="/Unova" component={PokemonDisplay}/>
              <RouteWithRouteProps exact path="/Kalos" component={PokemonDisplay}/>
              <RouteWithRouteProps exact path="/Alola" component={PokemonDisplay}/>
              <RouteWithRouteProps exact path="/Galar" component={PokemonDisplay}/>
            </Switch>
          </ApplicationLayout>
        </BrowserRouter>
      </MithraProvider>
    </main>
  );
}

export default App;
