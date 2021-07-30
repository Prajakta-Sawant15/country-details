import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  getSelectedCountryAction,
  busyInd,
} from "../ReduxStore/Actions/testAction";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  selectWidth: {
    width: "160px",
  },
  typoPlacement: {
    float: "right",
  },
}));

function ListComponent(props) {
  const classes = useStyles();
  const [selectedCountry, setSeletedCountry] = React.useState([]);
  const [countryArray, setCountryArray] = React.useState([]);

  useEffect(() => {
    if (props.countryDataBind) {
      setCountryArray(props.countryDataBind);
    }
  }, [props.countryDataBind]);

  const handleCountrySelection = (e) => {
    let selectedVal = e.target.value;
    setSeletedCountry(e.target.value);
    props.busyInd(true);
    props.getSelectedCountryAction(parseInt(selectedVal), handleLoading);
  };

  const handleLoading = () => {
    props.busyInd(false);
  };

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item lg={2} sm={12} md={4} xs={12}>
          <Typography className={classes.typoPlacement}>
            Select Country:
          </Typography>
        </Grid>
        <Grid item lg={2} sm={12} md={4} xs={12}>
          <Select
            id="country"
            onChange={handleCountrySelection}
            value={selectedCountry}
            className={classes.selectWidth}
            variant="outlined"
            margin="dense"
          >
            {countryArray.length > 0 ? (
              countryArray.map((countryName) => {
                return (
                  <MenuItem value={countryName.rank} key={countryName.id}>
                    {countryName.name}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem>No Data Found</MenuItem>
            )}
          </Select>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    countryDataBind: state.testReducer.countryData,
  };
};

export default connect(mapStateToProps, { getSelectedCountryAction, busyInd })(
  ListComponent
);
