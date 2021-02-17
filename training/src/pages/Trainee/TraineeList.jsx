import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { TableComponent } from '../../components';
import { GET_TRAINEE } from './Query';
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
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 5,
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

  handleChangePage = (refetch) => (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({
      page: newPage,
    }, () => {
      refetch({ skip: String(newPage * rowsPerPage), limit: String(rowsPerPage) });
    });
  }

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, RemoveOpen, EditOpen, editData, deleteData,
    } = this.state;
    const { classes } = this.props;
    const {
      data: {
        getAllTrainees: { data = [] } = {},
        refetch,
        loading,
      },
    } = this.props;
    const Records = data ? data.records : [];
    const Totalcount = data ? data.count : 0;
    console.log('records is :', data);
    return (
      <>
        <div className={classes.root}>
          <div className={classes.dialog}>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              ADD TRAINEELIST
            </Button>
            <AddDialog
              open={open}
              onClose={this.handleClose}
              onSubmit={() => this.handleSubmit}
              refetch={refetch}
            />
          </div>
          &nbsp;
          &nbsp;
          <EditDialog
            Editopen={EditOpen}
            handleEditClose={this.handleEditClose}
            handleEdit={this.handleEdit}
            data={editData}
            refetch={refetch}
          />
          <br />
          <DeleteDialog
            open={RemoveOpen}
            data={deleteData}
            onClose={this.handleRemoveClose}
            onSubmit={this.handleRemove}
            refetch={refetch}
          />
          <br />
          <TableComponent
            loader={loading}
            id="id"
            data={Records}
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
            count={Totalcount}
            page={page}
            onChangePage={this.handleChangePage(refetch)}
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
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default Compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE, {
    options:
    {
      variables:
      {
        skip: '0', limit: '5', sort: true, search: '',
      },
    },
  }),
)(TraineeList);
