<template>
  <div>
    <div>
      <form>
        <label>Select Session: </label>
        <select @change="changeDisplayedSession">
          <option selected value="First Session">First Session</option>
          <option value="Second Session">Second Session</option>
        </select>
      </form>
    </div>
    <v-row>
      <v-col>
        <v-sheet height="650">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            color="primary"
            type="week"
            min-weeks="5"
            :end="calEnd"
            @click:event="showEvent"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import sectionServices from "../services/sectionServices";
import sectionTimeServices from "../services/sectionTimeServices";
import courseServices from "../services/courseServices";
import SpecialListServices from "../services/specialListServices";
import Utils from "@/config/utils.js";

export default {
  data: () => ({
    today: "2022-11-09", // placeholder same as first session
    calEnd: "2023-04-27", // ending date of the last session
    sessionOne: "2023-01-08", // placeholder first session start
    sessionTwo: "2023-03-06", // placeholder second session start
    displayedSession: "First Session",
    sections: [],
    sectionTimes: [],
    courses: [],
    selectedEvent: {},
    selectedOpen: false,
    events: [],
  }),
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
    this.user = Utils.getStore("user");
  },
  async beforeMount() {
    await this.getSections();
    //console.log(this.events)
  },
  methods: {
    async getSections() {
      await sectionServices
        .getAll()
        .then(async (response) => {
          this.sections = response.data;
          console.log("sections", this.sections)

          await this.getSectionTimes(); // grab sectionTimes
          await this.getCourses();
          // map sectionTimes to sections
          this.sections.forEach(this.createEvent);

          // Change this for the filter
          // this.filteredCourses = this.courses
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getSectionTimes() {
      await sectionTimeServices
        .getAll()
        .then((response) => {
          this.sectionTimes = response.data;
          // Change this for the filter
          // this.filteredCourses = this.courses
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getCourses() {
      await SpecialListServices.getAll()
        .then((response) => {
          let a = response.data;
          this.specialList = a.filter((b) => b.userId == this.user.userId);
          this.specialList.forEach((e) => {
            this.createSpcialList(e.courseId);
          });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    async createSpcialList(courseId) {
      await courseServices.get(courseId)
        .then((response) => {
          this.courses.push(response.data);
          console.log("this.courses", this.courses)
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    // Map sectionTimes to sections and add a new event.
    // If the section is a full semester, 2 events will
    // be created, one for each section time.
    createEvent(section) {
      this.sectionTimes.forEach((e) => {
        if (section.id == e.sectionId) {
          // find the course name
          // suggest that the sections controller has a function to grab sections, include their courses and include their sectionTimes
          let relevantCourse = this.courses.filter(
            (course) => course.id == section.courseId
          );
          let name = relevantCourse.name;
          console.log(name);
          // console.log(name)
          // create the event object and add it to the list
          let tempEvent = {
            name: name,
            // figure out how to do multiple week days
            // find a function to get the next X weekday from a date.
            // have a loop to iterate through the weekdays in sectionTime and make
            // and event for each one that is valid

            start: new Date(e.startDate).toISOString().slice(0, 16),
            end: new Date(e.endDate).toISOString().slice(0, 16),
            // start: e.startDate,
            // end: e.startDate,
            // start: e.startDate + " " + e.startTime,
            // end: e.startDate + " " + e.endTime,
            // start: "2022-04-11 12:00",
            // end: "2022-04-11 1:00"
          };
          console.log("tempEvent", tempEvent);
          this.events.push(tempEvent);
          // add a test to see if the section is in both first and second session
          // add another event if it is, but with the end date
          // if (sectionTime.)
        }
      });
      // for (let i = 0; i < this.sectionTimes.length; i++){
      //   if (section.id == this.sectionTimes[i].sectionId)
      //   {
      //     // find the course name
      //     // suggest that the sections controller has a function to grab sections, include their courses and include their sectionTimes
      //     let relevantCourse = this.courses.find( course => course.id == section.courseId);
      //     let name = relevantCourse.name;
      //     // console.log(name)
      //     // create the event object and add it to the list
      //     let sectionTime = this.sectionTimes[i];
      //     let tempEvent = {
      //       name: name,
      //       // figure out how to do multiple week days
      //       start: sectionTime.startDate + " " + sectionTime.startTime,
      //       end: sectionTime.startDate + " " + sectionTime.endTime
      //     }
      //     // console.log(tempEvent);
      //     this.events.push(tempEvent);
      //     // add a test to see if the section is in both first and second session
      //     // add another event if it is, but with the end date
      //     // if (sectionTime.)
      //   }
      // }
    },
    // createCalEvents() {
    //   this.sections.forEach(this.createCalEvent);
    // },
    // createCalEvent(event) {
    //   this.events.push({
    //     name: event.name
    //   });
    // },
    changeDisplayedSession() {
      if (this.displayedSession == "First Session") {
        this.today = this.sessionTwo;
        this.displayedSession = "Second Session";
      } else {
        this.today = this.sessionOne;
        this.displayedSession = "First Session";
      }
    },
    showEvent(event) {
      console.log(event.date);
    },
  },
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
