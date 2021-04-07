import React from "react";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Gallery = () => (
  <div className="text-center hero my-5">
    <h1 className="mb-4">My Gallery</h1>
    <div>
      <Card>
        <CardImg top width="100%" src="" alt="weaved image" />
        <CardBody>
          <CardTitle tag="h5">Image title</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">01/02/2021 </CardSubtitle>
          <CardText>images weaved together</CardText>
          <Button>Download</Button>
          <Button>Share</Button>
        </CardBody>
      </Card>
    </div>
  </div>
);

export default Gallery;


