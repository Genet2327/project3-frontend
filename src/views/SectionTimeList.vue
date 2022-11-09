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
          SectionTimes
          <v-btn
            class="mx-2"
            color="success"
            exact
            :to="{ name: 'AddSectionTime' }"
            text
          >
            Add
          </v-btn>

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
          :items="sectionTimes"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
             
              <v-icon small class="mx-4" @click="editSectionTime(item)">
                mdi-pencil
              </v-icon>
              <v-icon small class="mx-4" @click="viewSectionTime(item)">
                mdi-format-list-bulleted-type
              </v-icon>
              <v-icon small class="mx-4" @click="deleteSectionTime(item)">
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
import SectionTimeServices from "../services/sectionTimeServices";

import Utils from "@/config/utils.js";

export default {
  name: "sectionTimes-list",
  data() {
    return {
      search: "",
      sectionTimes: [],
      currentSectionTime: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit or Delete SectionTimes",
      headers: [
       
        { text: "Inst_methode", value: "inst_methode" },
        { text: "Date_of_weak", value: "date_of_weak" },
        { text: "StartDate", value: "startDate" },
        { text: "EndDate", value: "endDate" },
        { text: "StartTime", value: "startTime" },
        { text: "EndTime", value: "endTime" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveSectionTimes();
  },
  methods: {
    editSectionTime(sectionTime) {
      this.$router.push({
        name: "EditSectionTime",
        params: { id: sectionTime.id },
      });
    },
    viewSectionTime(sectionTime) {
      this.$router.push({
        name: "viewSectionTime",
        params: { id: sectionTime.id },
      });
    },

    deleteSectionTime(sectionTime) {
      SectionTimeServices.delete(sectionTime.id)
        .then(() => {
          this.retrieveSectionTimes();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveSectionTimes() {
      SectionTimeServices.getAll()
        .then((response) => {
          this.sectionTimes = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveSectionTimes();
      this.currentSectionTime = null;
      this.currentIndex = -1;
    },
    setActiveSectionTime(sectionTime, index) {
      this.currentSectionTime = sectionTime;
      this.currentIndex = sectionTime ? index : -1;
    },
    removeAllSectionTimes() {
      SectionTimeServices.deleteAll()
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
