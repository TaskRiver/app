import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { BackgroundColor } from 'chalk';
import React, { useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import app from '../../utils/base';
import API from '../constants/API';

interface Step {
  id: string;
  title: string | null;
  uri: string | null;
  message?: string; // Optional
}

interface Task {
  name: string;
  steps: Step[];
}

export default function CreateFlows(): JSX.Element {
  const [steps, setSteps] = useState<Step[]>([]);
  const [taskTitle, setTaskTitle] = useState(null);

  const history = useHistory();

  const handleCreate = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const token = await app.auth().currentUser?.getIdToken();
        const tasks = await fetch(`${API}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({ name: taskTitle, steps }),
        });
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    [steps, taskTitle]
  );

  return (
    <div
      style={{
        background: '#FFE1A8',
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
      }}
    >
      <div>
        <Typography variant="h3">Create Task</Typography>
      </div>
      <TextField
        InputProps={{
          style: {
            fontSize: 30,
          },
        }}
        placeholder="Task Title"
        onChange={({ target }) => setTaskTitle(target.value)}
      />
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 'auto',
          overflow: 'auto',
          padding: '30px 0',
        }}
      >
        {steps.map((s, i) => (
          <Paper
            key={s.id}
            style={{
              padding: 15,
              display: 'flex',
              flex: 'none',
              flexDirection: 'column',
              width: 350,
              height: 'auto',
              marginRight: 30,
            }}
          >
            <TextField
              label="Title"
              value={s.title}
              onChange={({ target }) => {
                setSteps((stepList) => {
                  stepList[i].title = target.value;
                  return [...stepList];
                });
              }}
            />
            <TextField
              label="URL"
              value={s.uri}
              onChange={({ target }) => {
                setSteps((stepList) => {
                  stepList[i].uri = target.value;
                  return [...stepList];
                });
              }}
            />
            <TextField
              label="Note Body"
              value={s.message}
              rows={5}
              multiline
              onChange={({ target }) => {
                setSteps((stepList) => {
                  stepList[i].message = target.value;
                  return [...stepList];
                });
              }}
            />
            <Button
              onClick={() =>
                setSteps((stepList) =>
                  stepList.filter((sItem) => sItem.id !== s.id)
                )
              }
              color="secondary"
            >
              Delete
            </Button>
          </Paper>
        ))}
        <IconButton
          onClick={() =>
            setSteps((stepsList) => [
              ...stepsList,
              { id: uuidv4(), title: null, uri: null },
            ])
          }
        >
          <AddCircle />
        </IconButton>
      </div>
      <div
        style={{
          height: 36,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <Button variant="contained" onClick={handleCreate} color="primary">
          Create Task
        </Button>
      </div>
    </div>
  );
}
