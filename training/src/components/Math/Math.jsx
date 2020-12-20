import React from 'react';
import PropTypes from 'prop-types';

const Calculation = (props) => {
  const {
    first, second, operator, children,
  } = props;
  let { result } = props;
  switch (operator) {
  case '+': result = first + second;
    break;
  case '-': result = first - second;
    break;
  case '*': result = first * second;
    break;
  case '/': result = first / second;
    break;
  default: return ('invalid operator');
  }
  if (children) {
    return children(first, second, result);
  }
  return (
    <>
      <p>
        {' '}
        {first}
        {' '}
        {operator}
        {' '}
        {second}
        {' '}
        =
        {' '}
        {result}
        {' '}
      </p>
    </>
  );
};
Calculation.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  result: PropTypes.number.isRequired,
  children: PropTypes.func,
};
Calculation.defaultProps = {
  children: null,
};

export default Calculation;
