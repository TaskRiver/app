import React, { useEffect, useCallback } from 'react';
import {
  Button,
  Icon,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { AddCircle, ArrowBack, ChevronRight } from '@material-ui/icons';
import BrowserView from 'react-electron-browser-view';
import WindowContent from '../../components/WindowContent';
import TaskInfo from '../../components/TaskInfo';
import { useHistory, useParams } from 'react-router';
import { useState } from 'reactn';
import app from '../../../utils/base';
import API from '../../constants/API';

const styles = makeStyles({
  taskArea: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gridTemplateRows: '1fr 70px',
    gridTemplateAreas: ["'sidebar browser'", "'sidebar actions'"].join('\n'),
  },
  taskSidebar: {
    background: '#FFE1A8',
    gridArea: 'sidebar',
    height: '100%',
    overflow: 'auto',
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
    marginBottom: 20,
  },
});

export default function TaskView(): JSX.Element {
  const classes = styles();
  const history = useHistory();

  const { id } = useParams();

  const [task, setTask] = useState(null);

  const [currentStep, setCurrentStep] = useState(null);

  const updateTask = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const token = await app.auth().currentUser?.getIdToken();
        const complete = ((currentStep + 1) / task.steps.length) * 100;
        const tasks = await fetch(`${API}/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            ...task,
            currentStep,
            percentComplete: complete,
            completed: complete >= 100,
          }),
        });
        console.log(tasks);
      } catch (error) {
        console.log(error);
      }
    },
    [id, task, currentStep]
  );

  useEffect(() => {
    const getData = async () => {
      console.log('Task ID: ', id);
      const token = await app.auth().currentUser?.getIdToken();
      const taskResponse = await fetch(`${API}/tasks/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      const newTaskRes = await taskResponse.json();
      const { _doc: newTask } = newTaskRes;
      setCurrentStep(
        parseInt(!newTask.currentStep ? 0 : newTask.currentStep, 10)
      );
      setTask({
        ...newTask,
        currentStep: !newTask.currentStep ? 0 : newTask.currentStep,
      });
    };
    getData();
  }, [id]);

  return (
    <WindowContent>
      {task && (
        <div className={classes.taskArea}>
          <div className={classes.taskSidebar}>
            <div className={classes.titleArea}>
              <IconButton
                className={classes.backButton}
                onClick={() => history.push('/')}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h5">{task.name}</Typography>
            </div>
            <div className={classes.progressArea}>
              <LinearProgress
                variant="determinate"
                value={((currentStep + 1) / task.steps.length) * 100}
              />
            </div>
            <TaskInfo
              title={task.steps[currentStep].title}
              message={task.steps[currentStep].message}
            />
            <div className={classes.notesArea}>
              <Notes taskId={id} />
            </div>
          </div>
          <BrowserView
            src={task.steps[currentStep].uri}
            className={classes.browser}
          />
          <div className={classes.actionArea}>
            <div className={classes.buttonGroup}>
              {!!currentStep && (
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => setCurrentStep((step) => step - 1)}
                >
                  Prev Step
                </Button>
              )}
              {currentStep < task.steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ChevronRight />}
                  onClick={(e) => {
                    setCurrentStep((step) =>
                      step < task.steps.length - 1 ? step + 1 : step
                    );
                    updateTask(e);
                  }}
                >
                  Next Step
                </Button>
              )}
              {currentStep == task.steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ChevronRight />}
                  onClick={(e) => {
                    updateTask(e);
                    history.push('/');
                  }}
                >
                  Complete Task
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </WindowContent>
  );
}

function Notes({ taskId }): JSX.Element {
  const classes = styles();

  const [notes, setNotes] = useState();

  const getData = async () => {
    const token = await app.auth().currentUser?.getIdToken();
    const taskResponse = await fetch(`${API}/tasks/${taskId}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const res = await taskResponse.json();
    console.log(res);
    setNotes(res.reverse());
  };

  const handleCreate = useCallback(async (event) => {
    event.preventDefault();
    try {
      const token = await app.auth().currentUser?.getIdToken();
      const tasks = await fetch(`${API}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ taskId }),
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Typography variant="h6" className={classes.title}>
          Notes
        </Typography>
        <IconButton
          size="small"
          style={{ display: 'inline-flex', flex: 0 }}
          onClick={handleCreate}
        >
          <AddCircle />
        </IconButton>
      </div>
      {notes &&
        notes.map((n) => (
          <Note key={n._id} noteInfo={n} updateNotes={getData} />
        ))}
    </>
  );
}

function Note({ noteInfo, updateNotes }): JSX.Element {
  const classes = styles();
  const [note, setNote] = useState(noteInfo);

  const handleUpdate = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const token = await app.auth().currentUser?.getIdToken();
        const notes = await fetch(`${API}/notes/${note._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({ ...note }),
        });
        updateNotes();
      } catch (error) {
        console.log(error);
      }
    },
    [note]
  );

  return (
    <Paper elevation={3} className={classes.stickyNote}>
      <TextField
        placeholder="Title"
        style={{ marginBottom: 10 }}
        inputProps={{ style: { fontWeight: 'bold' } }}
        value={note.title}
        onChange={({ target }) => setNote({ ...note, title: target.value })}
      />
      <TextField
        label="Note Body"
        variant="outlined"
        InputProps={{
          rows: 4,
          rowsMin: 4,
        }}
        multiline
        value={note.content}
        onChange={({ target }) => setNote({ ...note, content: target.value })}
      />
      <Button onClick={handleUpdate}>Update</Button>
    </Paper>
  );
}
