import "./App.css";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import React from "react";
import Navigation from "./Components/Navigation/Navigation.js";
import ImageLinkForms from "./Components/ImageLinkForms/ImageLinkForms.js";
import Rank from "./Components/Rank/Rank.js";
import Register from "./Components/Register/Register.js";
import SignIn from "./Components/SignIn/SignIn.js";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.js";

//my api key = 7cec6329d24c44ae8bc7877776a70581
const app = new Clarifai.App({
  apiKey: "7cec6329d24c44ae8bc7877776a70581",
});
const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 500,
      },
    },
    opacity: 1,
    size: {
      value: 1,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
    },
  },
};
const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    // password: "",
    entries: 0,
    joned: "",
  },
};
class App extends React.Component {
  //CONSTRUCTOR
  constructor() {
    super();
    this.state = initialState;
  }

  //FUNCTIONS and EVENTS

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        // password: data.password,
        entries: data.entries,
        joned: data.joined,
      },
    });
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("pic");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
      h: height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };
  //predict('c0c0ac362b03416da06ab3fa36fb58e3',this.state.input)
  // 7cec6329d24c44ae8bc7877776a70581
  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if (response) {
          fetch("http://localhost:4000/image", {
            method: "put",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log());
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err, "Clarifai not working"));
  };
  //ROUTE
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  //RENDER
  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <div>
          <Navigation
            isSignedIn={isSignedIn} // this.state.isSignedIn
            onRouteChange={this.onRouteChange}
          />
          {route === "home" ? (
            <div>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForms
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageURL={imageURL} />
            </div>
          ) : route === "signin" ? (
            <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
