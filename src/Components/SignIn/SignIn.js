import React from "react";
import "./SignIn.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }
  onEmailChange = (event) => {
    event.preventDefault();
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    event.preventDefault();
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
  };
  // fetch("http://localhost:4000/signin", {
  //   method: "post",
  //   headers: { "content-type": "application/json" },
  //   body: JSON.stringify({
  //     email: this.state.signInEmail,
  //     password: this.state.signInPassword,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data === "success") {
  //       this.props.onRouteChange("home");
  //     }
  //   });

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="custom-form mw6 br3 pa1 pa2-ns mv4 ba b--black-10 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-light-blue hover-navy w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-light-blue hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                // onClick={() => onRouteChange("home")}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="pv1 lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;
