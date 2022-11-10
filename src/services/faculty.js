import apiClient from "@/services/services.js";

class FacultyDataService {
  create(data) {
    return http.post("/schedule-t6/faculty"), data;
  }
  update(id, data) {
    return http.put(`/schedule-t6/faculty/${id}`, data);
  }
  getAll() {
    return http.get("/schedule-t6/faculty");
  }
  getName(name) {
    return http.get(`/schedule-t6/faculty/name/${name}`);
  }
  delete(id) {
    return http.delete(`/schedule-t6/faculty/${id}`);
  }
}

export default new FacultyDataService();
