<template>
  <div id="app">
    <v-app>
      <v-main>
        <router-view></router-view>
      </v-main>

      <v-footer app class="font-weight-medium" color="blue lighten-5" >
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Danial</strong>
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>
