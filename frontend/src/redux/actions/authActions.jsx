import axios from "axios";
import swal from "sweetalert2";
import { API } from "../../components/Api";

const authActions = {
  newUser: (newUser) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(`${API}/user/signup`, newUser);
      if (!respuesta.data.success) {
        return respuesta.data;
      }
      dispatch({ type: "LOG_USER", payload: respuesta.data });
    };
  },
  loginWithGoogle: (response) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(`${API}/user/sign_google`, response);
      if (!respuesta.data.success) {
        swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Something happened. Try again",
          showConfirmButton: false,
          timer: 1500,
        });
        return false;
      } else {
        swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome to Mytinerary",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      dispatch({ type: "LOG_USER", payload: respuesta.data });
    };
  },
  loginUser: (user) => {
    return async (dispatch, getState) => {
      console.log(user);
      const respuesta = await axios.post(`${API}/user/signin`, user);
      console.log(respuesta);
      if (!respuesta.data.success) {
        return respuesta.data;
      }
      dispatch({ type: "LOG_USER", payload: respuesta.data });
    };
  },
  logoutUser: () => {
    return (dispatch, getState) => {
      dispatch({ type: "LOG_OUT_USER" });
    };
  },
  //logueo desde local storage
  logFromLS: (token) => {
    return async (dispatch, getState) => {
      try {
        const respuesta = await axios.post(
          `${API}/user/ls`,
          { token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({ type: "LOG_USER", payload: respuesta.data });
      } catch (err) {
        if (err.response.status === 401) {
          alert("Access denied");
          localStorage.clear();
          return "/";
        }
      }
    };
  },
};

export default authActions;
