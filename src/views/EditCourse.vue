<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Course Edit</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="course.courseNumber"
          id="name"
          :counter="50"
          label="CourseNumber"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="course.level"
          id="name"
          :counter="50"
          label="Level"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.Hours"
          id="name"
          :counter="50"
          label="Hours"
          required
        ></v-text-field>

        <v-text-field
          v-model="course.name"
          id="name"
          :counter="50"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.description"
          id="description"
          :counter="50"
          label="Description"
          required
        >
        </v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateCourse()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import CourseServices from "../services/courseServices";

export default {
  name: "edit-course",
  props: ["id"],
  data() {
    return {
      valid: false,
      course: {},
      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveCourse() {
      CourseServices.get(this.id)
        .then((response) => {
          this.course = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    updateCourse() {
      var data = {
        courseNumber: this.course.courseNumber,
        Hours: this.course.Hours,
        level: this.course.level,
        name: this.course.name,
        description: this.course.description,
      };
      CourseServices.update(this.id, data)
        .then((response) => {
          this.course.id = response.data.id;
          this.$router.push({ name: "Courseview" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "Courseview" });
    },
  },
  mounted() {
    this.retrieveCourse();
  },
};
</script>
<style></style>
