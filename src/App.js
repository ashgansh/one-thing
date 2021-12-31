import { Card, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';



import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Progress } from "./Progress";
import Form from "./Form";
import './styles.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
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
      <Toaster />
      <Typography color="white" variant="h4" mt={4} mb={4} style={{ textAlign: 'center' }}>You've got something important to do</Typography>
      <div style={{ height: '100%', }}>
        <Card elevation={8} style={{
          position: 'relative',
          background: 'transparent',
          color: 'white',
          maxWidth: 600,
          margin: 'auto',
          padding: '2rem'
        }}>
          {ready && <Form task={task} />}
          <Progress />

        </Card>
        <div style={{ zIndex: -1, position: 'fixed', top: 0, left: 0, backgroundImage: 'url(./magic.svg)', backgroundSize: 'cover', height: '100%', width: '100%' }}></div>
      </div >
    </ThemeProvider>
  );
}

export default App;
