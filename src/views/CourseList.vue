<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Hello!</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br><br>
        <v-card>
          <v-card-title>
            Courses
            <v-btn v-show="user.role == 'Admin'" class="mx-2" color="success"  exact :to="{ name: 'CourseAdd'}" text> Add </v-btn>

            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table :headers="headers" :search="search" :items="courses" :items-per-page="50">
            <template v-slot:[`item.actions`]="{ item }">
              <div>
                <!-- <v-icon small class="mx-4" @click="ADDCourseForUser(item)">
                  mdi-pencil
                </v-icon> -->
                <v-icon v-show="user.role == 'Admin'" small class="mx-4" @click="editCourse(item)">
                  mdi-account
                </v-icon>
                <v-icon v-show="user.role == 'Admin'" small class="mx-4" @click="editCourse(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="viewCourse(item)">
                  mdi-format-list-bulleted-type
                </v-icon>
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
  import specialListServices from "../services/special_listServices";

  import Utils from '@/config/utils.js'
  
  export default {
    name: "courses-list",
    data() {
      return {
        search: '',
        courses: [],
        currentCourse: null,
        currentIndex: -1,
        name: "",
        user: {},
        message: "Search, Edit or Delete Courses",
        headers:  [
          { text: 'CourseNumber', value: 'courseNumber' },
          { text: 'Name', value: 'name' },
          { text: 'Level', value: 'level' },
          { text: 'Houre', value: 'houre' },
          { text: 'Description', value: 'description' },
          { text: 'Actions', value: 'actions', sortable: false },],
      };
    },
    mounted() {
      this.user = Utils.getStore('user');
      this.retrieveCourses();
    },
    methods: {
      editCourse(course) {
        this.$router.push({ name: 'EditCourse', params: { id: course.id } });
      },
      viewCourse(course) {
        this.$router.push({ name: 'viewCourse', params: { id: course.id } });
      },
      ADDCourseForUser(course) {
        var data = {
          userId: this.user.id,
          courseId: course.id
        };
        specialListServices.create(data)
          .then(response => {
            this.course.id = response.data.id;
            console.log("add " + response.data);
            this.$router.push({ name: 'Courseview' });
          })
          .catch(e => {
            console.log("add Eroro" + e.response.data.message);
            this.message = e.response.data.message;
          });
      },
      deleteCourse(course) {
        CourseServices.delete(course.id)
          .then(() => {
            this.retrieveCourses()
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      retrieveCourses() {
        CourseServices.getAll()
          .then(response => {
            this.courses = response.data;
          })
          .catch(e => {
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
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
  
    }
  };
  </script>