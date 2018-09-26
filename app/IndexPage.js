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
    return <div>Teasim</div>
  }
};

const IndexPage = props => (
  <div>
    <TestError />
    <h2>{ props.language }</h2>
    <button key="add" onClick={() => { props.dispatch({type: 'localization/add',payload:props.language})}}>+</button>
    <button key="minus" onClick={() => { props.dispatch({type: 'localization/minus',payload:props.language})}}>-</button>
  </div>
);

const selectLocalization = state => state.get("localization");

const selectLocalizationLanguage = () =>
  createSelector(selectLocalization, language => language.get("language"));

const mapStateToProps = createSelector(selectLocalizationLanguage(), language => ({
  language
}));

export default connect(mapStateToProps)(IndexPage);