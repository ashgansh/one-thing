import { Card, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Progress } from "./Progress";
import Form from "./Form";
import "./styles.css";

const theme = createTheme({ palette: { primary: { main: '#4965f0' } } });

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
    <ThemeProvider theme={theme}>
      <Toaster />
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <Typography
          variant="h4"
          mt={4}
          mb={4}
          style={{ textAlign: "center", fontFamily: 'Londrina Solid' }}
        >
          You've got something important to do
        </Typography>
        {ready && <Form task={task} />}
      </div>
      <div style={{ height: "100%" }}>
        {ready ?
          <Card
            elevation={1}
            className="shiny"
            style={{
              color: 'black',
              position: "relative",
              backgroundSize: 'cover',
              boxSizing: 'border-box',
              maxWidth: 600,
              margin: "auto",
              padding: "2rem",
            }}
          >

            <Progress />

          </Card>
          : 'Loading'}
      </div>
    </ThemeProvider>
  );
}

export default App;
