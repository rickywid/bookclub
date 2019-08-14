import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Icon,
  Input,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/simpleAction';
import { ReactComponent as GoogleIcon } from '../assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as ReadingSVG } from '../assets/images/reading.svg';

const LandingWrapper = styled.div`
  display: flex;  
  height: calc(100vh - 113px);
`;
const LandingLeft = styled.div`
  flex: 1;
  margin: auto;
`;
const LandingRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: auto;
`;
const LoginWrapper = styled.div`
  background: #d0e3ed;
  width: 80%;
  padding: 60px;
  margin: 0 auto;
`;
const Header = styled.h2`
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 0;
  line-height: 1;
  margin-bottom: 2rem;
`;

const SocialLoginWrapper = styled.div``;
const ErrorMsg = styled.p`
  display: inline;
  fontWeight: bold; 
  color: red; 
  textAlign: center;
`;

const btnStyle = {
  width: '85%',
  fontWeight: 'bold',
  background: '#fff',
  marginBottom: '1rem',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: '7px 7px 7px 20px',
  color: 'black',
};

const socialIconStyle = {
  height: '20px',
  marginRight: '1rem',
};

const readingSVGStyle = {
  height: 'auto',
  width: '90%',
};

const style1 = {
  width: '100%',
  textAlign: 'center',
  borderBottom: '1px solid #000',
  lineHeight: '0.1em',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '2rem 0',
};
const style2 = {
  background: '#d0e3ed',
  padding: '0 10px',
};

class Landing extends React.Component {
  componentDidMount() {
    console.log('landing');
  }

  handleSubmit = (e) => {
    const { signin, history } = this.props;
    const { validateFields } = this.props.form; {/* eslint-disable-line */}
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        signin(values, history);
      }
    });
  };

  handleSignIn = () => {
    window.open('http://localhost:3001/signin', '_self');
  }

  render() {
    const { getFieldDecorator } = this.props.form; {/* eslint-disable-line */}
    const { errors } = this.props;

    return (
      <LandingWrapper>
        <LandingLeft>
          <Header>Grab A Book And Free Your Mind</Header>
          <p>Keep track of all the past, present and future books you want to read. Check out other members profiles and see what books are on their list and maybe even recommend each other a book to read. </p>
          <ReadingSVG style={readingSVGStyle} />
        </LandingLeft>
        <LandingRight>
          <LoginWrapper>
            <h2>Sign In</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('login', {
                  rules: [{ required: true, message: 'Please input your email or username' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email/Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button style={{ marginRight: '1rem' }} type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                {errors ? errors.map(error => <ErrorMsg>{error}</ErrorMsg>) : ''}
              </Form.Item>
            </Form>
            <p style={style1}>
              <span style={style2}>OR</span>
            </p>
            <SocialLoginWrapper>
              <Button style={btnStyle} onClick={this.handleSignIn}>
                <GoogleIcon style={socialIconStyle} />
                Sign In With Google
              </Button>
              <Button style={btnStyle} onClick={this.handleSignIn}>
                <FacebookIcon style={socialIconStyle} />
                Sign In With Facebook
              </Button>
            </SocialLoginWrapper>
          </LoginWrapper>
        </LandingRight>
      </LandingWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.auth.errors,
  };
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Landing);

export default connect(mapStateToProps, actions)(withRouter(WrappedNormalLoginForm));


Landing.propTypes = {
  errors: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  signin: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
