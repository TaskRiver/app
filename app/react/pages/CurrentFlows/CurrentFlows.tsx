import {
  Box,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import app from '../../../utils/base';
import API from '../../constants/API';

const styles = makeStyles({
  flows: {
    background: '#FFE1A8',
    height: '100%',
    padding: 10,
  },
});

export default function CurrentFlows(): JSX.Element {
  const classes = styles();

  const [tasks, setTasks] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await app.auth().currentUser?.getIdToken();
        const taskResponse = await fetch(`${API}/tasks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });
        const nTask = await taskResponse.json();
        console.log(nTask);
        setTasks(nTask);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <div className={classes.flows}>
      <Typography variant="h3">Current Flows:</Typography>
      <Typography variant="h5">In Progress</Typography>
      {tasks &&
        tasks
          .filter((t) => !t.completed)
          .map((t) => <TaskOverview key={t._id} task={t} />)}
      <Typography variant="h5">Complete</Typography>
      {tasks &&
        tasks
          .filter((t) => t.completed)
          .map((t) => <TaskOverview key={t._id} task={t} />)}
    </div>
  );
}

function TaskOverview({ task }): JSX.Element {
  const history = useHistory();
  return (
    <Paper
      variant="outlined"
      style={{ padding: 10, cursor: 'pointer' }}
      onClick={() => history.push(`/task/${task._id}`)}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h6" style={{ display: 'inline-flex', flex: 1 }}>
          {task.name}
        </Typography>
        <Typography variant="h6" style={{ display: 'inline-flex' }}>
          {parseInt(task.currentStep, 10) + 1} / {task.steps.length}
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={task.percentComplete} />
      <Typography variant="body2" align="center">
        {task.currentStep && task.steps[task.currentStep].title}
      </Typography>
    </Paper>
  );
}
