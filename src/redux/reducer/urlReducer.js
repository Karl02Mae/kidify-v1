import * as actionTypes from '../types';

const initialState = {
    videoUrl: "",
    error: null,
}

function urlReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_VIDEOURL:
            return {
                videoUrl: action.payload,
                error: null,
            };
        default:
            return {
                ...state,
            };
    }
}

export default urlReducer;