export const disabledField = {
  padding: '5px',
  width: '1475px',
  height: '25p',
};

const validField = {
  ...disabledField,
  border: '4px solid brown',
  'border-width': '2px',
};

export const color = {
  color: 'red',
};

export const errorField = {
  ...validField,
  border: '4px solid red',
  'border-width': '2px',
};

export default validField;
