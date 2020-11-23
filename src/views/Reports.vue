<template>
  <div class="Report">
    <Drawer />
    <v-container fluid>
      <v-btn color="primary" @click="showLayoutFx">Weekly Report</v-btn>
    </v-container>

    <vue-html2pdf
      :show-layout="showLayout"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="2000"
      filename="report"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="1000px"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <v-container fluid>
          <v-card flat>
            <v-row no-gutters>
              <v-col cols="12">
                <v-card
                  height="100"
                  color="primary"
                  flat
                  dark
                  class="d-flex align-center"
                >
                  <v-row class="text-center">
                    <v-col cols="12">
                      <h1>Weekly Report</h1>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card class="mt-2" flat>
                  <v-row no-gutters>
                    <v-col cols="6">
                      <h3 class="mx-4">Employee Name</h3>
                    </v-col>
                    <v-col cols="6">
                      <h3 class="mx-4">Week</h3>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="6">
                      <v-text-field
                        dense
                        v-model="reports[0].employee_name"
                        outlined
                        class="mx-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        dense
                        v-model="reports[0].week"
                        outlined
                        class="mr-4"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="4">
                      <h3 class="mx-4">Item Name</h3>
                    </v-col>
                    <v-col cols="4">
                      <h3 class="mx-4">Item Quantity</h3>
                    </v-col>
                    <v-col cols="4">
                      <h3 class="mx-4">Item Status</h3>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="4">
                      <v-text-field
                        dense
                        v-model="reports[0].item_name"
                        outlined
                        class="mx-4"
                        
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        dense
                        v-model="reports[0].item_quantity"
                        outlined
                        class="mr-4"
                        
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        dense
                        v-model="reports[0].item_status"
                        outlined
                        class="mr-4"
                        
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <h3 class="mx-4">Completed Tasks</h3>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        outlined
                        name="input-7-1"
                        v-model="reports[0].completed_task"
                        
                        class="mx-4"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <h3 class="mx-4">Ongoing Tasks</h3>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        outlined
                        name="input-7-1"
                        v-model="reports[0].ongoing_task"
                        class="mx-4"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <h3 class="mx-4">Tasks for Next Week</h3>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        outlined
                        name="input-7-1"
                        v-model="reports[0].task_for_next_week"
                        class="mx-4"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="8">
                      <h3 class="mx-4">Approved By</h3>
                    </v-col>
                    <v-col cols="4">
                      <h3 class="mx-4">Date</h3>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="8">
                      <v-text-field
                        dense
                        placeholder="Danial"
                        outlined
                        class="mx-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        dense
                        v-model="date"
                        outlined
                        class="mr-4"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                  <v-card-actions>
                    <v-btn color="primary" @click="generateReport"
                      >Generate Report</v-btn
                    >
                    <v-btn color="error" @click="cancel">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import Drawer from "@/components/Drawer";
import VueHtml2pdf from "vue-html2pdf";
import { db } from "../firebaseDb";
export default {
  components: {
    Drawer,
    VueHtml2pdf,
  },
  data() {
    return {
      showLayout: false,
      reports: [],
      date: new Date()
    };
  },
  async mounted (){
    db.collection("reports").onSnapshot((snapshotChange) => {
      this.reports = [];
      snapshotChange.forEach((doc) => {
        this.reports.push({
          id: doc.id,
          employee_name: doc.data().employee_name,
          week: doc.data().week,
          item_name: doc.data().item_name,
          item_quantity: doc.data().item_quantity,
          item_status: doc.data().item_status,
          ongoing_task: doc.data().ongoing_task,
          task_for_next_week: doc.data().tasK_for_next_week,
          completed_task: doc.data().completed_task
        });
        console.log(this.reports)
      });
    });
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
      this.showLayout = false;
    },
    showLayoutFx() {
      this.showLayout = true;
    },
    cancel() {
      this.showLayout = false;
    },
  },
};
</script>
