import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLoggedIn: false
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestedFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = { ...action.payload, isLoggedIn: true };
        },
        authRequestFail: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;

const {
    usersRequested,
    usersReceived,
    usersRequestedFiled,
    authRequestSuccess,
    authRequestFail
} = actions;

const authRequested = createAction("users/authRequested");
export const signUp =
    ({ email, password, ...rest }) =>
        async (dispatch) => {
            dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({
                userId: data.localId
            }));
        } catch (error) {
            dispatch(authRequestFail(error.message));
        }
    };

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestedFiled(error.message));
    }
};

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === userId);
    }
};

export const getUsersList = () => (state) => state.users.entities;

export default usersReducer;
