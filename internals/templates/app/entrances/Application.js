import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, LayoutBodyer, LayoutTopper } from 'teasim';
import { LanguagePicker } from 'app/components/common/index';
import { HomePage, AboutPage } from 'app/pages/index';

const Application = () => (
  <Layout >
    <LayoutTopper>
      <LanguagePicker />
    </LayoutTopper>
    <LayoutBodyer>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/about" component={AboutPage} />
      </Switch>
    </LayoutBodyer>
  </Layout>
);

export default Application;