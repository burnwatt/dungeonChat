import {
  fetchAllCharacters,
  fetchCharacter,
  postCharacter,
  updateCharacter,
  fetchCampaignCharacters
} from "../util/character_api_util";

export const RECEIVE_ALL_CHARACTERS = "RECEIVE_ALL_CHARACTERS";
export const RECEIVE_UPDATED_CHARACTER = "RECEIVE_UPDATED_CHARACTER";
export const RECEIVE_NEW_CHARACTER = "RECEIVE_NEW_CHARACTER";
export const RECEIVE_CHARACTER = "RECEIVE_CHARACTER";

export const getAllCharacters = () => {
  return dispatch => {
    return fetchAllCharacters().then(characters => dispatch({type: RECEIVE_ALL_CHARACTERS, characters}))
  }
}

export const getCharacter = (id) => {
  return dispatch => {
    return fetchCharacter(id).then(character => dispatch({type: RECEIVE_CHARACTER, character}))
  }
}

export const changeCharacter = (character) => {
  return dispatch => {
    return updateCharacter(character).then(payload => dispatch({type: RECEIVE_UPDATED_CHARACTER, character: payload}))
  }
}

export const createCharacter = (character) => {
  // debugger
  return dispatch => {
    return postCharacter(character).then(payload => {
      dispatch({type: RECEIVE_NEW_CHARACTER, character: payload})
      return payload
    })
  }
}


export const getCampaignCharacters = (campaign_id) => {
  return dispatch => {
    return fetchCampaignCharacters(campaign_id).then(characters => dispatch({ type: RECEIVE_ALL_CHARACTERS, characters: characters }))
  }
}