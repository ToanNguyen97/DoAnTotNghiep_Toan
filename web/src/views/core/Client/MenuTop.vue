<template>
  <v-toolbar
    app
    flat
  >
    <v-toolbar-side-icon
      class="hidden-md-and-up"

    />
    <v-container
      mx-auto
      py-0
    >
      <v-layout>
        <v-img 
          :src="require('@/assets/Slogan.png')"      
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
        />
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          class="ml-0 hidden-sm-and-down"
          flat
        >
          {{ link.name }}
        </v-btn>
        <v-spacer />
        <v-text-field
          append-icon="search"
          flat
          hide-details
          solo-inverted
          style="max-width: 300px;"
        />
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      links: [
        {name: 'Home', path:'/quan-ly-giao-vien.html'},
        {name: 'About Us', path:'/quan-ly-giao-vien.html'},
        {name: 'Contact Us', path:'/quan-ly-giao-vien.html'},
        {name: 'News', path:'/quan-ly-giao-vien.html'},
        {name: 'Login', path:'/quan-ly-giao-vien.html'}
      ]
    }
  }
}
</script>
