import {
  Box,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { transcode } from 'buffer';
import React from 'react';

const styles = makeStyles({
  flows: {
    background: '#FFE1A8',
    height: '100%',
    padding: 10,
  },
});

export default function CurrentFlows(): JSX.Element {
  const classes = styles();
  return (
    <div className={classes.flows}>
      <Typography variant="h3">Current Flows:</Typography>
      <Typography variant="h5">In Progress</Typography>
      <Paper variant="outlined" style={{ padding: 10 }}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h6" style={{ display: 'inline-flex', flex: 1 }}>
            Some Flow Title
          </Typography>
          <Typography variant="h6" style={{ display: 'inline-flex' }}>
            3/6
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={70} />
        <Typography variant="body2" align="center">
          Current step title
        </Typography>
      </Paper>
    </div>
  );
}
