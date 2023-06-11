<template>
    <div>
      <h1>Rezervacije</h1>
      <p>Trenutni ID: {{ $route.params.id_filma }}</p>
      <p>Odabrani prikaz ID: {{ $route.params.id_prikaza }}</p>
    </div>
  
    <div v-for="post in posts" :key="post.id_prikaza" class="row q-pa-md">
      <div q-card>
        <p>Film: {{ post.Naslov }}</p>
        <p>Datum Prikaza: {{ formatDate(post.DatumPrikaza) }}</p>
        <p>Vrijeme Prikaza: {{ formatTime(post.vrijeme_prikaza) }}</p>
        <q-input ref="osobaRef" v-model="inputOsoba" label="Osoba:" placeholder="Vaše ime i prezime"></q-input>
        <br>
        <q-btn
          label="Unesi"
          @click="submitForm"
          color="blue"
          class="q-ml-sm"
        />
        
      </div>
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
      console.log("ID je: ", route.params.id_prikaza);
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
  export default {
    data() {
      return {
        inputOsoba: '',
        id_prikaza:this.$route.params.id_prikaza
      }
    },
    methods: {
      async submitForm() {
        const sampleData = {
          osoba: this.inputOsoba,
          id_prikaza:this.$route.params.id_prikaza
        };
        try {
          console.log(this.inputOsoba);
          const response = await axios.post(
            'http://localhost:3000/unosRezervacije',
            sampleData
          );
          console.log(response.data);
          // Optionally, you can navigate to another route or perform additional actions here
        } catch (error) {
          console.error(error);
        }
      }
    },
  }
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  