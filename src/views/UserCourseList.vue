<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Hello!</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br /><br />
      <v-card>
        <v-card-title>
          Courses

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="courses"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <!-- <v-icon small class="mx-4" @click="ADDCourseForUser(item)">
                  mdi-pencil
                </v-icon> -->

              <v-icon small class="mx-4" @click="deleteCourse(item)">
                mdi-trash-can
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import CourseServices from "../services/courseServices";
import SpecialListServices from "../services/specialListServices";

import Utils from "@/config/utils.js";

export default {
  name: "courses-list",
  props: ["id"],
  data() {
    return {
      search: "",
      courses: [],
      specialList: [],
      currentCourse: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit or Delete Courses",
      headers: [
        { text: "CourseNumber", value: "courseNumber" },
        { text: "Name", value: "name" },
        { text: "Level", value: "level" },
        { text: "Houre", value: "houre" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveCourses();
  },
  methods: {
    deleteCourse(course) {
      SpecialListServices.getAll()
        .then((response) => {
          let a = response.data;
          let special = a.find(
            (b) => b.userId == this.id && b.courseId == course.id
          );
          SpecialListServices.delete(special.id)
            .then(() => {
              this.retrieveCourses();
              this.$router.push({ name: "UserCourseList", params: { id: 1 } });
              this.$router.go();
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    async retrieveCourses() {
      await SpecialListServices.getAll()
        .then((response) => {
          let a = response.data;
          this.specialList = a.filter((b) => b.userId == this.id);
          this.specialList.forEach((e) => {
            this.createSpcialList(e.courseId);
          });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    async createSpcialList(courseId) {
      await CourseServices.get(courseId)
        .then((response) => {
          this.courses.push(response.data);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    refreshList() {
      this.retrieveCourses();
      this.currentCourse = null;
      this.currentIndex = -1;
    },
    setActiveCourse(course, index) {
      this.currentCourse = course;
      this.currentIndex = course ? index : -1;
    },
    removeAllCourses() {
      CourseServices.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
