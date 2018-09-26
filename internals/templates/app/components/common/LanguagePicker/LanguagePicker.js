import React from 'react';
import PropTypes from 'prop-types';
import { Section, Row, Column } from 'teasim';
import { LanguageToggle } from 'app/containers/common/lang/index'

const LanguagePicker = props => (
  <Section size={props.size} isNarrow>
    <Row>
      <Column>
        <LanguageToggle />
      </Column>
    </Row>
  </Section>
);

LanguagePicker.propTypes = {
  size: PropTypes.string,
};

export default LanguagePicker;
