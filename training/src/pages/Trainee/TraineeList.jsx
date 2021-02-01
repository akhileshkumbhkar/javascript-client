import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { TableComponent } from '../../components';
import callApi from '../../libs/utils/api';
import { MyContext } from '../../contexts';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
      EditOpen: false,
      RemoveOpen: false,
      message: '',
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 5,
      limit: 20,
      skip: 0,
      Count: 0,
      dataObj: [],
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.setState({ open: false });
    return open;
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  handleSubmit = (data) => {
    this.setState({
      open: false,
    }, () => {
      console.log('Data :', data);
    });
  }

  handleSelect = (event) => {
    console.log(event);
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    console.log(event);
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  handleChangePage = (event, newPage) => {
    this.componentDidMount(newPage);
    this.setState({
      page: newPage,
    });
  };

  // eslint-disable-next-line no-unused-vars
  handleRemoveDialogOpen = (element) => (event) => {
    this.setState({
      RemoveOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      RemoveOpen: false,
    });
  };

  handleRemove = () => {
    const { deleteData } = this.state;
    this.setState({
      RemoveOpen: false,
    });
    console.log('Deleted Item ', deleteData);
  };

  // eslint-disable-next-line no-unused-vars
  handleEditDialogOpen = (element) => (event) => {
    this.setState({
      EditOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false,
    });
  };

  handleEdit = (name, email) => {
    this.setState({
      EditOpen: false,
    });
    console.log('Edited Item ', { name, email });
  };

  componentDidMount = () => {
    const { limit, skip, dataObj } = this.state;
    console.log('dataObj:', dataObj);
    this.setState({ loading: true });
    const value = this.context;
    console.log('val :', value);
    // eslint-disable-next-line consistent-return
    callApi({}, 'get', `/trainee?skip=${skip}&limit=${limit}`).then((response) => {
      console.log('List response', response);
      if (response.Trainees.data.records === undefined) {
        this.setState({
          loading: false,
          message: 'Error, While fetching the Data',
        }, () => {
          const { message } = this.state;
          value.openSnackBar(message, 'error');
        });
      } else {
        this.setState({ dataObj: response.Trainees.data.records, loading: false, Count: 100 });
        return response;
      }
      console.log('dataObj Response : ', response);
    });
  }

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, RemoveOpen, EditOpen, editData, deleteData,
      loading, Count, dataObj,
    } = this.state;
    console.log('data inside traineelist :', dataObj);
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <div className={classes.dialog}>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              ADD TRAINEELIST
            </Button>
            <AddDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
          </div>
          &nbsp;
          &nbsp;
          <EditDialog
            Editopen={EditOpen}
            handleEditClose={this.handleEditClose}
            handleEdit={this.handleEdit}
            data={editData}
          />
          <br />
          <DeleteDialog
            open={RemoveOpen}
            data={deleteData}
            onClose={this.handleRemoveClose}
            onSubmit={this.handleRemove}
          />
          <br />
          <br />
          <TableComponent
            loader={loading}
            id="id"
            data={dataObj}
            column={
              [
                {
                  field: 'name',
                  label: 'Name',
                },
                {
                  field: 'email',
                  label: 'Email Address',
                  format: (value) => value && value.toUpperCase(),
                },
                {
                  field: 'createdAt',
                  label: 'Date',
                  align: 'right',
                  format: this.getDateFormat,
                },
              ]
            }
            actions={[
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,

              },
              {
                icon: <DeleteIcon />,
                handler: this.handleRemoveDialogOpen,
              },
            ]}
            onSort={this.handleSort}
            orderBy={orderBy}
            order={order}
            onSelect={this.handleSelect}
            count={Count}
            page={page}
            onChangePage={this.handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </>
    );
  }
}
TraineeList.contextType = MyContext;
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);
