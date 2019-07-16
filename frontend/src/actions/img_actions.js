import axios from "axios";

const arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

export const RECEIVE_IMAGE = "RECEIVE_IMAGE"

//API'S
const fetchImage = (id) => {
  return axios.get(`/api/imgs/img_data/${id}`)
}

const postImage = (payload, type) => {
  // debugger
  // console.log(payload);
  return axios.post(`/api/imgs/${type}`, {
    headers: {
    'Content-Type': 'multipart/form-data',
  },
  params: {
    "picture": payload
  }
  })
}




//ACTIONS
export const fetchImg = (id) => {
  return dispatch => {
    return fetchImage(id).then(img => {
      dispatch({type: RECEIVE_IMAGE, img})
      return img.data.img.data;
    })
}}

export const postImg = (payload, type) => {
  return dispatch => {
    return postImage(payload, type).then(img => dispatch({type: RECEIVE_IMAGE, img}))
  }
}


