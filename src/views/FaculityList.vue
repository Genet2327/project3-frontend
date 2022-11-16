<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Faculity!</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br /><br />
      <v-card>
        <v-card-title>
          Faculitys
          <v-btn
            v-show="user.role == 'Admin'"
            class="mx-2"
            color="success"
            exact
            :to="{ name: 'AddFaculity' }"
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
          :items="faculitys"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <!-- <v-icon small class="mx-4" @click="ADDFaculityForUser(item)">
                  mdi-pencil
                </v-icon> -->

              <v-icon
                v-show="user.role == 'Admin'"
                small
                class="mx-4"
                @click="editFaculity(item)"
              >
                mdi-pencil
              </v-icon>
              <!-- <v-icon small class="mx-4" @click="viewFaculity(item)">
                mdi-format-list-bulleted-type
              </v-icon> -->
              <v-icon small class="mx-4" @click="deleteFaculity(item)">
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
import FaculityServices from "../services/faculityServices";

import Utils from "@/config/utils.js";

export default {
  name: "faculitys-list",
  data() {
    return {
      search: "",
      faculitys: [],
      currentFaculity: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit or Delete Faculitys",
      headers: [
        // { text: 'FaculityNumber', value: 'faculityNumber' },
        { text: "Name", value: "name" },
        
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveFaculitys();
  },
  methods: {
    editFaculity(faculity) {
      this.$router.push({ name: "EditFaculity", params: { id: faculity.id } });
    },
    viewFaculity(faculity) {
      this.$router.push({ name: "viewFaculity", params: { id: faculity.id } });
    },

    deleteFaculity(faculity) {
      FaculityServices.delete(faculity.id)
        .then(() => {
          this.retrieveFaculitys();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveFaculitys() {
      FaculityServices.getAll()
        .then((response) => {
          this.faculitys = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveFaculitys();
      this.currentFaculity = null;
      this.currentIndex = -1;
    },
    setActiveFaculity(faculity, index) {
      this.currentFaculity = faculity;
      this.currentIndex = faculity ? index : -1;
    },
    removeAllFaculitys() {
      FaculityServices.deleteAll()
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
