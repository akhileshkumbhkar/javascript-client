import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogActions, DialogContentText, DialogTitle, Button, CircularProgress,
} from '@material-ui/core';
import { MyContext } from '../../../../contexts';
import callApi from '../../../../libs/utils/api';

const useStyles = () => ({
  button_color: {
    backgroundColor: 'blue',
    color: 'white',
  },
});

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      loading: false,
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value }, () => console.log(this.state));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onClickHandler = async (data, openSnackBar) => {
    console.log('Inside delete onclick');
    console.log('data from delete', data);
    this.setState({
      loading: true,
    });
    const { onSubmit } = this.props;
    const id = data.originalId;
    console.log('id for delet is ==', id);
    const response = await callApi({}, 'delete', `/trainee/${id}`);
    console.log('response is == ', response);
    this.setState({ loading: false });
    if (response.code === 200) {
      this.setState({
        message: response.message,
      }, () => {
        const { message } = this.state;
        onSubmit(data);
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'Error While Deleting',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  render() {
    const {
      open, onClose, onSubmit, data,
    } = this.props;
    const { loading } = this.state;
    return (
      <Dialog
        open={open}
        onClose={() => this.handleClose()}
        variant="outlined"
        color="primary"
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
        <DialogContentText>
          Do you really want to remove Trainee ?
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <MyContext.Consumer>
              {({ openSnackBar }) => (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    onSubmit({ data });
                    this.onClickHandler(data, openSnackBar);
                  }}
                >
                  {loading && (
                    <CircularProgress size={15} />
                  )}
                  {loading && <span>Deleting</span>}
                  {!loading && <span>Delete</span>}
                </Button>
              )}
            </MyContext.Consumer>
          </DialogActions>
        </DialogContentText>
      </Dialog>
    );
  }
}
DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(useStyles)(DeleteDialog);
