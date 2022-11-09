<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Course Add</v-toolbar-title>
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
          v-model="course.houre"
          id="name"
          :counter="50"
          label="Houre"
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
          @click="saveCourse()"
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
import Utils from "@/config/utils.js";

export default {
  name: "add-course",
  data() {
    return {
      valid: false,
      user: {},
      course: {
        id: null,
        courseNumber: "",
        houre: "",
        name: "",
        level: "",
        description: "",
      },
      message: "Enter data and click save",
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
  },
  methods: {
    saveCourse() {
      var data = {
        courseNumber: this.course.courseNumber,
        houre: this.course.houre,
        level: this.course.level,
        name: this.course.name,
        description: this.course.description,
        userId: this.user.userId,
      };

      console.log(data);
      CourseServices.create(data)
        .then((response) => {
          this.course.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "courses" });
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
    },
    cancel() {
      console.log("add tetstststts");

      this.$router.push({ name: "courses" });
    },
  },
};
</script>
<style></style>
