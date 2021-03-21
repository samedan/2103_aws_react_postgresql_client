import React, { Component } from "react";
import history from "./history";
import axios from "axios";
import * as ACTIONS from "../store/actions/actions";
import { connect } from "react-redux";

class AuthCheck extends Component {
  // send profile to db (including email), saves it and retrieve it
  send_profile_to_db = (profile) => {
    const data = profile;
    axios
      .post("/api/posts/userprofiletodb", data)
      .then(() =>
        axios
          .get("/api/get/userprofilefromdb", {
            params: {
              email: profile.profile.email,
            },
          })
          // saves the Auth0 profile into the Progresql Database
          .then((res) => this.props.set_db_profile(res.data))
      )
      .then(history.replace("/"));
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.props.login_success();
      this.props.add_profile(this.props.auth.userProfile);
      this.send_profile_to_db(this.props.auth.userProfile);
      history.replace("/");
    } else {
      this.props.login_failure();
      this.props.remove_profile();
      this.props.remove_db_profile();
      history.replace("/");
    }
  }

  render() {
    return <div />;
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (profile) => dispatch(ACTIONS.add_profile(profile)),
    remove_profile: () => dispatch(ACTIONS.remove_profile()),
    set_db_profile: (profile) => dispatch(ACTIONS.set_db_profile(profile)),
    remove_db_profile: () => dispatch(ACTIONS.remove_db_profile),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthCheck);
