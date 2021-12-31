import { Card,  Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import { useEffect, useState } from "react";
import { Progress } from "./Example";
import Form from "./Form";
import './styles.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


// const theme = createTheme({
//   status: {
//     danger: orange[500],
//   },
// });

function App() {
  const [task, setTask] = useState();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const getTask = () => {
      console.log("before");
      const task = localStorage.getItem("task");
      setTask(JSON.parse(task));
      console.log("yo");
      setReady(true);
    };
    getTask();
  }, []);

  return (
    <ThemeProvider theme={theme} >
      <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Card elevation={2} style={{
          position: 'relative',
          background: 'transparent',
          color: 'white',
          maxWidth: 600,
          margin: 'auto',
          padding: '2rem'
        }}>
          <Typography variant="h2">You've got something important to do</Typography>
          {ready && <Form task={task} />}
          <Progress />
        </Card>
        <div style={{ zIndex: -1, position: 'fixed', top: 0, left: 0, backgroundImage: 'url(./magic.svg)', backgroundSize: 'cover', height: '100%', width: '100%' }}></div>
      </div >
     </ThemeProvider>
  );
}

export default App;
