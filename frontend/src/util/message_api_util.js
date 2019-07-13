import axios from "axios";

// GETS ------------------------------------
export const getMessages = () => (
  axios.get("/api/messages")
);
export const getUserMessages = message_ids => (
  axios.get(`/api/messages/user/messages`, message_ids)
);
export const getCampaignMessages = message_ids => (
  axios.get(`/api/messages/campaign/messages`, message_ids)
);
export const getCharacterMessages = message_ids => (
  axios.get(`/api/messages/character/messages`, message_ids)
);

// UPDATE ------------------------------------
export const updateMessage = message => (
  axios.post("/api/messages/update", message)
)

// DELETE ----------------------------------------
export const deleteMessage = message_id => (
  axios.post("/api/messages/delete", message_id)
);