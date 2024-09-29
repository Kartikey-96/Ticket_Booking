import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../api/Api";
import { useNavigate } from "react-router-dom";

function TokenManager() {
  const navigate = useNavigate();
  useEffect(() => {
    const refreshAccessToken = async () => {
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        try {
          const response = await axios.post(`${BASE_URL}refresh/`, {
            refresh_token,
          });
          if (response?.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("access_token_exp");
            localStorage.removeItem("refresh_token");
            navigate("/login", { replace: true });
          }
          if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem(
              "access_token_exp",
              response.data.access_token_exp
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const tokenExpirationTime = parseInt(
      localStorage.getItem("access_token_exp")
    );
    const currentTime = Math.floor(Date.now() / 1000);
    const timeToRefresh = tokenExpirationTime - currentTime;
    let refreshTimer = undefined;
    if (timeToRefresh > 0) {
      refreshTimer = setInterval(
        refreshAccessToken,
        timeToRefresh * 1000 - 300 * 1000
      );
    }
    return () => {
      clearInterval(refreshTimer);
    };
  }, []);

  return null;
}

export default TokenManager;
