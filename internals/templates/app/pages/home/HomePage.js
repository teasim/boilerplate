import React from 'react';
import { Section } from 'teasim';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const HomePage = () => (
  <Section size="huge">
    <FormattedMessage {...messages.hello} /> HomePage! 
    <FormattedMessage {...messages.name } />.
  </Section>
);

export default HomePage;