import http from "../http-common";
class SessionDataService {
  getAll() {
    return http.get("/schedule-t6/section");
  }
  get(id) {
    return http.get(`/schedule-t6/section/${id}`);
  }
  create(data) {
    return http.post("/schedule-t6/section", data);
  }
  update(id, data) {
    return http.put(`/schedule-t6/section/${id}`, data);
  }
  delete(id) {
    return http.delete(`/schedule-t6/section/${id}`);
  }
  deleteAll() {
    return http.delete(`/schedule-t6/section/`);
  }
}
export default new SessionDataService();