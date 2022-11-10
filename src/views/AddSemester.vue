<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Semester Add</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>

      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="semester.name"
          id="name"
          :counter="50"
          label="Name"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="semester.startDate"
          id="startDate"
          :counter="50"
          label="StartDate"
          required
        ></v-text-field>
        <v-text-field
          v-model="semester.endDate"
          id="endDate"
          :counter="50"
          label="EndDate"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveSemester()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import SemesterServices from "../services/semesterServices";
import Utils from "@/config/utils.js";

export default {
  name: "add-semester",
  data() {
    return {
      valid: false,
      user: {},
      semester: {
        id: null,
        name: "",
        startDate: "",
        endDate: "",
      },
      message: "Enter data and click save",
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
  },
  methods: {
    saveSemester() {
      var data = {
        name: this.semester.name,
        startDate: this.semester.startDate,
        endDate: this.semester.endDate,
      };

      console.log(data);
      SemesterServices.create(data)
        .then((response) => {
          this.semester.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "semesterList" });
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "semesterList" });
    },
  },
};
</script>
<style></style>
