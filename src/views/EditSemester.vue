<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Semester Edit</v-toolbar-title>
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
          @click="updateSemester()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import SemesterServices from "../services/semisterServices";

export default {
  name: "edit-semester",
  props: ["id"],
  data() {
    return {
      valid: false,
      semester: {},
      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveSemester() {
      SemesterServices.get(this.id)
        .then((response) => {
          this.semester = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    updateSemester() {
      var data = {
        name: this.semester.name,
        startDate: this.semester.startDate,
        endDate: this.semester.endDate,
      };
      SemesterServices.update(this.id, data)
        .then((response) => {
          this.semester.id = response.data.id;
          this.$router.push({ name: "SemisterList" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "SemisterList" });
    },
  },
  mounted() {
    this.retrieveSemester();
  },
};
</script>
<style></style>
