import axiosInstance from "./axios.config";

//***************************** */ SERVICES **********************************

// DELETE user -- ADMIN
export const deleteProfileByIdService = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Please log in again.");
    await axiosInstance.delete(`/admin/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updatedResponse = await axiosInstance.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return updatedResponse.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

// UPDATE user -- ADMIN
export const updateProfileByIdService = async ({ id, first_name, last_name, email }) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Please log in again.");
    await axiosInstance.put(`/admin/user/${id}`, { first_name, last_name, email }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updatedResponse = await axiosInstance.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return updatedResponse.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

// READ userS -- ADMIN
export const fetchAllProfilesService = async ({ keyword = "", page = 1 }) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Please log in again.");
    const response = await axiosInstance.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
      params: { keyword, page },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

// CREATE user -- ADMIN
export const addNewUserService = async ({ first_name, last_name, email, password, role }) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Please log in again.");
    await axiosInstance.post("/admin/register", { first_name, last_name, email, password, role }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updatedResponse = await axiosInstance.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return updatedResponse.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};
