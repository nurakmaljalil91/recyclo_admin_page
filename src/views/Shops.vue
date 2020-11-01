<template>
  <div class="shops">
    <Drawer />
    <v-container fluid>
      <v-card>
        <v-card-title>Manage Shops</v-card-title>
        <template>
          <v-data-table
            :headers="headers"
            :items="shops"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon class="mr-2" @click="editUser(item.id)"
                >mdi-pencil</v-icon
              >
              <v-icon @click="deleteDelete(item.id)">mdi-delete</v-icon>
            </template></v-data-table
          >
        </template>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebaseDb";
import Drawer from "@/components/Drawer";
export default {
  components: {
    Drawer,
  },
  data() {
    return {
      headers: [
        {
          text: "Shop Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Price", value: "price" },
        { text: "Discount", value: "discount" },
        { text: "Quantity", value: "quantity" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      shops: [],
    };
  },
  methods: {
    editUser() {},
    deleteUser(id) {
      db.collection("shops")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Shop delete");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    db.collection("shops").onSnapshot((snapshotChange) => {
      this.users = [];
      snapshotChange.forEach((doc) => {
        this.shops.push({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          discount: doc.data().discount,
          quantity: doc.data().quatity,
        });
      });
    });
  },
};
</script>
