<template>
  <div style="background-color: #229df9">
<div  class="q-pa-md row items-start q-gutter-md">

  <q-card v-for="post in posts" :key="post.id">
    <q-img :src=post.cover />
    <q-card-section>
         <div class="myDiv" style="padding: 10px;"></div>

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">{{ post.Naslov }}</div>
      </div>

    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">{{ post.DatumObjave }}</div>
      <div class="text-caption text-grey">
        {{post.Sadrzaj}}
      </div>

    </q-card-section>

    <q-separator />

  </q-card>
</div>
</div>
</template>
<script setup>

import { ref, onMounted } from "vue"
import { api } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'

const posts = ref([])
const route = useRoute()
const router = useRouter()

const trenutniID = route.params.id
const getPosts = async () => {
  try {
    const response = await api.get(`/filmovi/${trenutniID}`)
    posts.value = response.data
    console.log("ID je: ", trenutniID)
    console.log("Podatak iz baze po ID: ", posts.value)

  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getPosts();
})


</script>




<style scoped></style>


<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 800px

</style>

<style>
.post-text {
  max-width: 620px;
  word-wrap: break-word;
}

.button{
  background-color: black;
  color:white;
}
.button:hover{
  background-color:white;
  color:black;
}

</style>