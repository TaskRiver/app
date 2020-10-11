import React, { ReactNode } from 'react';
import { Box, makeStyles } from '@material-ui/core';

type Props = {
  children: ReactNode;
};

const styles = makeStyles({
  windowContent: {
    height: '100%',
  },
});

export default function WindowContent({ children }: Props): JSX.Element {
  const classes = styles();
  return <Box className={classes.windowContent}>{children}</Box>;
}
