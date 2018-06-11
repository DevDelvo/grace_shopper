import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { getCars } from '../thunks/cars';
import { addTransaction } from '../thunks/transactions';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '800px',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    // minWidth: 700
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

class GuestCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '',
      cardType: '',
      expirationDate: '',
      csv: '',
      cardHolder: '',
      shippingAddress: '',
      billingAddress: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }

  // Getting cars from backend for dummy purpose
  componentDidMount() {
    this.props.fetchAllCars();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleOrder(evt) {
    evt.preventDefault();
    const info = this.state;
    this.props.addOrder(info);
  }

  render() {
    const { classes } = this.props;
    console.log(typeof this.state.cardNumber);

    return (
      <div>
        <Typography variant="headline" component="h3">
          Checkout
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Maker</TableCell>
                <TableCell numeric>Name</TableCell>
                <TableCell numeric>Year</TableCell>
                <TableCell numeric>Color</TableCell>
                <TableCell numeric>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.cars.map(car => {
                return (
                  <TableRow key={car.id}>
                    <TableCell component="th" scope="row">
                      {car.name}
                    </TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>{car.color}</TableCell>
                    <TableCell>{car.price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <Paper className={classes.container}>
          <TextField
            name="cardNumber"
            label="Card Number"
            className={classes.textField}
            value={this.state.cardNumber}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            label="Card Type"
            name="cardType"
            className={classes.textField}
            value={this.state.cardType}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            label="Exp. Date"
            name="expirationDate"
            className={classes.textField}
            value={this.state.expirationDate}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            name="csv"
            label="CSV"
            className={classes.textField}
            value={this.state.csv}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            name="cardHolder"
            label="Cardholder Name"
            className={classes.textField}
            value={this.state.cardHolder}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            name="shippingAddress"
            label="Shipping Address"
            className={classes.textField}
            value={this.state.shippingAddress}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            name="billingAddress"
            label="Billing Address"
            className={classes.textField}
            value={this.state.billingAddress}
            onChange={this.handleChange}
            margin="normal"
          />
        </Paper>
        <Button onClick={this.handleOrder}>Process Payment</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.car.cars
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchAllCars: () => dispatch(getCars()),
    addOrder: orderInfo => dispatch(addTransaction(orderInfo))
  };
};

GuestCheckout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GuestCheckout)
);
