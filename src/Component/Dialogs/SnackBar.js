import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { showSnackBar } from '../../ReduxStore/Actions/testAction';

class SnackBarComponent extends Component {

    render() {
        const { open, msg } = this.props;
        return (
            <Snackbar open={open}
                autoHideDuration={6000}
                onClose={() => this.props.showSnackBar(false, '')}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{msg}</span>}
            />
        );
    };
}

const mapStateToProps = state => ({
    open: state.testReducer.snackFlag,
    msg: state.testReducer.snackBar,
});


export default connect(mapStateToProps, { showSnackBar })(SnackBarComponent);
