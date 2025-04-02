import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL, // Access the backend URL
  withCredentials: true, // Ensure cookies are sent with every request
});

// Response interceptor to handle 401 errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if it's a 401, not a retry, and not the refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;

      try {
        // console.log("Attempting token refresh...");
        const refreshResponse = await api.post("/auth/refresh");

        if (refreshResponse.status === 200) {
          // console.log("Token refreshed successfully:", refreshResponse.data);
          return api(originalRequest); // Retry original request with new token
        }
      } catch (refreshError: any) {
        console.error("Token refresh failed:", refreshError);

        // If refresh fails with 401/403, assume logout is needed
        if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
          // console.log("Refresh token invalid or expired, forcing logout...");
          // Trigger a global logout event or redirect
          window.dispatchEvent(new Event("forceLogout"));
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;