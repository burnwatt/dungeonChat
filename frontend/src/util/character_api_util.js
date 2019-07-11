import axios from 'axios';

//create new character
export const postCharacter = char => (
    axios.post("/api/characters/", char)
);

//get character
export const fetchCharacter = char_id => (
    axios.get(`/api/characters/${char_id}`)
);

//get all characters
export const fetchCharacters = chars => (
    axios.get('/api/characters/')
);

export const updateCharacter = char => (
    axios.post(`/api/characters/${char.id}`)
);