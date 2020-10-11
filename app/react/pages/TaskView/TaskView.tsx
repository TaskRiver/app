import React from 'react';
import {
  Button,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { ArrowBack, ChevronRight } from '@material-ui/icons';
import BrowserView from 'react-electron-browser-view';
import WindowContent from '../../components/WindowContent';
import { transcode } from 'buffer';

const styles = makeStyles({
  taskArea: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gridTemplateRows: 'auto 70px',
    gridTemplateAreas: ["'sidebar browser'", "'sidebar actions'"].join('\n'),
  },
  taskSidebar: {
    background: '#FFE1A8',
    gridArea: 'sidebar',
    padding: 15,
    '& > *': {
      marginBottom: 10,
    },
  },
  browser: {
    width: '100%',
    height: '100%',
    gridArea: 'browser',
  },

  titleArea: {
    display: 'flex',
    flexDirection: 'row',
    // padding: 5,
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
  progressArea: {
    // padding: '0 5px',
  },
  actionArea: {
    gridArea: 'actions',
    background: '#FFE1A8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonGroup: {
    margin: '0 10px',
  },
  stepArea: {},
  title: {
    marginBottom: 10,
  },
  stepMessage: {
    background: 'transparent',
    padding: 10,
  },
  notesArea: {},
  stickyNote: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
});

export default function TaskView(): JSX.Element {
  const classes = styles();
  return (
    <WindowContent>
      <div className={classes.taskArea}>
        <div className={classes.taskSidebar}>
          <div className={classes.titleArea}>
            <IconButton className={classes.backButton}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5">
              Send Email and Anouncement for this Week's Event
            </Typography>
          </div>
          <div className={classes.progressArea}>
            <LinearProgress variant="determinate" value={50} />
          </div>
          <div className={classes.stepArea}>
            <Typography variant="h6" className={classes.title}>
              Current Task
            </Typography>
            <Paper variant="outlined" className={classes.stepMessage}>
              This is some optional information about this step
            </Paper>
          </div>
          <div className={classes.notesArea}>
            <Typography variant="h6" className={classes.title}>
              Notes
            </Typography>
            <Paper elevation={3} className={classes.stickyNote}>
              <TextField placeholder="Title" style={{ marginBottom: 10 }} />
              <TextField
                label="Note Body"
                variant="outlined"
                rows={4}
                multiline
              />
            </Paper>
          </div>
        </div>
        <BrowserView src="https://google.com" className={classes.browser} />
        <div className={classes.actionArea}>
          <div className={classes.buttonGroup}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ChevronRight />}
            >
              Next Step
            </Button>
          </div>
        </div>
      </div>
    </WindowContent>
  );
}
