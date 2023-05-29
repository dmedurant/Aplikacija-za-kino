<template>
  <div style="background-color: #229df9">
    <div v-for="post in posts" :key="post.ID_Film" class="row q-pa-md">

      <div q-card>
       
        <q-img :src=post.cover width="800px" height="600px" position="absolute" top="50%" left="50%"
          transform="translate(-50%, -50%)">
          <div class="q-pa-md">
            <q-btn-dropdown color="black" label="Uredi sliku">
              <q-list>

                <q-item clickable v-close-popup @click="obrisi_sliku(post.ID_Film)">
                  <q-item-section>
                    <q-item-label style="display: flex; justify-content: center; align-items: center;">OBRIŠI SLIKU</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="absolute-bottom text-subtitle1 text-center">
            <div style="text-transform:uppercase; font-size:50px">{{ post.Naslov }}</div>
          </div>
        </q-img>
      </div>


      <div class="q-pa-md">
        <div class="q-pa-md items-start q-gutter-xs" style="background-color: black; color: white;">
          <p style="font-size: 20px;">Opis:</p>
          <div class="post-text">{{ post.Sadrzaj }}</div>
          <q-separator color="white" />
          <p style="font-size: 20px;">Adresa:</p>
          <h7>{{ post.Sadrzaj }}</h7>
          <q-separator color="white" />
          <div class="" style="max-width: 400px"></div>

          <p style="font-size: 20px;">Geografska dužina:</p>
          <q-separator color="white" />
          <p style="font-size: 20px;">Geografska širina:</p>
        </div>
      </div>
    </div>



    <q-card-section>
      <q-btn class="button" @click="$router.push('/')" label="Natrag na početnu" />
    </q-card-section>

    <q-separator />

    <div class="q-pa-md row items-start q-gutter-xs">
      <p style="font-size: 25px; color: white">Komentari:</p>

    </div>
    <div class="q-pa-md row items-start q-gutter-xs">
    <p style="font-size: 20px; color: white">Ovdje možete pogledati komentare o atrakciji</p>
    </div>
    <!-- {{ comments }} -->

  </div>
</template>



<script setup>

import { ref, onMounted } from "vue"
import { api } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router';

const posts = ref([])
const comments = ref([])
const route = useRoute()
const router = useRouter()

const trenutniID = route.params.id
const getPosts = async (id) => {
  try {
    const response = await api.get(`http://localhost:3000/film/`+ trenutniID);
    posts.value = response.data;
    console.log("ID je: ", trenutniID);
    console.log("Podatak iz baze po ID: ", posts.value);

  } catch (error) {
    console.log(error)
  }
}


onMounted(() => {
  getPosts(trenutniID)
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