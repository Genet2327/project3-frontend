<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>SectionTime Edit</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="sectionTime.inst_methode"
          id="inst_methode"
          :counter="50"
          label="Inst_methode"
          required
        ></v-text-field>
        <v-text-field
          v-model="sectionTime.date_of_weak"
          id="date_of_weak"
          :counter="50"
          label="Date_of_weak"
          required
        >
        </v-text-field>

        <v-datetime-picker
          label="Start Datetime"
          v-model="sectionTime.startDate"
        >
        </v-datetime-picker>
        <v-datetime-picker label="End Datetime" v-model="sectionTime.endDate">
        </v-datetime-picker>

        <!-- <v-text-field
          v-model="sectionTime.startTime"
          id="startTime"
          :counter="50"
          label="StartTime"
          required
        ></v-text-field>
        <v-text-field
          v-model="sectionTime.endTime"
          id="endTime"
          :counter="50"
          label="EndTime"
          required
        ></v-text-field> -->
        <v-select
          v-bind:items="sections"
          v-model="sectionId"
          label="Select section"
          item-text="title"
          item-value="id"
          return-object
          autocomplete
        ></v-select>
        <v-select
          v-bind:items="rooms"
          v-model="roomId"
          label="Select room"
          item-text="number"
          item-value="id"
          return-object
          autocomplete
        ></v-select>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateSectionTime()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import SectionTimeServices from "../services/sectionTimeServices";
import SectionServices from "../services/sectionServices";
import RoomServices from "../services/roomServices";

export default {
  name: "edit-sectionTime",
  props: ["id"],
  data() {
    return {
      sections: [],
      sectionId: null,
      rooms: [],
      roomId: null,

      valid: false,
      sectionTime: {},
      message: "Enter data and click save",
    };
  },
  methods: {
    sectionDrop() {
      SectionServices.getAll()
        .then((response) => {
          this.sections = response.data;
          console.log(this.sections.name);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    roomDrop() {
      RoomServices.getAll()
        .then((response) => {
          this.rooms = response.data;
          //console.log(this.semesters.name);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveSectionTime() {
      SectionTimeServices.get(this.id)
        .then((response) => {
          this.sectionTime = response.data;
          this.roomId = this.sectionTime.roomId;
          this.sectionId = this.sectionTime.sectionId;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    updateSectionTime() {
      var data = {
        inst_methode: this.sectionTime.inst_methode,
        date_of_weak: this.sectionTime.date_of_weak,
        startDate: this.sectionTime.startDate,
        endDate: this.sectionTime.endDate,
        startTime: this.sectionTime.startTime,
        endTime: this.sectionTime.endTime,
      };
      SectionTimeServices.update(this.id, data)
        .then((response) => {
          this.sectionTime.id = response.data.id;
          this.$router.push({ name: "SectionTimeList" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "SectionTimeList" });
    },
  },
  mounted() {
    this.retrieveSectionTime();
    this.sectionDrop();
    this.roomDrop();
  },
};
</script>
<style></style>
