<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Room Add</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>

      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="room.number"
          id="name"
          :counter="50"
          label="Number"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="room.capacity"
          id="name"
          :counter="50"
          label="Capacity"
          required
        ></v-text-field>
        

        
        
       

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveRoom()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import RoomServices from "../services/roomServices";
import Utils from "@/config/utils.js";

export default {
  name: "add-room",
  data() {
    return {
      valid: false,
      user: {},
      room: {
        id: null,
        number: "",
        capacity: "",
       
      },
      message: "Enter data and click save",
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
  },
  methods: {
    saveRoom() {
      var data = {
        number: this.room.number,
        capacityy: this.room.capacity,
       
      };

      console.log(data);
      RoomServices.create(data)
        .then((response) => {
          this.room.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "RoomList" });
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
    },
    cancel() {
      console.log("add tetstststts");

      this.$router.push({ name: "RoomList" });
    },
  },
};
</script>
<style></style>
