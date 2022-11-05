import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/courses");
  },
  getAllForUser(userId) {
    return apiClient.get("/courses/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/courses/${id}`);
  },
  create(data) {
    console.log("Creta fro servis");
    return apiClient.post("/courses", data);
  },
  update(id, data) {
    return apiClient.put(`/courses/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/courses/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/courses`);
  },
  findByTitle(title) {
    return apiClient.get(`/courses?title=${title}`);
  }
}