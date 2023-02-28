import "./App.css";
import React from "react";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm.js/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: "",
        joined: "",
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then(console.log);
  }

  loadUser = (data) => {
    console.log("IMPIMPIMPIMPIP!!!!!!!!!!!!!!!!!!!!!!!!", data);
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calclateFaceLocation = (data) => {
    console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height, "w and h");
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState({ isSignedIn: false });
    } else if (route === "inside") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch("localhost:3001/detectface", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: this.state.input }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(
          this.state.user,
          "this is the user id before the increment of user entry fetch"
        );
        fetch(`http://localhost:3001/image`, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: this.state.user.id }),
        })
          .then((res) => res.json())
          .then((count) => {
            console.log("fksdhfkshf hskj fjk sdfhks hfshddjks", count);
            this.setState(Object.assign(this.state.user, { entries: count }));
          });
        this.displayFaceBox(this.calclateFaceLocation(result));
      })

      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#195aff",
          height: "100vh",
        }}
      >
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
          route={this.state.route}
        />
        <div
          style={{
            backgroundColor: "white",
            height: "100vh",
            borderRadius: "25px 25px 0px 0px",
            padding: "50px",
          }}
        >
          {this.state.route == "inside" ? (
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />
              <FaceRecognition
                box={this.state.box}
                imageUrl={this.state.imageUrl}
              />
            </div>
          ) : this.state.route == "signin" ? (
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <Register onRouteChange={this.onRouteChange} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
