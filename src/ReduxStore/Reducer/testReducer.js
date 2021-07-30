import { generateUID } from '../../Lib/utils';
import * as types from '../Actions/types';

const initialState = {
    countryData: [],
    selectedCountryVal: [],
    snackFlag: false,
    snackBar: ''
}

const callCountryApi = (state, action) => {
    return {
        ...state,
        countryData: generateUID(action.payload),
    }
}

const getSelectedCountryAction = (state, action) => {
    return {
        ...state,
        selectedCountryVal: action.payload,
    }
}

const busyInd = (state, action) => {
    return {
        ...state,
        loadingFlag: action.payload,
    }
}

const showSnackBar = (state, action) => {
    return {
        ...state,
        snackFlag: action.payload.open,
        snackBar: action.payload.msg,
    }
}

const addNewEntry = (state, action) => {
    return {
        ...state,
        countryData: action.payload,
    }
}

const reducerFunctions = (state = initialState, action) => {
    switch (action.type) {
        case types.COUNTRY_DATA: return callCountryApi(state, action);
        case types.SELECTED_COUNTRY: return getSelectedCountryAction(state, action);
        case types.SET_SNACKBAR: return showSnackBar(state, action);
        case types.ADD_NEW_COUNTRY: return addNewEntry(state, action);
        case types.BUSY_IND: return busyInd(state, action)
        default: return state;
    }
}

export default reducerFunctions;