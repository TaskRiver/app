import React, { ReactNode } from 'react';
import { Box, makeStyles } from '@material-ui/core';

type Props = {
  children: ReactNode;
  style?: React.CSSProperties;
};

const styles = makeStyles({
  windowContent: {
    height: '100%',
  },
});

export default function WindowContent({ children, style }: Props): JSX.Element {
  const classes = styles();
  return (
    <Box className={classes.windowContent} style={style}>
      {children}
    </Box>
  );
}
