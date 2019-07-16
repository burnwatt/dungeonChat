import React from 'react';
import { timingSafeEqual } from 'crypto';

class Imgs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {img: ""}
  }
  componentDidMount(){
    this.props.fetchImg(this.props.match.params.id)
      .then(() => {

        var base64Flag = 'data:image/png;base64,';
        var imageStr = this.arrayBufferToBase64(this.props.img[1]);
        
        this.setState({
          img: base64Flag + imageStr
        })
      })
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  componentDidUpdate(prevProps){
    // if (this.state.img === ""){
    //   this.setState({img: this.props.img})
    // }
  }

  handleGetImage(e){
    e.preventDefault()
    this.props.fetchImg(this.props.match.params.id);
    // this.setState({render: true})
  }

  render(){
    // debugger
    let image = "#";
    if (this.state.img) {
      image = this.state.img;
    }
    return(
      <div>
        <form className="upload-img" action="/api/imgs/img_data" method="POST" encType="multipart/form-data">
        <input type="file" name="picture" accept="application/x-zip-compressed,image/*"></input>
        {/* <input className="form-control" type="text" name="description" placeholder="Description or Message"/> */}
        <input className="btn btn-primary" type="submit" value="submit"/>
        </form>
        <div>
          <button onClick={this.handleGetImage.bind(this)}>getImg</button>
          <img
            src={image}
            alt='whatever' />
        </div>
      </div>
      
    )
  }
}

export default Imgs;