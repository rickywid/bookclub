import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Api from '../../services/api';

class UserProfile extends React.Component {
  api = new Api().Resolve();

  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    const userId = window.location.pathname.split('/')[2];
    const user = await this.api.getUserProfile(userId);

    this.setState({ user: user[0] });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="user-profile">
        <p>User Profile</p>
        <p>
Name:
          {user.name}
        </p>
        <p>
Description:
          {user.description}
        </p>
        <p>
Joined:
          {user.created_at}
        </p>
        <Link to={`/user/${user.id}/edit`}>Edit profile</Link>
        <Link to={`/user/${user.id}/list/${user.list_id}`}>Bookshelf</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getUser,
  };
}

export default connect(mapStateToProps, null)(UserProfile);

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};
