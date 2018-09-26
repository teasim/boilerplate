import React from 'react';
import { connect } from "react-redux";
import { createSelector } from "reselect";

class TestError extends React.Component {
  componentDidCatch(e) {
    alert(e.message);
  }
  componentDidMount() {
    // throw new Error('a');
  }
  render() {
    return <div>Digit</div>
  }
};

const Home = props => (
  <div>
    <TestError />
    <h2>{ props.count }</h2>
    <button key="add" onClick={() => { props.dispatch({type: 'digit/add',payload:props.count})}}>+</button>
    <button key="minus" onClick={() => { props.dispatch({type: 'digit/minus',payload:props.count})}}>-</button>
  </div>
);

const selectCount = () =>
  createSelector(state => state.get("digit"), count => count.get("count"));

const mapStateToProps = createSelector(selectCount(), count => ({
  count
}));

export default connect(mapStateToProps)(Home);