import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "30px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

function CardComponent(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item lg={3} sm={12} md={4} xs={12}>
          {props.selectedCountryVal.length === 1 &&
            props.selectedCountryVal.map((val) => {
              return (
                <Card className={classes.root}>
                  <CardHeader
                    title={val.name}
                    subheader={`Rank: ${val.rank}`}
                  />
                  <CardMedia
                    className={classes.media}
                    image={val.flag}
                    title="Country Img"
                  />
                </Card>
              );
            })}
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedCountryVal: state.testReducer.selectedCountryVal,
  };
};

export default connect(mapStateToProps, {})(CardComponent);
