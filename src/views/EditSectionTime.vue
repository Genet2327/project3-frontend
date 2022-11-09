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
        <v-text-field
          v-model="sectionTime.startDate"
          id="startDate"
          :counter="50"
          label="StartDate"
          required
        ></v-text-field>
        <v-text-field
          v-model="sectionTime.endDate"
          id="endDate"
          :counter="50"
          label="EndDate"
          required
        ></v-text-field>
        <v-text-field
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
        ></v-text-field>
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

export default {
  name: "edit-sectionTime",
  props: ["id"],
  data() {
    return {
      valid: false,
      sectionTime: {},
      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveSectionTime() {
      SectionTimeServices.get(this.id)
        .then((response) => {
          this.sectionTime = response.data;
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
  },
};
</script>
<style></style>
