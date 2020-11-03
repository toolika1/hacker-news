import * as React from "react";
import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { bindActionCreators } from "redux";

import "./Home.css";

class Home extends React.Component {
  render() {
    // console.log("this.props", this.props);
    // const { pageNumber } = this.props;
    return <div>Home</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    // prop: state.prop,
  };
};

export default connect(mapStateToProps, (dispatch) => ({
  // ...bindActionCreators({}, dispatch),
  dispatch,
}))(Home);
