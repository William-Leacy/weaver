import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import WeavedImage from "../components/WeavedImage";

const CreateWeavedImage = () => (
  
  <div className="text-center hero my-5">
    <h1 className="mb-4">Weave images</h1>
    <div>
    <Form>
    <h1 className="mb-4">Image A</h1>
      <FormGroup>
        <Label for="exampleEmail">Paste image url</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Image URL" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" />
        <FormText color="muted">
         Images are cropped when uploading
        </FormText>
      </FormGroup>
      <h1 className="mb-4">Image B</h1>
      <FormGroup>
        <Label for="exampleEmail">Paste image url</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Image URL" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" />
        <FormText color="muted">
        Images are cropped when uploading
        </FormText>
      </FormGroup>
      <Button>Weave Images</Button>
      <WeavedImage />
    </Form>
    Canvas
    </div>
  </div>
);

export default CreateWeavedImage;


