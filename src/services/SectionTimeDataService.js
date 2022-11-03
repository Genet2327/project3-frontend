
import http from "../http-common";
class SessionDataService {
  getAll() {
    return http.get("/schedule-t6/sectionTime");
  }
  get(id) {
    return http.get(`/schedule-t6/sectionTime/${id}`);
  }
  create(data) {
    return http.post("/schedule-t6/sectionTime", data);
  }
  update(id, data) {
    return http.put(`/schedule-t6/sectionTime/${id}`, data);
  }
  delete(id) {
    return http.delete(`/schedule-t6/sectionTime/${id}`);
  }
  deleteAll() {
    return http.delete(`/schedule-t6/sectionTime`);
  }
}
export default new SessionDataService();