import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <h1 className="mb-4">Welcome to weaver</h1>

    <p className="lead">
      Weaver is an image editor web application for weaving images together
    </p>
    <i class="far fa-images"></i>
    <FontAwesomeIcon icon={["fal", "coffee"]} />
    <FontAwesomeIcon icon="user" className="mr-3" /> Profile
    <FontAwesomeIcon icon={['fas', 'code']} />  test 
    <FontAwesomeIcon icon={['fas', 'image']} />  test  
   
    

  </div>
);

export default Hero;
