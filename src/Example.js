import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
};

export function Progress() {
  const [progress, setProgress] = React.useState(0);
  const [remaingDays, setRemainingDays] = React.useState(0);
  const [remaingHours, setRemainingHours] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const unparsedTask = localStorage.getItem("task");
      if (!unparsedTask) return;
      const task = JSON.parse(unparsedTask);

      console.log(task);
      const start = new Date(task.created);
      const end = new Date(task.deadline);
      console.log(start);
      const today = new Date();
      var q = Math.abs(today - start);
      var d = Math.abs(end - start);
      const rounded = (q / d) * 100;
      const value = Math.min(Math.max(rounded, 0), 100);
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(Math.abs((end - today) / oneDay));
      const oneHour = 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffHours = Math.round(Math.abs((end - today) / oneHour));

      setProgress(value);
      setRemainingDays(diffDays);
      setRemainingHours(diffHours);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
      <Box>{remaingDays} days remaining until deadline</Box>
      <Box>{remaingHours} hours remaining until deadline</Box>
    </Box>
  );
}
