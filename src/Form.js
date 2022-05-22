import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, Input } from "@mui/material";

import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { DateTimePicker } from "@mui/lab";

//

const App = ({ task }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      created: new Date(),
      name: task?.name || "",
      deadline: task?.deadline || new Date(),
    },
  });
  const onSubmit = (e) => {
    // const fakeCreated = new Date("2021-12-28T16:55:41.435Z");
    // const fakeDeadline = new Date("2021-12-28T19:06:41.435Z");
    // e.deadline = fakeDeadline;
    // e.created = fakeCreated;
    e.created = new Date();
    localStorage.setItem("task", JSON.stringify(e));
    toast.success("Task added! You can now reload the page");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} style={{alignItems: 'end'}}>
          <Grid item xs={8}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your task" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  label="When is the deadline"
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box mt={2} mb={1}>
          <Button variant="contained" type="submit">
            submit
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default App;
