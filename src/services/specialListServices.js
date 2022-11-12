import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get(`/special_lists`);
  },
  get(courseId,id) {
    return apiClient.get(`/special_lists/${courseId}/${id}`);
  },
  create(data) {
    return apiClient.post(`/special_lists`, data);
  },
  update(courseId,id, data) {
    return apiClient.put(`/special_lists/${courseId}/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/special_lists/${id}`);
  }
}