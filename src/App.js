import { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { callCountryApi, busyInd } from './ReduxStore/Actions/testAction';
import ListComponent from './Component/ListComponent';
import AppBar from './Component/Header/AppBar';
import CardComponent from './Component/CardComponent';
import SnackBar from './Component/Dialogs/SnackBar';
import BusyDialog from './Component/Dialogs/BusyDialog';

function App(props) {

  useEffect(() => {
    props.busyInd(true)
    props.callCountryApi(handleLoading)
  }, [])

  const handleLoading = () => {
    props.busyInd(false)
  }


  return (
    <div id="root" className="App">
      <AppBar />
      <br />
      <ListComponent />
      <CardComponent />
      <SnackBar />
      <BusyDialog />
    </div>
  );
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { callCountryApi, busyInd })(App);
