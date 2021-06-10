import { Type} from './interface'

/**
 * Takes  a type and converts it into the type number used in the fetch
 */

export const typeNumber = (array: Array<Type>) => {
  let types = []
  for(let obj of array) {
    types.push(obj.type.url.split('/')[6])
  }
  return types
}

/**
 * Takes a number and converts it into the 00 + num - display version
 */

export const displayNumber = (number: number) => {
  return ('000' + number).substr(-3)
}

/**
 * Makes the first letter uppercase
 */

export const displayName = (name: string) => {
  let lowerCase = name.toLowerCase()
  return lowerCase[0].toUpperCase() + name.substr(1)
}


/**
 * Filters out that stupid POKéMON stuff
 */
export const createFlavorTextDisplay = (flavorText : string) => {
  let stringArray = flavorText.split(' ')
  stringArray = stringArray.map(x => x.replace(/POKéMON/g,"pokémon"));
  return stringArray.join(' ')
}

export const createDisplayTypes = (input: Array<string>) => {
  let types: Array<string> = []
  for (let e of input) {
    switch (e) {
      case 'bug':
        types.push('https://i.postimg.cc/sXzQTyY3/bug.png')
        break
      case 'dark':
        types.push('https://i.postimg.cc/bJqrQgPJ/dark.png')
        break
      case 'dragon':
        types.push('https://i.postimg.cc/tg37ZfLw/dragon.png')
        break
      case 'electric':
        types.push('https://i.postimg.cc/YCmvkj8p/electric.png')
        break
      case 'fairy':
        types.push('https://i.postimg.cc/0QZQZS5C/fairy.png')
        break
      case 'fighting':
        types.push('https://i.postimg.cc/pLgnnKyh/fighting.png')
        break
      case 'fire':
        types.push('https://i.postimg.cc/BbYjZKdv/fire.png')
        break
      case 'flying':
        types.push('https://i.postimg.cc/43VHvnh8/flying.png')
        break
      case 'ghost':
        types.push('https://i.postimg.cc/fyT3hKqF/ghost.png')
        break
      case 'grass':
        types.push('https://i.postimg.cc/CL2RWbGP/grass.png')
        break
      case 'ground':
        types.push('https://i.postimg.cc/SNx80yws/ground.png')
        break
      case 'ice':
        types.push('https://i.postimg.cc/bvcsv8F1/ice.png')
        break
      case 'normal':
        types.push('https://i.postimg.cc/CMND6ZrX/normal.png')
        break
      case 'poison':
        types.push('https://i.postimg.cc/bwGtJmYf/poison.png')
        break
      case 'psychic':
        types.push('https://i.postimg.cc/y6vgyMkz/psychic.png')
        break
      case 'rock':
        types.push('https://i.postimg.cc/HsvMdqgt/rock.png')
        break
      case 'steel':
        types.push('https://i.postimg.cc/RFT388dK/steel.png')
        break
      case 'water':
        types.push('https://i.postimg.cc/28yqc0ZL/water.png')
        break
    }
  }
  return types
}

// export const introMessage = () => {
//   console.log("%cGotta Catch 'Em All!","color: blue; font-size: 20px");
//   console.log('%c────────▄███████████▄────────', 'color: red')
//   console.log('%c─────▄███▓▓▓▓▓▓▓▓▓▓▓███▄─────', 'color: red')
//   console.log('%c────███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███────', 'color: red')
//   console.log('%c───██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██───', 'color: red')
//   console.log('%c──██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██──', 'color: red')
//   console.log('%c─██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██─', 'color: red')
//   console.log('%c██▓▓▓▓▓▓▓▓▓███████▓▓▓▓▓▓▓▓▓██', 'color: red')
//   console.log('%c██▓▓▓▓▓▓▓▓██░░░░░██▓▓▓▓▓▓▓▓██', 'color: red')
//   console.log('%c██▓▓▓▓▓▓▓██░░███░░██▓▓▓▓▓▓▓██', 'color: red')
//   console.log('%c███████████░░███░░███████████', 'color: red')
//   console.log('%c██░░░░░░░██░░███░░██░░░░░░░██', 'color: red')
//   console.log('%c██░░░░░░░░██░░░░░██░░░░░░░░██', 'color: red')
//   console.log('%c██░░░░░░░░░███████░░░░░░░░░██', 'color: red')
//   console.log('%c─██░░░░░░░░░░░░░░░░░░░░░░░██─', 'color: red')
//   console.log('%c──██░░░░░░░░░░░░░░░░░░░░░██──', 'color: red')
//   console.log('%c───██░░░░░░░░░░░░░░░░░░░██───', 'color: red')
//   console.log('%c────███░░░░░░░░░░░░░░░███────', 'color: red')
//   console.log('%c─────▀███░░░░░░░░░░░███▀─────', 'color: red')
//   console.log('%c────────▀███████████▀────────', 'color: red')
// }
