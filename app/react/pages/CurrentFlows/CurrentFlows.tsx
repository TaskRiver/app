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
      const token = await app.auth().currentUser?.getIdToken();
      const taskResponse = await fetch(`${API}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      setTasks(await taskResponse.json());
    };
    getData();
  }, []);

  return (
    <div className={classes.flows}>
      <Typography variant="h3">Current Flows:</Typography>
      <Typography variant="h5">In Progress</Typography>
      {console.log(tasks)}
      {tasks &&
        tasks.map((t) => (
          <Paper
            key={t._id}
            variant="outlined"
            style={{ padding: 10, cursor: 'pointer' }}
            onClick={() => history.push(`/task/${t._id}`)}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography
                variant="h6"
                style={{ display: 'inline-flex', flex: 1 }}
              >
                {t.name}
              </Typography>
              <Typography variant="h6" style={{ display: 'inline-flex' }}>
                {parseInt(t.currentStep, 10) + 1}/{t.steps.length}
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={70} />
            <Typography variant="body2" align="center">
              {t.steps[t.currentStep].title}
            </Typography>
          </Paper>
        ))}
    </div>
  );
}
