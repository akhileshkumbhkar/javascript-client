import React from 'react';

import PropTypes from 'prop-types';

import { Error, Input } from './style';

const TextField = (props) => {
  const { value, disabled, error } = props;
  if (error) {
    return (
      <>
        <Input type="text" value={value} error />
        <Error>{error}</Error>
      </>
    );
  }
  return (
    <Input type="text" value={value} disabled={disabled} />
  );
};

TextField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.string,
  error: PropTypes.string,
};
TextField.defaultProps = {
  value: 'Accessible',
  disabled: false,
  error: '',
};

export default TextField;
