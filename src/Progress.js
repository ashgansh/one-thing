import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReactCountdown from "react-countdown";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          style={{ height: 30 }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 60 }}>
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
  value: PropTypes.number.isRequired,
};

// Random component
const Completionist = () => <Typography mt={1}>So this is christmas</Typography>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  console.log(hours, completed);
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div style={{ display: 'flex' }} >
        <Typography component="div">{days} days </Typography>
        <Typography style={{ marginLeft: '1rem' }} component="div">
          {hours}h:{minutes}m:{seconds}s
        </Typography>
      </div >
    );
  }
};

const Countdown = () => {
  const [deadline, setDeadline] = React.useState();
  React.useEffect(() => {
    const timer = setInterval(() => {
      const unparsedTask = localStorage.getItem("task");
      if (!unparsedTask) return;
      const task = JSON.parse(unparsedTask);
      const end = new Date(task.deadline);
      setDeadline(end);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  if (!deadline) return null;

  return (
    <ReactCountdown
      daysInHours={true}
      date={deadline.getTime()}
      renderer={renderer}
    />
  );
};

export function Progress() {
  const [progress, setProgress] = React.useState(0);
  const [task, setTask] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      const unparsedTask = localStorage.getItem("task");
      if (!unparsedTask) return;
      const task = JSON.parse(unparsedTask);
      const start = new Date(task.created);
      const end = new Date(task.deadline);
      const today = new Date();
      var q = Math.abs(today - start);
      var d = Math.abs(end - start);
      const rounded = (q / d) * 100;
      const value = Math.min(Math.max(rounded, 0), 100);

      setProgress(value);
      setTask(task)
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <div style={{ fontFamily: 'Londrina Solid', paddingBottom: '1rem', fontSize: '2rem' }}>{task?.name}</div>
      <Countdown />
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
