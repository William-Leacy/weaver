# weaver

## Description
- Weaver is an image editor web application where users can sign up and weave images together. 
- Weaving images creates a woven or loom effect on the final merged image.
- The images can be saved to the user's profile and shared on social media.

## MVP - minimum viable product
- A git repository (or repositories) hosted on Github, 
- Use of new technology AWS, Docker, Django,

## Stretch Goals
- Extra weave patterns
- Export image in different formats
- Use of The Metropolitan Museum of Art of New York City API for random examples

## Future Work
- Using social meida API to post the weaved image to a user social meida account 
- Build a canvas library for weaving images and port as a npm package
- Intorduce scalling with Kubernetes
- Security revision for production
- User validation
- Use of The Metropolitan Museum of Art of New York City API 

## Table of Contents
- [Description](#Description)
- [Links](#Links)
- [Install](#Install)
- [Features](#Features)
- [Built With](#Built-With])
- [Code organization](#Code-organization)
- [Design pattern used](#Design-pattern-used)
- [References](#Tests)
- [Tests](#Tests)
- [Design Documentation](#Design-Documentation)
    - [User Stories](#User-Stories)
    - [User Case](#User-Case)
- [Authors](#Author)
- [License](#License)

## Install
- To install this project you must setup enviroment vriables for a database and S3 bucket on the django api side  
- create and auth0 account
- use the docker files to build images and deoploy

## Features 

## Built With
- AWS EC2 Linux 
- AWS S3 Bucket
- AWS RDMS Postgres
- AWS Command Line Interface
- Docker Compose & Docker Engine
- Django with Django REST framework 
- React for Frontend
- auth0 for user authentication
- CSS: React-Bootstrap


## Code organization
The project trys to follow the coding style guide provied by [AirBnb](https://github.com/airbnb/javascript).

## Design pattern and System design approach

- Architecture diagram
- http://williamleacy.dev/profile/wp-content/uploads/2021/04/Screen-Shot-2021-04-13-at-3.16.20-AM.png

- The goal of this project was to learn about deoplying and scalling a project. I decided to try out Amazon Web Services 
and sign up for a Free teir access. 
### Basic Setup
- I Started up a EC2 instance, S3 bucket and a RDMS with Postgress.
- Used the AWS Command Line Interface to install teh docker engine and docker compsose to the EC2 instance
- Locally I install docker engine and setup boiler plate React frontend container and Django API container
- Setup auth0 by intergrating the The boilier plate source code for react project and django project
### Authentication
- The authentication design pattern choosen for this project is authentication through the client side with the react frontend
- container. It autheticates with my admin account on auth0 servers and then send back a json web token. This token can then
- be in REST routes when commincating with the django api. Django is setup to jsut secure its end points. It doesnt store users,
- It checks from auth0 if the user was authenticated with the react frontend
### Weaving Images with canvas
- The design solution for weaving images with canvas is to create a template array that represents grid with x and y coordinates
- A size for a square is decided based off the amount of divsion of the image horizontal and vertical weaved strips
- Two images are uploaded by the user nad a forloop chooses between which image to render to the new canvas based of contional that 
- minics a weave pattern once fully drawed to the canvas
- Uploading the weaved image to AWS S3 and AWS RDMS
- To convert a canvas element into a image file a converting porcess is needed to be followed
- The conversion proccess works by :
- 1 convert the canvas element to a data url
- 2 convert the data url to a blob
- 3 convert the blob to a image file type

## References

    Create your first S3 bucket
    https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html

    Get started with Amazon EC2 Linux instances
    https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html

    AWS Command Line Interface
    https://aws.amazon.com/cli/

    Creating a PostgreSQL DB instance and connecting to a database on a PostgreSQL DB instance
    https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html

    Install Docker Engine on Ubuntu
    https://docs.docker.com/engine/install/ubuntu/

    Overview of Docker Compose
    https://docs.docker.com/compose/

    Canvas API
    https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

    Blob
    https://developer.mozilla.org/en-US/docs/Web/API/Blob

    django
    How to install Django¶
    https://docs.djangoproject.com/en/3.1/topics/install/

    Django REST framework
    https://www.django-rest-framework.org/

    references from source code 

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

    /*
    Author: markE
    Date Last Accessed: April 9, 2021
    Type: (raw)
    source: (https://stackoverflow.com/questions/27065230/how-to-split-up-an-image-in-pieces-and-reshuffle-it-using-html-javascript-or-c)
    */

    // The resource above inspired the algorithm design for weaving images together. 

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

## Tests

## Design Documentation
## Wireframe 
- https://s3.amazonaws.com/assets.mockflow.com/app/wireframepro/company/C1a961449178e47ff816e0be848bd5511/projects/M03a105ec07290c73b9a227ed4d9d15601607716310915/pages/88604c316b314a9fb3a24513d1fb12a9/image/88604c316b314a9fb3a24513d1fb12a9.png?1617203619140

### User Stories

- "As a weaver user, I want to login to my account and see my past weaved images."
- "As a weaver user, I want to upload my own images for weaving."
- "As a weaver user, I want to weave two images together."
- "As a weaver user, I want to choose different weave styles for my images."
- "As a weaver user, I want to save my created images to my account."
- "As a weaver user, I want to share my images to social media."
- "As a weaver user, I want to download my created images."
- "As a weaver user, I want to see examples of weaved images for inspiration."

## Authors
William Leacy (Current Author).
## License

