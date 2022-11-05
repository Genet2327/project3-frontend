import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/special_lists");
  },
  getAllForUser(userId) {
    return apiClient.get("/special_lists/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/special_lists/${id}`);
  },
  create(data) {
    console.log("Creta fro servis");
    return apiClient.post("/special_lists", data);
  },
  update(id, data) {
    return apiClient.put(`/special_lists/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/special_lists/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/special_lists`);
  },
  findByTitle(title) {
    return apiClient.get(`/special_lists?title=${title}`);
  }
}