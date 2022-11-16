<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Faculity Add</v-toolbar-title>
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
          @click="saveFaculity()"
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
import Utils from "@/config/utils.js";

export default {
  name: "add-faculity",
  data() {
    return {
      valid: false,
      user: {},
      faculity: {
        id: null,
        name: "",
    
       
      },
      message: "Enter data and click save",
    };
  },
  mounted() {
    this.user = Utils.getStore("user");
  },
  methods: {
    saveFaculity() {
      var data = {
        name: this.faculity.name,
        
       
      };

      console.log(data);
      FaculityServices.create(data)
        .then((response) => {
          this.faculity.id = response.data.id;
          console.log("add " + response.data);
          this.$router.push({ name: "FaculityList" });
        })
        .catch((e) => {
          console.log("add Eroro" + e.response.data.message);
          this.message = e.response.data.message;
        });
    },
    cancel() {
      console.log("add tetstststts");

      this.$router.push({ name: "FaculityList" });
    },
  },
};
</script>
<style></style>
