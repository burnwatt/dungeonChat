import axios from "axios";

// GETS ------------------------------------
export const getMessages = () => (
  axios.get("/api/messages")
);

export const getCampaignMessages = campaign_id => {
  return axios.get(`/api/messages/campaign/${campaign_id}`)
}


// UPDATE ------------------------------------
export const updateMessage = message => (
  axios.post("/api/messages/update", message)
)

// DELETE ----------------------------------------
export const deleteMessage = message_id => (
  axios.post("/api/messages/delete", message_id)
);