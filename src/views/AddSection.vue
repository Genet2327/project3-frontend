<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Section Edit</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br>
        <h4>{{ message }}</h4>
        <br>
        <h4>Tutorial: {{ courseId }}</h4>
        <br>
        <v-form ref="form" v-model="valid" lazy validation>
          <v-text-field v-model="section.title" id="title" :counter="50" label="Title" required></v-text-field>
          <v-text-field v-model="section.number" id="description" :counter="50" label="Number" required>
          </v-text-field>
  
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="saveSection()">
            Save
          </v-btn>
  
          <v-btn color="error" class="mr-4" @click="cancel()">
            Cancel
          </v-btn>
        </v-form>
      </v-container>
    </div>
  </template>
  
  <script>
  import SectionServices from "../services/sectionServices";
  export default {
    name: "add-section",
    props: ['courseId'],
    data() {
      return {
        valid: true,
        section: {
          id: null,
          title: "",
          number: "",
          published: false
        },
        message: "Enter data and click save"
      };
    },
    methods: {
      saveSection() {
        var data = {
          title: this.section.title,
          number: this.section.number,
          courseId: this.courseId
        };
        SectionServices.createSection(this.courseId, data)
          .then(response => {
            this.section.id = response.data.id;
  
            this.$router.push({ name: 'viewCourse', params: { id: this.courseId } });
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      cancel() {
        this.$router.push({ name: 'viewCourse', params: { id: this.courseId } });
      }
    }
  }
  
  </script>
  <style>
  
  </style>