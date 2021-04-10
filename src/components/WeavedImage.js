import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Canvas extends React.Component {
  
  render() {
    return(
      <div className="text-center hero my-5">
      <h1 className="mb-4">Weave images</h1>
      <div>
      <Form>
      <h1 className="mb-4">Image A</h1>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
           Images are cropped when uploading
          </FormText>
        </FormGroup>
        <h1 className="mb-4">Image B</h1>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" onChange={this.fileChangedHandler} 
          ref={fileInput => this.fileInput = fileInput} />
          <FormText color="muted">
          Images are cropped when uploading
          </FormText>
        </FormGroup>
        <Button onClick={this.weaveImages}>Weave Images</Button>
        <Button onClick={() => this.fileInput.click()}>Pick File</Button>
        <Button onClick={this.fileUploadHandler}>Upload</Button>
      </Form>
      </div>
    </div>
    )
  }
}
export default Canvas


// class CreateWeavedImage extends React.Component {
  
//   render() {
//     return(
//       <div className="text-center hero my-5">
//       <h1 className="mb-4">Weave images</h1>
//       <div>
//       <Form>
//       <h1 className="mb-4">Image A</h1>
//         <FormGroup>
//           <Label for="exampleFile">File</Label>
//           <Input type="file" name="file" id="exampleFile" />
//           <FormText color="muted">
//            Images are cropped when uploading
//           </FormText>
//         </FormGroup>
//         <h1 className="mb-4">Image B</h1>
//         <FormGroup>
//           <Label for="exampleFile">File</Label>
//           <Input type="file" onChange={this.fileChangedHandler} 
//           ref={fileInput => this.fileInput = fileInput} />
//           <FormText color="muted">
//           Images are cropped when uploading
//           </FormText>
//         </FormGroup>
//         <Button onClick={this.weaveImages}>Weave Images</Button>
//         <Button onClick={() => this.fileInput.click()}>Pick File</Button>
//         <Button onClick={this.fileUploadHandler}>Upload</Button>
//       </Form>
//       </div>
//     </div>
//     )
//   }
// }
// export default CreateWeavedImage
