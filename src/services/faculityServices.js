import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/faculitys");
  },
  getAllForUser(userId) {
    return apiClient.get("/faculitys/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/faculitys/${id}`);
  },
  create(data) {
    return apiClient.post("/faculitys", data);
  },
  update(id, data) {
    return apiClient.put(`/faculitys/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/faculitys/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/faculitys`);
  },
  findByTitle(title) {
    return apiClient.get(`/faculitys?title=${title}`);
  }
}