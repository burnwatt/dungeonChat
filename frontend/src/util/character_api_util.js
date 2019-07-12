import axios from 'axios';

//create new character
export const postCharacter = character => (
    axios.post("/api/characters/", character)
);

//get character
export const fetchCharacter = char_id => (
    axios.get(`/api/characters/${char_id}`)
);

//get all characters
export const fetchAllCharacters = () => (
    axios.get('/api/characters/')
);

// Get all campaign characters
export const fetchCampaignCharacters = character_ids => (
    axios.get("/api/characters", character_ids)
);

//update character
export const updateCharacter = char => (
    axios.post(`/api/characters/update/${char.id}`, char)
);