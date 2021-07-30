import axios from 'axios';
import * as types from './types';

export const callCountryApi = (handleLoading) => {
    return async function (dispatch) {
        await fetch("http://localhost:8000/countries")
            .then((response) => {
                return response.json()
            }).then(function (data) {
                dispatch({
                    type: types.COUNTRY_DATA,
                    payload: data
                })
                handleLoading()
            })
            .catch(
                function (err) {
                    console.log(err, ' error')
                    handleLoading()
                }
            )
    }
}

export const getSelectedCountryAction = (id, handleLoading) => {
    return async function (dispatch) {
        await fetch(`http://localhost:8000/countries?rank=${id}`)
            .then((response) => {
                return response.json()
            }).then(function (data) {
                dispatch({
                    type: types.SELECTED_COUNTRY,
                    payload: data
                })
                handleLoading()
            })
            .catch(
                function (err) {
                    console.log(err, ' error')
                    handleLoading()
                }
            )
    }
}

export const busyInd = (flag) => dispatch => {
    dispatch({
        type: types.BUSY_IND,
        payload: flag
    })
}

export const showSnackBar = (flag, value) => dispatch => {
    dispatch({
        type: types.SET_SNACKBAR,
        payload: {
            open: flag,
            msg: value,
        }
    })
}

export const addNewEntry = (requestHead) => {
    return async function (dispatch) {
        await fetch("http://localhost:8000/countries", requestHead)
            .then((response) => {
                return response.json()
            }).then(function (data) {
                dispatch({
                    type: types.ADD_NEW_COUNTRY,
                    payload: data
                })
            })
            .catch(
                function (err) {
                    console.log(err, ' error')
                }
            )
    }
}