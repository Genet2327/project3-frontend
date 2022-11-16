<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Faculity Edit</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="faculity.name"
          id="name"
          :counter="50"
          label="Name"
          required
        >
        </v-text-field>
       
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateFaculity()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import FaculityServices from "../services/faculityServices";

export default {
  name: "edit-faculity",
  props: ["id"],
  data() {
    return {
      valid: false,
      faculity: {},
      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveFaculity() {
      FaculityServices.get(this.id)
        .then((response) => {
          this.faculity = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    updateFaculity() {
      var data = {
        name: this.faculity.name,
        
      };
      FaculityServices.update(this.id, data)
        .then((response) => {
          this.faculity.id = response.data.id;
          this.$router.push({ name: "FaculityList" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "FaculityList" });
    },
  },
  mounted() {
    this.retrieveFaculity();
  },
};
</script>
<style></style>
