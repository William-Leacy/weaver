import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

class CreateWeavedImage extends React.Component {

  componentDidMount() {
    
    axios.post('http://127.0.0.1:8000/weaver-user/', {

      "user_id": "new",
      "email": "test@gmail.com",
      "weaved_images": []
    },{
      headers: {
        // 'Authorization': `Bearer ${token}` 
      }})
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
    return(
      <div className="text-center hero my-5">
      <h1 className="mb-4">Weave images</h1>
      <div>
      <Form>
      <h1 className="mb-4">Image A</h1>
        <FormGroup>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
          For best weave effect images should be the same size
          </FormText>
        </FormGroup>
        <h1 className="mb-4">Image B</h1>
        <FormGroup>
          <Input type="file" onChange={this.fileChangedHandler} 
          ref={fileInput => this.fileInput = fileInput} />
          <FormText color="muted">
          For best weave effect images should be the same size
          </FormText>
        </FormGroup>
        <Button onClick={this.weaveImages}>Weave Images</Button>
        <Button onClick={() => this.fileInput.click()}>Pick File</Button>
        <Button onClick={this.fileUploadHandler}>Upload</Button>
        <Button onClick={this.fileUploadHandler}>Save</Button>
      </Form>
      </div>
    </div>
    )
  }
}
export default CreateWeavedImage


