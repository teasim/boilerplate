import React from 'react';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Button } from "teasim";

const Home = props => (
  <div className="pa-wide" >
    <div className="mb-wide font-wide">{ props.count }</div>
    <Button 
      key="add" 
      onClick={() => { 
        props.dispatch({type: 'digit/add',payload:props.count})}
      }
    >
      +
    </Button>
    <Button 
      key="minus" 
      onClick={() => { 
        props.dispatch({type: 'digit/minus',payload:props.count})}
      }
    >
      -
    </Button>
  </div>
);

const selectCount = () =>
  createSelector(state => state.get("digit"), count => count.get("count"));

const mapStateToProps = createSelector(selectCount(), count => ({
  count
}));

export default connect(mapStateToProps)(Home);