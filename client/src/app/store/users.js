import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utility/generateAuthError";
import history from "../utility/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoad: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoad: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoad = true;
            state.isLoading = false;
        },
        usersRequestedFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFiled: (state, action) => {
            state.error = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoad = false;
        },
        updateUserSuccess: (state, action) => {
            const indexUser = state.entities.findIndex(
                (user) => user._id === action.payload._id
            );
            state.entities[indexUser] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;

const {
    usersRequested,
    usersReceived,
    usersRequestedFiled,
    authRequestSuccess,
    authRequestFiled,
    userLoggedOut,
    updateUserSuccess
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateFail = createAction("users/userUpdateFail");
const userUpdateRequest = createAction("users/userUpdateRequest");

export const logIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.logIn({ email, password });
            localStorageService.setTokens(data);
            dispatch(
                authRequestSuccess({
                    userId: data.userId
                })
            );

            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFiled(errorMessage));
            } else {
                dispatch(authRequestFiled(error.message));
            }
        }
    };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(
            authRequestSuccess({
                userId: data.userId
            })
        );
        history.push("/users");
    } catch (error) {
        dispatch(authRequestFiled(error.message));
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

export const updateUserData = (payload) => async (dispatch) => {
    dispatch(userUpdateRequest());
    try {
        const { content } = await userService.updateUser(payload);
        dispatch(updateUserSuccess(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFail(error.message));
    }
};

export const updateUserDataBookmark = (payload) => async (dispatch) => {
    dispatch(userUpdateRequest());
    try {
        const { content } = await userService.updateUserBookmark(payload);
        dispatch(updateUserSuccess(content));
    } catch (error) {
        dispatch(userUpdateFail(error.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUsersLoadStatus = () => (state) => state.users.isLoading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoad;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find(
              (user) => user._id === state.users.auth.userId
          )
        : null;
};
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
