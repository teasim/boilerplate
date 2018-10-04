import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Button } from 'teasim';

class Home extends React.PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetch',
    });
  }

  render() {
    const props = this.props;
    return (
      <div className="pa-wide">
        <div className="mb-wide">
          <h1>{props.count}</h1>
          <Button
            key="add"
            onClick={() => {
              props.dispatch({ type: 'digit/add', payload: props.count });
            }}
          >
            +
          </Button>
          <Button
            key="minus"
            onClick={() => {
              props.dispatch({ type: 'digit/minus', payload: props.count });
            }}
          >
            -
          </Button>
        </div>
        <div className="">
          <h3>Fetch Users</h3>
          {props.userList.map(user => (
            <div key={user.key}>
              {user.name} : {user.age}
            </div>
          ))}
        </div>
      </div>
    )
  }
};

const selectCount = () =>
  createSelector(state => state.get('digit'), count => count.get('count'));

const selecUserList = () =>
  createSelector(state => state.get('user'), user => user.get('list'));

const mapStateToProps = createSelector([selectCount(),selecUserList()], (count,userList) => ({
  count,
  userList,
}));

export default connect(mapStateToProps)(Home);
