import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, Input } from "@mui/material";

import { Button } from "@mui/material";

// function MaterialUIPickers() {
//   const [value, setValue] = React.useState(new Date());

//   const handleChange = (newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Stack spacing={3}>
//         <DesktopDatePicker
//           label="Date desktop"
//           inputFormat="MM/dd/yyyy"
//           value={value}
//           onChange={handleChange}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </Stack>
//     </LocalizationProvider>
//   );
// }

const App = ({ task }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      created: task?.created || new Date(),
      name: task?.name || "",
      deadline: task?.deadline || new Date()
    }
  });
  const onSubmit = (e) => {
    // const fakeCreated = new Date("2021-12-28T16:55:41.435Z");
    // const fakeDeadline = new Date("2021-12-28T19:06:41.435Z");
    // e.deadline = fakeDeadline;
    // e.created = fakeCreated;
    localStorage.setItem("task", JSON.stringify(e));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={8}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your task" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={8}>
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <DesktopDatePicker
                  {...field}
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box mt={1}>
          <Button variant="contained" type="submit">
            submit
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default App;
