<template>
<v-dialog :value="value" max-width="900" persistent>
 <v-card>
  <v-card-title primary-title>
    <div class="headline">Bình luận về phòng</div>
    <v-spacer></v-spacer>
      <v-btn fab color="red" depressed small @click="$emit('input',false)" ><v-icon color="white">cancel</v-icon></v-btn>
  </v-card-title>
  <v-card-text style="text-align:center">
    <div class="fb-comments" :data-href="url" data-width="700" data-numposts="7"></div>
  </v-card-text>
</v-card>
</v-dialog>
</template>

<script src="./popupComment.js">
</script>