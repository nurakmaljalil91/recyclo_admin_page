<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
      color="blue darken-1"
      dark
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn color="red" to="/">
        <span class="white--text">Sign Out</span>
        <v-icon right class="white--text">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Manage Users",
          icon: "mdi-account-group-outline",
          path: "/users",
        },
        { title: "Manage Shops", icon: "mdi-basket", path: "/shops" },
        { title: "Manage Wastes", icon: "mdi-basket", path: "/wastes" },
        { title: "Generate Reports", icon: "mdi-basket", path: "/reports" }
      ],
      mini: null,
    };
  },
};
</script>
