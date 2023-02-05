import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";
import { isOutDate } from "../utility/isOutDate";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },

    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestedFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestedFiled } =
    actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutDate(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.fetchAll();
            dispatch(qualitiesReceived(content));
        } catch (error) {
            dispatch(qualitiesRequestedFiled(error.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;

export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;

export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        // console.log(qualitiesIds);
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of state.qualities.entities) {
                // console.log("quality", quality._id);
                // console.log("qual", qualId);
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    return [];
};

export default qualitiesReducer;
