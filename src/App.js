import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Progress } from "./Example";
import Form from "./Form";

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
    <div>
      <Typography variant="h2">You've got something important to do</Typography>
      {ready && <Form task={task} />}
      <Progress />
    </div>
  );
}

export default App;
