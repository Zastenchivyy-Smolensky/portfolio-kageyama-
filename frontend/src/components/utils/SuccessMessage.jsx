import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SuccessMessage({ open, setOpen, severity, message }) {
  const handleColoseSuccessMessage = (e, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleColoseSuccessMessage}
      >
        <Alert onClose={handleColoseSuccessMessage} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SuccessMessage;
