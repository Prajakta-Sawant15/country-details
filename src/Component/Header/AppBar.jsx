import { connect } from "react-redux";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NewCountryDialog from "../Dialogs/NewCountryDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppBarComponent(props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.spacingAppBar} position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            Country Ranking
          </Typography>
          <NewCountryDialog />
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dialogFlag: state.testReducer.dialogFlag,
  };
};

export default connect(mapStateToProps, {})(AppBarComponent);
