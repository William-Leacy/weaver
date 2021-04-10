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
                console.log(this.state.events[index].image_name)
                return (
              <Card key={index} >
                <CardImg top width="100%" src={this.state.events[index].image_source} alt="weaved image" />
                <CardBody>
                  <CardTitle tag="h5">{this.state.events[index].image_name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{this.state.events[index].image_creation_time}</CardSubtitle>
                  <Button>Download</Button>
                  <Button>Share</Button>
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


