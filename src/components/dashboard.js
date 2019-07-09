import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/simpleAction';

class Dashboard extends React.Component {
  componentDidMount() {
    const { getUserProfile } = this.props;
    console.log('dashboard mounted');
    getUserProfile();
  }

  render() {
    return (
      <div className="dashboard">
        <p>Dashboard</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
}

export default connect(mapStateToProps, actions)(Dashboard);

Dashboard.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
};
