import React from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "8a01c5a0366e47429a9fc3f06d02f60f"
});

class App extends React.Component {
  state = {
    input: "",
    imgUrl: "",
    box: {}
  };

  calculateFaceLocation = data => {
    const clafiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clafiFace.left_col * width,
      topRow: clafiFace.top_row * height,
      rightCol: width - clafiFace.right_col * width,
      bottomRow: height - clafiFace.bottom_row * height
    };
  };

  displayBox = box => {
    this.setState({ box: box });
  };

  handleInputChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = () => {
    this.setState({ imgUrl: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.displayBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  render() {
    const { box, imgUrl } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
        <FaceRecognition box={box} imageUrl={imgUrl} />
      </div>
    );
  }
}

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

export default App;
