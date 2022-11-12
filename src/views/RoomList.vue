<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Room!</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br /><br />
      <v-card>
        <v-card-title>
          Rooms
          <v-btn
            v-show="user.role == 'Admin'"
            class="mx-2"
            color="success"
            exact
            :to="{ name: 'AddRoom' }"
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
          :items="rooms"
          :items-per-page="50"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <!-- <v-icon small class="mx-4" @click="ADDRoomForUser(item)">
                  mdi-pencil
                </v-icon> -->

              <v-icon
                v-show="user.role == 'Admin'"
                small
                class="mx-4"
                @click="editRoom(item)"
              >
                mdi-pencil
              </v-icon>
              <!-- <v-icon small class="mx-4" @click="viewRoom(item)">
                mdi-format-list-bulleted-type
              </v-icon> -->
              <v-icon small class="mx-4" @click="deleteRoom(item)">
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
import RoomServices from "../services/roomServices";

import Utils from "@/config/utils.js";

export default {
  name: "rooms-list",
  data() {
    return {
      search: "",
      rooms: [],
      currentRoom: null,
      currentIndex: -1,
      name: "",
      user: {},
      message: "Search, Edit or Delete Rooms",
      headers: [
        // { text: 'RoomNumber', value: 'roomNumber' },
        { text: "Number", value: "number" },
        { text: "Capacity", value: "capacity" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
    this.retrieveRooms();
  },
  methods: {
    editRoom(room) {
      this.$router.push({ name: "EditRoom", params: { id: room.id } });
    },
    viewRoom(room) {
      this.$router.push({ name: "viewRoom", params: { id: room.id } });
    },

    deleteRoom(room) {
      RoomServices.delete(room.id)
        .then(() => {
          this.retrieveRooms();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveRooms() {
      RoomServices.getAll()
        .then((response) => {
          this.rooms = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveRooms();
      this.currentRoom = null;
      this.currentIndex = -1;
    },
    setActiveRoom(room, index) {
      this.currentRoom = room;
      this.currentIndex = room ? index : -1;
    },
    removeAllRooms() {
      RoomServices.deleteAll()
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
