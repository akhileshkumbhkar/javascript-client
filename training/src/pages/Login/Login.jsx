/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  TextField, CssBaseline, Card, Typography, Avatar,
  CardContent, withStyles, InputAdornment, Button, CircularProgress,
} from '@material-ui/core';
import { Email, VisibilityOff, LockOutlined } from '@material-ui/icons';
import { MyContext } from '../../contexts/snackBarProvider/index';
import schema from './schema';
import Design from './style';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      redirect: false,
      hasError: true,
      message: '',
      touched: {
        email: false,
        password: false,
      },
    };
  }

    renderRedirect = () => {
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to="/trainee" />;
      }
    }

    handleChange = (key) => ({ target: { value } }) => {
      this.setState({ [key]: value });
    };

    onClickHandler = async (data , openSnackBar) => {
      const { loginUser } = this.props;
      const { email, password } = data;
      console.log('props :', loginUser);
      this.setState({
        loading: true,
        hasError: true,
      });
     const responseLogin = await loginUser({ variables:{ email, password } });
     const response = JSON.parse(responseLogin.data.loginUser);
      this.setState({ loading: false });
      if (response.status === 200) {
       localStorage.setItem('token', response.data);
        this.setState({
          redirect: true,
          hasError: false,
          message: 'Successfully Login',
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'success');
        });
      } else {
        this.setState({
          message: 'Login Failed, Record Not Found',
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'error');
        });
      }
    }

  hasErrors = () => {
    try {
      schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

    getError = (field) => {
      const { touched } = this.state;
      if (touched[field] && this.hasErrors()) {
        try {
          schema.validateSyncAt(field, this.state);
          return false;
        } catch (err) {
          return err.message;
        }
      }
    };

    isTouched = (field) => {
      const { touched } = this.state;
      this.setState({
        touched: {
          ...touched,
          [field]: true,
        },
      });
    }

    render() {
      const { classes } = this.props;
      const {
        email, password, loading,
      } = this.state;
      this.hasErrors();
      return (
        <>
          <div className={classes.main}>
            <CssBaseline />
            <Card open aria-labelledby="form-dialog-title">
              <Avatar className={classes.icon}>
                <LockOutlined />
              </Avatar>
              <Typography variant="h3" align="center">Login</Typography>
              <CardContent>
                <form>
                  <div>
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      label="Email Address"
                      defaultValue=""
                      variant="outlined"
                      helperText={this.getError('email')}
                      error={!!this.getError('email')}
                      onChange={this.handleChange('email')}
                      onBlur={() => this.isTouched('email')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      required
                      type="password"
                      fullWidth
                      id="outlined-required"
                      label="Password"
                      variant="outlined"
                      helperText={this.getError('password')}
                      error={!!this.getError('password')}
                      onChange={this.handleChange('password')}
                      onBlur={() => this.isTouched('password')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VisibilityOff />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                &nbsp;
                  <div>
                    <MyContext.Consumer>
                      {({ openSnackBar }) => (
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          disabled={this.hasErrors()}
                          onClick={() => {
                            this.onClickHandler({ email, password }, openSnackBar);
                          }}
                        >
                          {loading && (
                            <CircularProgress />
                          )}
                          {loading && <span>Signing in</span>}
                          {!loading && <span>Sign in</span>}
                          {this.renderRedirect()}
                        </Button>
                      )}
                    </MyContext.Consumer>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </>
      );
    }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(Design)(Login);
