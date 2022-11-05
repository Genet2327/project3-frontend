<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Section Edit</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <h4>Schedule: {{ courseId }} Section: {{ sectionId }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="section.title"
          id="title"
          :counter="50"
          label="Title"
          required
        ></v-text-field>
        <v-text-field
          v-model="section.number"
          id="description"
          :counter="50"
          label="number"
          required
        >
        </v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveSection()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import SectionServices from "../services/sectionServices";

export default {
  name: "edit-section",
  props: ["courseId", "sectionId"],
  data() {
    return {
      valid: false,
      section: {},
      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveSection() {
      SectionServices.getSection(this.courseId, this.sectionId)
        .then((response) => {
          this.section = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    saveSection() {
      var data = {
        title: this.section.title,
        number: this.section.number,
        courseId: this.section.courseId,
      };
      SectionServices.updateSection(
        this.section.courseId,
        this.section.id,
        data
      )
        .then((response) => {
          this.section.id = response.data.id;

          this.$router.push({
            name: "view",
            params: { id: this.section.courseId },
          });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({
        name: "view",
        params: { id: this.section.courseId },
      });
    },
  },
  mounted() {
    this.retrieveSection();
  },
};
</script>
<style></style>
