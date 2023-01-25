import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import { isOutDate } from "../utility/isOutDate";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestedFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;

const { professionsRequested, professionsReceived, professionsRequestedFiled } =
    actions;

export const loadProfessionList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutDate(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsReceived(content));
        } catch (error) {
            dispatch(professionsRequestedFiled(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export const getProfessionsByIds = (professionsIds) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find(
            (prof) => prof._id === professionsIds
        );
    }
};

export default professionsReducer;
