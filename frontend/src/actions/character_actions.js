import {
  fetchAllCharacters,
  fetchCharacter,
  postCharacter,

} from "../util/character_api_util";

export const RECEIVE_ALL_CHARACTERS = "RECEIVE_ALL_CHARACTERS";
export const RECEIVE_CHARACTER = "RECEIVE_CHARACTER";

export const getAllCharacters = () => {
  return dispatch => {
    fetchAllCharacters().then(characters => dispatch({type: RECEIVE_ALL_CHARACTERS, characters}))
  }
}

export const getCharacter = () => {
  return dispatch => {
    fetchCharacter().then(character => dispatch({type: RECEIVE_CHARACTER, character}))
  }
}

export const changeCharacter = (id) => {
  return dispatch => {
    updateCharacter(id).then(payload => dispatch({type: RECEIVE_CHARACTER, character: payload.character}))
  }
}

export const createCharacter = (character) => {
  return dispatch => {
    postCharacter(character).then(payload => dispatch({type: RECEIVE_CHARACTER, character: payload.character}))
  }
}