import http from "../http-common";
class CourseDataService {
  getAll() {
    return http.get("/schedule-t6/course");
  }
  get(id) {
    return http.get(`/schedule-t6/id/${id}`);
  }
  create(data) {
    return http.post("/schedule-t6", data);
  }
  update(id, data) {
    return http.put(`/schedule-t6/${id}`, data);
  }
  delete(id) {
    return http.delete(`/schedule-t6/${id}`);
  }
  deleteAll() {
    return http.delete(`/schedule-t6`);
  }
}
export default new CourseDataService();