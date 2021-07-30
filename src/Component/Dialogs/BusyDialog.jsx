import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { showSnackBar } from "../../ReduxStore/Actions/testAction";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function SimpleBackdrop(props) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

const mapStateToProps = (state) => ({
  open: state.testReducer.loadingFlag,
});

export default connect(mapStateToProps, { showSnackBar })(SimpleBackdrop);
