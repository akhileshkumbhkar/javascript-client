import React from 'react';
import PropType from 'prop-types';
import {
  withStyles, createMuiTheme, ThemeProvider, Typography,
} from '@material-ui/core';

const styles = () => ({
  Text: {
    color: 'grey',
  },
});

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'Arial',
    ].join(','),
  },
});
function NoMatch(props) {
  const { classes } = props;
  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography>
          <div className={classes.Text} align="center">
            <h1>
              NOT FOUND
            </h1>
            <h4>
              seems like the pages you are looking after does not exist
            </h4>
          </div>
        </Typography>
      </ThemeProvider>
    </>
  );
}
NoMatch.propTypes = {
  classes: PropType.objectOf(PropType.string).isRequired,
};
export default withStyles(styles)(NoMatch);
