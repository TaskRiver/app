import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
  title: string;
  message?: string;
}

const styles = makeStyles({
  stepArea: {},
  title: {
    marginBottom: 10,
  },
  stepMessage: {
    background: 'transparent',
    padding: 10,
  },
});

export default function TaskInfo<>({ title }: Props): JSX.Element {
  const classes = styles();
  return (
    <div className={classes.stepArea}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Paper variant="outlined" className={classes.stepMessage}>
        This is some optional information about this step
      </Paper>
    </div>
  );
}
