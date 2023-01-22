import axios from "axios";

 const instanceHTTPAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const authService = {
    register: async ({ email, password }) => {
        const { data } = await instanceHTTPAuth.post("accounts:signUp?", {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    }
};

export default authService;
