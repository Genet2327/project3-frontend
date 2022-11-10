import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/semesters");
  },
  getAllForUser(userId) {
    return apiClient.get("/semesters/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/semesters/${id}`);
  },
  create(data) {
    console.log("Creta fro servis");
    return apiClient.post("/semesters", data);
  },
  update(id, data) {
    return apiClient.put(`/semesters/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/semesters/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/semesters`);
  },
  findByTitle(title) {
    return apiClient.get(`/semesters?title=${title}`);
  }
}