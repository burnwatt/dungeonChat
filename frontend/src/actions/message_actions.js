import {
  getMessages,
  getUserMessages,
  getCampaignMessages,
  updateMessage,
  deleteMessage
} from "../util/message_api_util";

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";


const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages: messages
});

const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message: message
});

const receiveMessageErrors = errors => ({
  type: RECEIVE_MESSAGE_ERRORS,
  errors: errors
});

const delMessage = messageId => ({
  type: DELETE_MESSAGE,
  messageId: messageId
})


export const fetchMessages = () => dispatch => getMessages()
  .then(messages => dispatch(receiveMessages(messages)))
  .catch(err => dispatch(receiveMessageErrors(err)));

export const fetchCampaignMessages = messageIds => dispatch => getCampaignMessages(messageIds)
  .then(messages => dispatch(receiveMessages(messages)))
  .catch(err => dispatch(receiveMessageErrors(err)));

export const changeMessage = message => dispatch => updateMessage(message)
  .then(message => dispatch(receiveMessage(message)))
  .catch(err => dispatch(receiveMessageErrors(err)));

export const removeMessage = messageId => dispatch => deleteMessage(messageId)
  .then(() => dispatch(delMessage(messageId)))
  .catch(err => dispatch(receiveMessageErrors(err)));