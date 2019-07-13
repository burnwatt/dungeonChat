import axios from "axios";

const arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

export const RECEIVE_IMAGE = "RECEIVE_IMAGE"

const fetchImage = (id) => {
  return axios.get(`/api/imgs/img_data/${id}`)
}

const postImage = (img) => {
  return axios.post('/api/imgs/img_data', img)
}

export const fetchImg = (id) => {
  return dispatch => {
    return fetchImage(id).then(img => dispatch({type: RECEIVE_IMAGE, img}))
    .then((res) => res.json())
    .then((data) => {
      var base64Flag = 'data:image/jpeg;base64,';
      var imageStr = arrayBufferToBase64(data.img.data.data);
      return base64Flag + imageStr;
    })

}}

export const postImg = (img) => {
  return dispatch => {
    return postImage(img).then(img => dispatch({type: RECEIVE_IMAGE, img}))
      .then((res) => res.json())
      .then((data) => {
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = arrayBufferToBase64(data.img.data.data);
        return base64Flag + imageStr;
      })
  }
}

  // fetch('http://yourserver.com/api/img_data')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     var base64Flag = 'data:image/jpeg;base64,';
  //     var imageStr =
  //       this.arrayBufferToBase64(data.img.data.data);
  //     this.setState({
  //       img: base64Flag + imageStr
  //           )
  //   }
  //       })
  //   }