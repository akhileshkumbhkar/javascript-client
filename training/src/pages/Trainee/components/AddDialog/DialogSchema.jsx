import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().trim().required('Name is a required field').min(5),
  email: yup.string().trim().email().required('Email is a required field')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'invalid email'),
  password: yup.string().required('Password is a required field').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Must contain eight 8 character, at least one UpperCase, one lowercase, one number and one special character'),
  'Confirm Password': yup.string().required('Confirm Password is a required field').oneOf([yup.ref('password'), null], 'Must match password'),

});
export default schema;
