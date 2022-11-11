import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/rooms");
  },
  getAllForUser(userId) {
    return apiClient.get("/rooms/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/rooms/${id}`);
  },
  create(data) {
    return apiClient.post("/rooms", data);
  },
  update(id, data) {
    return apiClient.put(`/rooms/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/rooms/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/rooms`);
  },
  findByTitle(title) {
    return apiClient.get(`/rooms?title=${title}`);
  }
}