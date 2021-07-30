import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import {
  showSnackBar,
  addNewEntry,
  callCountryApi,
  busyInd,
} from "../../ReduxStore/Actions/testAction";
import { idFunction } from "../../Lib/utils";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  contentMargin: {
    marginTop: "17px",
  },
  TextField: {
    marginTop: "0px",
  },
}));

function NewCountryDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [countryArray, setCountryArray] = useState([]);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorImgUpload, setErrorImgUpload] = useState(false);
  const [errorRank, setErrorRank] = useState(false);
  const [errorContinent, setErrorContinent] = useState(false);
  const [country, setCountry] = useState("");
  const [continentSelect, setContinent] = useState("");
  const [imgUpload, setImgUpload] = useState("");
  const [imgUploadPost, setImgUploadPost] = useState("");
  const [rankAdd, setRank] = useState("");

  useEffect(() => {
    handleClearState();
    if (props?.countryDataBind) {
      let continentArray = props.countryDataBind.map((item) => {
        return item.continent;
      });
      let updatedContinent = [...new Set(continentArray)];
      setCountryArray(updatedContinent);
    }
  }, [props.countryDataBind]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleClearState();
  };

  const handleCountryName = (e) => {
    setErrorCountry(false);
    let alphaReg = /^[a-zA-Z]+$/,
      enteredCountry = e.target.value;
    if (enteredCountry === "") {
      setCountry(enteredCountry);
    } else {
      if (alphaReg.test(enteredCountry)) {
        setCountry(enteredCountry);
      } else {
        setErrorCountry(true);
      }
    }
  };

  const handleClearState = () => {
    setErrorCountry(false);
    setErrorImgUpload(false);
    setErrorContinent(false);
    setErrorRank(false);
    setCountry("");
    setImgUpload("");
    setContinent("");
    setRank("");
  };

  const handleImgUpload = (e) => {
    setErrorImgUpload(false);
    let allowedType = ["image/png", "image/jpg"],
      filesize = Math.round(e.target.files[0].size / 1024);
    if (!allowedType.includes(e.target.files[0].type)) {
      setErrorImgUpload(true);
      setImgUpload("");
      props.showSnackBar(true, "Please select a file with jpg or png format");
    } else if (Number(filesize >= 4096)) {
      setErrorImgUpload(true);
      setImgUpload("");
      props.showSnackBar(true, "Please select a file less than 4mb");
    } else {
      setImgUpload(e.target.files.name);
      setImgUploadPost(e.target.files[0].name);
    }
  };

  const handleCountryLength = (e) => {
    handleCountryValidation(e.target.value);
  };

  const handleCountryValidation = (name, countArr) => {
    let errorFlag = false;
    if (name.length < 3) {
      props.showSnackBar(true, "Country name should be of minimum 3 character");
      setErrorCountry(true);
      errorFlag = true;
    } else if (name.length > 20) {
      props.showSnackBar(true, "Max character reached");
      errorFlag = true;
    }
    if (countArr && countArr.length > 0) {
      let checkFlag = countArr.find(
        (ele) => ele.name.toLowerCase() === country.toLowerCase()
      );
      if (checkFlag) {
        props.showSnackBar(true, "Country name already exists!");
        setErrorCountry(true);
        errorFlag = true;
      }
    }
    return errorFlag;
  };

  const handleRank = (e) => {
    let numRegEx = /^[0-9]+$/,
      enteredRank = e.target.value;
    setErrorRank(false);
    if (numRegEx.test(enteredRank)) {
      setRank(parseInt(enteredRank));
    } else if (!numRegEx.test(enteredRank)) {
      setErrorRank(true);
    }
    if (enteredRank === "") {
      setRank(enteredRank);
    }
  };

  const handleContinent = (e) => {
    setErrorContinent(false);
    setContinent(e.target.value);
  };

  const handleAddNewCountry = async () => {
    let checkCountry = handleCountryValidation(country, props.countryDataBind),
      checkRank = props.countryDataBind.find((ele) => ele.rank === rankAdd),
      emptyValCondition = false;
    if (checkRank) {
      props.showSnackBar(true, "Rank already exists!");
      setErrorRank(true);
    }
    if (
      country === "" ||
      rankAdd === "" ||
      imgUploadPost === "" ||
      continentSelect === ""
    ) {
      emptyValCondition = true;
      props.showSnackBar(true, "All the fields are manadatory!");
    }
    if (!checkCountry && !checkRank && !emptyValCondition) {
      let RequestHeader = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: country,
          continent: continentSelect,
          flag: imgUploadPost,
          rank: rankAdd,
          id: idFunction(2),
        }),
      };
      props.busyInd(true);
      await props.addNewEntry(RequestHeader);
      props.callCountryApi(handleLoading);
      setOpen(false);
      handleClearState();
    }
  };

  const handleLoading = () => {
    props.busyInd(false);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Add Country
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Add new Country
        </DialogTitle>
        <DialogContent>
          <Typography>Enter Country*</Typography>
          <TextField
            value={country}
            onChange={handleCountryName}
            autoFocus
            onBlur={handleCountryLength}
            margin="dense"
            variant="outlined"
            id="name"
            type="text"
            fullWidth
            inputProps={{ maxLength: 20 }}
            error={errorCountry}
          />

          <Typography className={classes.contentMargin}>
            Upload Image*
          </Typography>
          <TextField
            value={imgUpload}
            onChange={handleImgUpload}
            accept="image/*"
            name="myImage"
            type="file"
            margin="dense"
            variant="outlined"
            error={errorImgUpload}
          />

          <Typography className={classes.contentMargin}>
            Select Continent*
          </Typography>
          <Select
            value={continentSelect}
            onChange={handleContinent}
            id="country"
            variant="outlined"
            fullWidth
            margin="dense"
            error={errorContinent}
          >
            {countryArray.length > 0 ? (
              countryArray.map((countryName) => {
                return (
                  <MenuItem value={countryName} key={countryName}>
                    {countryName}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem>No Data Found</MenuItem>
            )}
          </Select>

          <Typography className={classes.contentMargin}>Enter Rank*</Typography>
          <TextField
            value={rankAdd}
            onChange={handleRank}
            margin="dense"
            variant="outlined"
            id="name"
            fullWidth
            error={errorRank}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewCountry} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    countryDataBind: state.testReducer.countryData,
  };
};

export default connect(mapStateToProps, {
  showSnackBar,
  addNewEntry,
  callCountryApi,
  busyInd,
})(NewCountryDialog);
