<template>
  <div style="background-color: #229df9;">
    <div v-for="post in posts" :key="post.ID_Film" class="row q-pa-md">

      <div q-card>
        <p style="font-size: 60px; font-weight:700;">{{ post.Naslov }}</p>
        <q-img :src=post.cover width="300px" height="450px" position="absolute" top="50%" left="50%"
          transform="translate(-50%, -50%)">


          
        </q-img>
      </div>
      <div class="q-pa-md" >
        <div class="q-pa-md items-start q-gutter-xs" >
          <p style="font-size: 20px; font-weight:700;">Opis:</p>
          <div class="post-text">{{ post.Sadrzaj }}</div>
          <q-separator color="white" />
          <br>
          <p style="font-size: 20px; font-weight:700;">Datum objave:</p>
          <h7>{{ post.DatumObjave }}</h7>
          <q-separator color="white" />
          <div class="" style="max-width: 400px"></div>
        </div>

        <div class="q-pa-md" >
          <q-btn-dropdown class="float-right"
            color="purple"
            label="Rezervacija">
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Rezervacija</div>
                <q-input ref="prikazref" v-model="id_prikaz" label="id prikaza" placeholder="Sadržaj "></q-input>
                <q-input ref="SadrzajRef" v-model="inputSadrzaj" label="Sadrzaj" placeholder="Sadržaj "></q-input>
                <br>
                <br>
                
              </div>
      
              <q-separator vertical inset class="q-mx-lg" />
      
              <div class="column items-center">
                <q-btn label="Rezerviraj" @click="rezervacijaFilma" color="blue" class="q-ml-sm"/>
              </div>
            </div>
          </q-btn-dropdown>
        </div>
        <q-separator />
      </div>
    </div>



    <q-card-section>
      <q-btn class="button" @click="$router.push('/')" label="Natrag na početnu" />
    </q-card-section>

    

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