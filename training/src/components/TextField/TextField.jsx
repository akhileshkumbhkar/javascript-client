import React from 'react';
import PropTypes from 'prop-types';
import validField, { disabledField, errorField, color } from './style';

function TextField(props) {
  const { value, disabled, error } = props;
  if (error) {
    return (
      <span>
        <b>An input with errors</b>
        <br />
        <br />
        <input type="text" style={errorField} value={error} />
        <br />
        <span style={color}>Could not be greater than</span>
        <br />
      </span>
    );
  }
  if (disabled) {
    return (
      <span>
        <b>This is a Disabled Input</b>
        <br />
        <br />
        <input type="text" style={disabledField} value="Disabled Input" disabled={disabled} />
        <br />
      </span>
    );
  }
  return (
    <span>
      <b>A Valid Input</b>
      <br />
      <br />
      <input type="text" style={validField} defaultValue={value} />
      <br />
    </span>
  );
}

TextField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};
TextField.defaultProps = {
  value: 'Accessible',
  disabled: false,
  error: '',
};

export default TextField;
