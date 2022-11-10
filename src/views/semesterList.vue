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
          :items="semesters"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <v-icon small class="mx-4" @click="editsemester(item)">
                mdi-pencil
              </v-icon>
              <!-- <v-icon small class="mx-4" @click="viewsemester(item)">
                mdi-format-list-bulleted-type
              </v-icon> -->
              <v-icon small class="mx-4" @click="deletesemester(item)">
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
import semesterServices from "../services/semesterServices";

import Utils from "@/config/utils.js";

export default {
  name: "semesters-list",
  data() {
    return {
      search: "",
      semesters: [],
      currentsemester: null,
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
    this.retrievesemester();
  },
  methods: {
    editsemester(semester) {
      this.$router.push({ name: "EditSemester", params: { id: semester.id } });
    },
    viewsemester(semester) {
      this.$router.push({ name: "SemesterList", params: { id: semester.id } });
    },

    deletesemester(semester) {
      semesterServices.delete(semester.id)
        .then(() => {
          this.retrievesemester();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrievesemester() {
      semesterServices.getAll()
        .then((response) => {
          this.semesters = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrievesemester();
      this.currentCourse = null;
      this.currentIndex = -1;
    },
    setActivesemester(semester, index) {
      this.currentsemester = semester;
      this.currentIndex = semester ? index : -1;
    },
    removeAllsemesters() {
      semesterServices.deleteAll()
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
