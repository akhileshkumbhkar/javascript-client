/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Typography, CardContent, InputAdornment, Button, Avatar, Card, CssBaseline, withStyles,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { schema } from '../../config/constants'
import { Email, VisibilityOff } from '@material-ui/icons';

const Design = (theme) => ({
  icon: {
    background: 'red',
    marginLeft: theme.spacing(22),
    marginTop: theme.spacing(3),
  },
  main: {
    width: 400,
    marginTop: theme.spacing(25),
    marginLeft: theme.spacing(50),
  },
})

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      touched: {
        email: false,
        password: false,
      },
    };
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

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
                      helperText={this.getError('email')}
                      error={!!this.getError('email')}
                      required
                      id="outlined-required"
                      label="Email Address"
                      defaultValue=" "
                      variant="outlined"
                      fullWidth
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
              &nbsp;
                  <div>
                    <TextField
                      type="password"
                      helperText={this.getError('password')}
                      error={!!this.getError('password')}
                      required
                      id="outlined-required"
                      label="Password"
                      variant="outlined"
                      fullWidth
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
                    <Button variant="contained" color="primary" disabled={this.hasErrors()} fullWidth>SIGN IN</Button>
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
