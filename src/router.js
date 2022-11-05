import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login.vue";

import CourseView from "./views/ViewCourse";
import CalanderApp from "./views/CalanderApp.vue";
import EditCourse from "./views/EditCourse.vue";
import courseView from "./views/CourseList.vue";
import AddCourse from "./views/AddCourse.vue";
import AddSection from "./views/AddSection.vue";
import EditSection from "./views/EditSection";

import SemesterList from "./views/semisterList.vue";
import AddSemester from "./views/AddSemester.vue";
import EditSemester from "./views/EditSemester.vue";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  linkExactActiveClass: "active",
  base:
    //    process.env.NODE_ENV === 'development'? "/" : "/tutorScheduling/", - for AWS
    process.env.NODE_ENV === "development" ? "/" : "/",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/Semisters",
      name: "SemisterList",
      component: SemesterList,
    },
    {
      path: "/add-semisters",
      name: "AddSemester",
      component: AddSemester,
    },
    {
      path: "/edit/:id",
      name: "EditSemester",
      component: EditSemester,
      props: true,
    },

    {
      path: "/calander",
      name: "Calander",
      component: CalanderApp,
    },
    {
      path: "/Courses",
      name: "Courseview",
      component: courseView,
    },
    {
      path: "/edit/:id",
      name: "EditCourse",
      component: EditCourse,
      props: true,
    },
    {
      path: "/Courseadd",
      name: "CourseAdd",
      component: AddCourse,
    },
    {
      path: "/view/:id",
      name: "viewCourse",
      component: CourseView,
      props: true,
    },
    {
      path: "/addSection/:courseId",
      name: "addSection",
      component: AddSection,
      props: true,
    },
    {
      path: "/editSection/:courseId/:SectionId",
      name: "editSection",
      component: EditSection,
      props: true,
    },
  ],
});

export default router;