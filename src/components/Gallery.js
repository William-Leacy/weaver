import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import axios from 'axios';

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  /*
  Author: Sapan Bodiwala 
  Date Last Accessed: April 12, 2021
  tilte: Download Images using JavaScript
  Type: (raw)
  source: (https://dev.to/sbodi10/download-images-using-javascript-51a9)
  */

  // https://dev.to/sbodi10/download-images-using-javascript-51a9
  // The resource above inspired the algorithm design for weaving images together. 
  // very similar tot CreateWeavedImage convert canvas to file method
  // This arrow function runs a fetch on the weaved image src url
  // this fetch retunr a data url in memory which can be converted to a blod
  // using html DOM the blod, when converted to url object can be downloed with .download html method 
   downloadWeavedImage = async (weavedImageSourceUrl) => {
    const image = await fetch(weavedImageSourceUrl)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'weaved image'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

componentDidMount() {
  axios.get('http://127.0.0.1:8000/gallery/', {})
    .then((response) => {
      console.log(response);
      this.setState({
        events: response.data,
        dataFound: true
      })
    })
    .catch((error) => {
      console.log(error);
    });

}

render() {
  if(this.state.dataFound === true) {
    return (
        <div>
        <h1 className="mb-4">My Gallery</h1>
              { 
              this.state.events.map((weavedImage, index) => {
                return (
              <Card key={index} >
                <CardImg top width="100%" src={this.state.events[index].image_source.split('?')[0]} alt="weaved image" download="AwesomeImage.png" />
                <CardBody>
                  <CardTitle tag="h5">{this.state.events[index].image_name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{this.state.events[index].image_creation_time}</CardSubtitle>
                  <Button onClick={() => this.downloadWeavedImage(this.state.events[index].image_source.split('?')[0])} >Download</Button>
                </CardBody>
              </Card>
                )
              })
            }
        </div>
      )
  } else {
    return (
      <main>
        <div>
        <h1 className="mb-4">My Gallery</h1>
        </div>
      </main>
      )
  }
  
}

}
export default Gallery


