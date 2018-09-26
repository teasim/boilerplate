import React from 'react';
import PropTypes from 'prop-types';
import LanguageOption from './LanguageOption';

const LanguageSelect = props => (
  <select value={props.value} onChange={props.onToggle}>
    {props.values 
      ? props.values.map((value) => (
        <LanguageOption key={value} value={value} message={props.messages[value]}/>
      ))
      : <option>--</option>
    }
  </select>
);

LanguageSelect.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default LanguageSelect;
