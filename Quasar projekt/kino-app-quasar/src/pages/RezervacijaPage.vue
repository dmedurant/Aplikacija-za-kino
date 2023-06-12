<template>
    <div class="bg-image">
    <q-page padding class="flex flex-center" >
      <q-card style="width: 350px;">
        <q-card-section>
          <div v-for="post in posts" :key="post.id_prikaza" class="q-gutter-md full-with" >
          <div class="full-with">
        <div class="q-gutter-md" style="max-width: 350px">
        <p  class="text-h5 text-weight-light text-center" style="color:#2196F3">Rezervacija karti</p>
        <p>Film: {{ post.Naslov }}</p>
        <p>Datum Prikaza: {{ formatDate(post.DatumPrikaza) }}</p>
        <p>Vrijeme Prikaza: {{ formatTime(post.vrijeme_prikaza) }}</p>
        <q-img
        :src="post.cover"
        width="200px"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        :fit="fill"
      ></q-img>
        <q-input v-model="inputOsoba" ref="inputOsobaRef" label="Ime rezervacije" placeholder="Vaše ime i prezime">
        </q-input>
        <q-input v-model="inputKarte" ref="inputKarteRef" label="Broj karti" placeholder="1">
        </q-input>
          <div
            class="q-pa-sm"
            style="max-width: 700px; overflow-wrap: break-word"
          ></div>
        </div>
      </div>
        <div class="row justify-center q-pa-md">
          <div class="row justify-center q-pa-md">
            <q-btn
            label="Unesi"
            @click="submitForm"
            color="blue"
            class="q-ml-sm"
          />
          </div>
        </div>
      </div>
  
  <q-dialog v-model="showDialog">
        <q-card>
          <q-card-section> Rezervacija uspješna! 
            Vaša rezervacija biti će dostupna na pultu. 
            </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Ok"
              color="primary"
              v-close-popup
              @click="closeAndReload"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-card-section>

  <q-card-section>
    <q-btn class="button" @click="$router.go(-1) " label="Povratak na film" />
  </q-card-section>
    </q-card>
  </q-page>
  </div>
  </template>
  
  <script setup>
  import moment from 'moment';
  import { ref, onMounted } from "vue";
  import { api } from 'boot/axios';
  import { useRoute, useRouter } from 'vue-router';
  
  const posts = ref([]);
  const route = useRoute();
  const router = useRouter();
  
  const trenutni_prikazID = ref('');
  
  const getPosts = async () => {
    try {
      const response = await api.get(`http://localhost:3000/prikazivanje/${route.params.id_prikaza}`);
      posts.value = response.data;
      trenutni_prikazID.value = route.params.id_prikaza;
    } catch (error) {
      console.log(error);
    }
  };
  
  const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY');
  };
  
  const formatTime = (time) => {
    return moment(time, 'HH:mm:ss', true).format('HH:mm');
  };
  
  onMounted(() => {
    getPosts();
  });
  </script>
  
  <script>
  import axios from 'axios';
  import { QDialog } from 'quasar'
  export default {
    data() {
      return {
        inputOsoba: '',
        inputKarte: '',
        id_prikaza:this.$route.params.id_prikaza
      }
    },
    methods: {
      closeAndReload() {
        this.showDialog = false;
       window.location.reload();
      },
      resetForm () {
        this.inputOsoba = '',
        this.inputKarte = ''
      },
      async submitForm() {
        const sampleData = {
          osoba: this.inputOsoba,
          broj_karti: this.inputKarte,
          id_prikaza:this.$route.params.id_prikaza
        };
        try {
          const response = await axios.post(
            'http://localhost:3000/unosRezervacije',
            sampleData
          );
          console.log(response.data);
          this.showDialog = true
          this.resetForm()
        } catch (error) {
          console.error(error);
        }
      }
    },
  }
  </script>
  
  <style>
  .bg-image {
    background-image: url(https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-c-08_1-ksh6mza3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=f584d8501c27c5f649bc2cfce50705c0)
  }
</style>