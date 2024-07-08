import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/auth.service";

const handleLogout = () => {
  auth.service.logout();
  return <Navigate to={"/"} />;
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  logOut() {
    auth.service.logout();
    this.setState({
      currentUser: undefined,
    });
    this.setState({ redirect: "/" });
    return <Navigate to={this.state.redirect} />;
  }

  componentDidMount = async () => {
    const userFromStorage = authService.getCurrentUserFromStorage();
    if (userFromStorage == null) {
      console.log("inside goto home");
      this.setState({ redirect: "/" });
      return <Navigate to={this.state.redirect} />;
    }
    const currentUser = await authService.getCurrentUser();
    // console.log("currUser: "+currentUser);
    // console.log("string: "+JSON.stringify(currentUser));
    // console.log("curData: "+currentUser.data);
    console.log("username: " + currentUser.username);

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true });
  };

  render() {
    // const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {this.state.userReady ? (
          <div>
            <header className="jumbotron">
              <h3>
                <strong>Profile: {currentUser.username}</strong>
              </h3>
            </header>
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>

            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </div>
        ) : null}
        <button onClick={this.logOut}>Logout</button>
      </div>
    );
  }
}
