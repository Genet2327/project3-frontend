import apiClient from "@/services/services.js";

export default {
  getAllSections(courseId) {
    return apiClient.get(`/course/${courseId}/sections`);
  },
  getSection(courseId,id) {
    return apiClient.get(`/course/${courseId}/sections/${id}`);
  },
  createSection(courseId,data) {
    return apiClient.post(`/course/${courseId}/sections`, data);
  },
  updateSection(courseId,id, data) {
    return apiClient.put(`/course/${courseId}/sections/${id}`, data);
  },
  deleteSection(courseId,id) {
    return apiClient.delete(`/course/${courseId}/sections/${id}`);
  }
}