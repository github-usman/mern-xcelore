import axiosInstance from "./axios.config";

export const loginService = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/user/login", { email, password });
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", user.role);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

export const fetchProfileService = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Please log in again.");
    const response = await axiosInstance.get("/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

export const userRegisterService = async ({ first_name, last_name, email, password }) => {
  try {
    const response = await axiosInstance.post("/user/register", { first_name, last_name, email, password });
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", user.role);
    return { user };
  } catch (error) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

export const deleteProfileService = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Please log in again.");
    await axiosInstance.delete("/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    return null;
  } catch (error) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

export const userUpdateProfileService = async ({ first_name, last_name, email }) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Please log in again.");
    await axiosInstance.put("/user/me", { first_name, last_name, email }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const response = await axiosInstance.get("/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};
