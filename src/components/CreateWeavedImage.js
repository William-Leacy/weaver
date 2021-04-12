import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { faGlassMartiniAlt } from "@fortawesome/free-solid-svg-icons";

class CreateWeavedImage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      canvasImage: "",
      imageA: null,
      imageB: null,
      choosenWeavePattern: "patternB",
      imageAPreviewSource: "https://via.placeholder.com/200/4287f5/FFFFFF?Text=ImageA",
      imageBPreviewSource: "https://via.placeholder.com/200/4287f5/FFFFFF?Text=ImageB",
    }
  }

  // Load uploaded files into state for so weaveimages method can access later
  loadImageAFileIntoState = (event) => {
    const ImageAFile = event.target.files[0]
    this.setState({
      imageA: event.target.files[0],
      imageAPreviewSource: URL.createObjectURL(event.target.files[0]),
      [event.target.id] : ImageAFile,
    })
  }

  loadImageBFileIntoState = (event) => {
    const ImageBFile = event.target.files[0]   
    this.setState({
      imageB: event.target.files[0],
      imageBPreviewSource: URL.createObjectURL(event.target.files[0]),
      [event.target.id] : ImageBFile,
    })
  }


  /*
  Author: markE
  Date Last Accessed: April 9, 2021
  Type: (raw)
  source: (https://stackoverflow.com/questions/27065230/how-to-split-up-an-image-in-pieces-and-reshuffle-it-using-html-javascript-or-c)
  */

  // The resource above inspired the algorithm design for weaving images together. 
  weaveImages = () => {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    // creating the image objects
    let uploadedImageA = new Image();
    let uploadedImageB = new Image();

    // check is uploaded images are in state
    // if images are in state user defualt images
    if (this.state.imageA) {
      uploadedImageA.src = window.URL.createObjectURL(this.state.imageA)
    } else {
      uploadedImageA.src = '/images/defaultImageA.png';
    }

    if (this.state.imageB) {
      uploadedImageB.src = window.URL.createObjectURL(this.state.imageB)
    } else {
      uploadedImageB.src = '/images/defaultImageB.png';
    }

    uploadedImageB.onload = () => {
      // Set canvas width and height to ImageA size
      canvas.width = uploadedImageA.width;
      canvas.height = uploadedImageA.height;

      // Amount of vertical and horizontal weaves for weaved canvas
      let totalAmountOfWeavedRows = 40;
      let totalAmountOfWeavedColumns = 40;

      // dived the canvas into a grid that is based on the size of desired weaves 
      // and create an array of grid squares positions for reference when drawing back to new weaved canvas
      const dividedCanvasIntoSquaresTemplateArray = [];
      for (let i = 0; i < totalAmountOfWeavedColumns; i++) {
        for (let j = 0; j < totalAmountOfWeavedRows; j++) {
          dividedCanvasIntoSquaresTemplateArray.push({
            columnIndex: j,
            rowIndex: i,
          });
        }
      }

      //define the size of the squares based of the desired total vertical and horizontal weaves
      let weaveSquareWidth = canvas.width / totalAmountOfWeavedRows;
      let weaveSquareHeight = canvas.height / totalAmountOfWeavedColumns;

      // Get choosen weave pattern from state
      const choosenPattern = this.state.choosenWeavePattern;
      let i = 0; // index iterator for the array template grid

      for (let y = 0; y < totalAmountOfWeavedRows; y++) {
        for (let x = 0; x < totalAmountOfWeavedColumns; x++) {
          let squareFromTemplateArray = dividedCanvasIntoSquaresTemplateArray[i++];
          switch (choosenPattern) {
            case 'patternA':
              // pattern A
              // For every second element in a column draw the imageB to create a strip weave effect
              if (x % 2 === 0) {
                // Fromd the MDN docs a referenece of the parmms for CanvasRenderingContext2D.drawImage() method
                // void ctx.drawImage(image, sourceX, sourceY, sourcexWidth, sourcexHeight, destinationX, destinationxY, destinationxWidth, destinationxHeight);
                ctx.drawImage(uploadedImageB, x * weaveSquareWidth, y * weaveSquareHeight, weaveSquareWidth, weaveSquareHeight, squareFromTemplateArray.columnIndex * weaveSquareWidth, squareFromTemplateArray.rowIndex * weaveSquareHeight, weaveSquareWidth, weaveSquareHeight)
              } else {
                ctx.drawImage(uploadedImageA, x * weaveSquareWidth, y * weaveSquareHeight, weaveSquareWidth, weaveSquareHeight, squareFromTemplateArray.columnIndex * weaveSquareWidth, squareFromTemplateArray.rowIndex * weaveSquareHeight, weaveSquareWidth, weaveSquareHeight)
              }
              break;
            case 'patternB':
              // pattern B
              // For every second element in a column draw the imageB to create a strip weave effect but also for every second row draw imageB which creates a waffle weave effect
              if (x % 2 === 0 && y % 2 === 0) {
                ctx.drawImage(uploadedImageB, x * weaveSquareWidth, y * weaveSquareHeight, weaveSquareWidth, weaveSquareHeight, squareFromTemplateArray.columnIndex * weaveSquareWidth, squareFromTemplateArray.rowIndex * weaveSquareHeight, weaveSquareWidth, weaveSquareHeight)
              } else {
                ctx.drawImage(uploadedImageA, x * weaveSquareWidth, y * weaveSquareHeight, weaveSquareWidth, weaveSquareHeight, squareFromTemplateArray.columnIndex * weaveSquareWidth, squareFromTemplateArray.rowIndex * weaveSquareHeight, weaveSquareWidth, weaveSquareHeight);
              }
              break;
            default:
              break;
          }
        }
      }

    /*
    Author: Matt Netkow 
    Date:  August 27, 2020
    Date Last Access: April 11 2021
    Title: Converting a base64 string to a blob in JavaScript
    Type: (raw)
    publisher: (https://ionicframework.com/blog/converting-a-base64-string-to-a-blob-in-javascript/)
    */

    // Uploading, a rendered canvas to a server, involves several steps
    // Ultimately, the canvas element needs to be a File Object before uploading.
    // To convert a canvas to a file object that is an image, we first need to 
    // convert the canvas element to a base64 string which is a data URL representation 
    // of the canvas element. For the base64 string to become a Blob object, it needs to be decoded and converted 
    // to a URL object. To achieve this  "fake" URL request to the base65 string will auto return it as an URL object.
    // This URL object can then be converted to blob with the .blob() method
    // This blob can then be converted to a file with the new File class
    const convertCanvasToImageFile = async () => {
      let canvasBase64String = canvas.toDataURL()
      var urlReturnObject = await fetch(canvasBase64String);
      const canvasBlob = await urlReturnObject.blob();
      var canvasAsFile = new File([canvasBlob], "weavedImaged.jpeg", {
        type: 'image/jpeg'
      });
      this.setState({
        canvasImage: canvasAsFile
      })
    }
    convertCanvasToImageFile();
  }




  }
  componentDidMount() {    

    axios.post('http://127.0.0.1:8000/weaver-user/', {

      "user_id": "ndfgew",
      "email": "dfg@gmail.com",
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

  setWeaveImagePattern = (patternChoosen) => {
    this.setState({
      choosenWeavePattern: patternChoosen
    })
  }


  uploadWeavedImage = () => {
    let formData = new FormData();
    formData.append('image_source', this.state.canvasImage, this.state.canvasImage.name);
    formData.append('image_name', 'test');
    formData.append('weaved_user', 1);

    axios.post('http://127.0.0.1:8000/gallery/', formData, {
      
      },{
      headers: {
        // 'Authorization': `Bearer ${token}`
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
             
      }})
      .then((response) => {
        console.log(response);

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
        <img src={this.state.imageAPreviewSource} width="60%"/>
          <Input type="file" name="file" id="exampleFile"  onChange={this.loadImageAFileIntoState} />
          <FormText color="muted">
          For best weave effect images should be the same size
          </FormText>
        </FormGroup>
        <h1 className="mb-4">Image B</h1>
        <FormGroup>
        <img src={this.state.imageBPreviewSource} width="60%"/>
          <Input type="file" onChange={this.loadImageBFileIntoState} />
          <FormText color="muted">
          For best weave effect images should be the same size
          </FormText>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="radio" name="radio2" onClick={() => this.setWeaveImagePattern("patternA")} />{' '}
              patternA
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="radio" name="radio2"onClick={() => this.setWeaveImagePattern("patternB")} />{' '}
              patternB
            </Label>
        </FormGroup>
        <Button onClick={this.weaveImages}>Weave Images</Button>
        <Button onClick={this.uploadWeavedImage}>Save</Button>
      </Form>
      <canvas ref="canvas" style={{ width: "100%" }} /> 
      </div>
    </div>
    )
  }
}
export default CreateWeavedImage


