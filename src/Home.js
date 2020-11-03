import * as React from "react";
import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";

import "./Home.css";

import { popupAction } from "./modules/actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.popupAction(true);
  }

  render() {
    console.log("this.props", this.props);
    return <div>{`${this.props.popup}`}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    popup: state.popup,
  };
};

export default connect(mapStateToProps, (dispatch) => ({
  ...bindActionCreators({ popupAction }, dispatch),
  dispatch,
}))(Home);
