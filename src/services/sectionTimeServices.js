import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/section_times");
  },
  getAllForUser(userId) {
    return apiClient.get("/sectionTimes/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/section_times/${id}`);
  },
  create(data) {
    return apiClient.post("/section_times", data);
  },
  update(id, data) {
    return apiClient.put(`/section_times/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/section_times/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/section_times`);
  },
  findByTitle(title) {
    return apiClient.get(`/section_times?title=${title}`);
  }
}