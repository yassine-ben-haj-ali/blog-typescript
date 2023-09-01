import axios from "axios";
import store from "../store";
import { fetchPosts } from "../slices/postSlice";

const customRequest = axios.create({
    baseURL: 'http://localhost:8800/api/',
});

customRequest.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("token");
    store.dispatch(fetchPosts());

    //checking if accessToken exists
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});

customRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        //extracting response and config objects
        const { response, config } = error;
        //checking if error is Aunothorized error
        if (response.status === 403) {

            //if refresh token exists in local storage proceed
            try {
                //try refreshing token
                const data = await customRequest.get('auth/refresh', { withCredentials: true })
                let { access_token } = data.data;
                if (access_token) {
                    //if request is successiful and token exists in response data
                    //store it in local storage
                    localStorage.setItem("token", access_token);
                    //with new token retry original request
                    customRequest.defaults.headers.common["Authorization"] = `Bearer ${access_token}`
                    return customRequest(config);
                }
            } catch (e) {
                console.log(e);
            }
        }

        //clear local storage and log user out
        await logout();
        return error;
    }
);

const logout = async () => {
    //handle logout
    await customRequest.get("auth/logout", { withCredentials: true })
    localStorage.removeItem("token");
};


export { customRequest, logout };







