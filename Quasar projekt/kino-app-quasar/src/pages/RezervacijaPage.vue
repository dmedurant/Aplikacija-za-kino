<template>
    <div>
      <h1>Rezervacije</h1>
      <p>Trenutni ID: {{ $route.params.id_filma }}</p>
      <p>Odabrani prikaz ID: {{ $route.params.id_prikaza }}</p>
     
      
    </div>

    <div v-for="post in posts" :key="post.id_prikaza" class="row q-pa-md">
        <div q-card>
            <p>Film: {{ post.Naslov }}</p>
            <p>Datum Prikaza: {{ post.DatumPrikaza }}</p>
            <p>Vrijeme Prikaza: {{ post.vrijeme_prikaza }}</p>
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
  
  const trenutni_prikazID = route.params.id_prikaza;
  const trenutni_filmID = route.params.id_filma;
  
  const getPosts = async (id_prikaza, id_filma) => {
    try {
      const response = await api.get(`http://localhost:3000/prikazivanje/` + trenutni_prikazID);
      posts.value = response.data;
      console.log("ID je: ", trenutni_prikazID);
  
    } catch (error) {
      console.log(error);
    }
  };
  
  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };
  
  const formatTime = (time) => {
    return moment(time, 'HH:mm:ss', true).format('HH:mm');
  };
  

  
  onMounted(() => {
    getPosts(trenutni_prikazID);
  });
  
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  