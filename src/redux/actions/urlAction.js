import * as actionTypes from '../types';

export const setVideoUrl = (url) => async (dispatch) => {
    try {
        await dispatch({ type: actionTypes.SET_VIDEOURL, payload: url });
    } catch (err) {
        await dispatch({ type: actionTypes.ON_ERROR, payload: err });
    }
};