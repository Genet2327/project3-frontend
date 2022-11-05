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
          Semesters
          <v-btn
            class="mx-2"
            color="primary"
            exact
            :to="{ name: 'AddSemester' }"
            text
          >
            Add
          </v-btn>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="semisters"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <v-icon small class="mx-4" @click="editSemister(item)">
                mdi-pencil
              </v-icon>
              <!-- <v-icon small class="mx-4" @click="viewSemister(item)">
                mdi-format-list-bulleted-type
              </v-icon> -->
              <v-icon small class="mx-4" @click="deleteSemister(item)">
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
import SemisterServices from "../services/semisterServices";

import Utils from "@/config/utils.js";

export default {
  name: "semisters-list",
  data() {
    return {
      search: "",
      semisters: [],
      currentSemister: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit or Delete Semesters",
      headers: [
        { text: "Name", value: "name" },
        { text: "StartDate", value: "startDate" },
        { text: "EndDate", value: "endDate" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveSemister();
  },
  methods: {
    editSemister(semister) {
      this.$router.push({ name: "EditSemester", params: { id: semister.id } });
    },
    viewSemister(semister) {
      this.$router.push({ name: "SemesterList", params: { id: semister.id } });
    },

    deleteSemister(semister) {
      SemisterServices.delete(semister.id)
        .then(() => {
          this.retrieveSemister();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveSemister() {
      SemisterServices.getAll()
        .then((response) => {
          this.semisters = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveSemister();
      this.currentCourse = null;
      this.currentIndex = -1;
    },
    setActiveSemister(semister, index) {
      this.currentSemister = semister;
      this.currentIndex = semister ? index : -1;
    },
    removeAllSemisters() {
      SemisterServices.deleteAll()
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
