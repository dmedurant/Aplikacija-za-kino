<template>
  <div  class="absolute-full slikica">
    <div v-for="post in posts" :key="post.ID_Film" class="row q-pa-md fixed-center pozadina">
      <div q-card style="padding-left: 10%;">
        <p style="font-size: 60px; font-weight:700;">{{ post.Naslov }}</p>
        <q-img
          :src="post.cover"
          width="400px"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          :fit="fill"
        ></q-img>
      </div>
      <div class="q-pa-md" style="margin-top: 70px; margin-left:40px; width:50%">
        <div class="q-pa-md items-start q-gutter-xs">
          <p style="font-size:20pt; font-weight:700;">Opis:</p>
          <div class="post-text">{{ post.Sadrzaj }}</div>
          <q-separator color="white" />
          <br>
          <p style="font-size: 20pt; font-weight:700;">Datum objave:</p>
          <h7>{{ formatDate(post.DatumObjave) }}</h7>
          <q-separator color="white" />
          <div class="" style="max-width: 400px"></div>
        </div>

        <div class="q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md"><p style="font-size: 20pt; font-weight:700;">Dostupna prikazivanja</p></div>
            <q-table
            id="filmovitablica"
              :rows="availableDates"
              :columns="columns"
              row-key="date"
              :rows-per-page-options="[5, 10, 15]"
              :pagination="pagination"
              dense
              flat
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="date" :props="props"><p>{{ formatDate(props.row.DatumPrikaza) }}</p></q-td>
                  <q-td key="vrijeme" :props="props"><p>{{ formatTime(props.row.vrijeme_prikaza) }}</p></q-td>
                  <q-td key="action" :props="props">
                    <q-btn
                      label="Odabir"
                      color="primary"
                      @click="navigateToAnotherPage(props.row.id_prikaza)"
                    />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
          <q-separator vertical inset class="q-mx-lg" />
        </div>
      </div>
    </div>
    <q-card-section>
      <q-btn class="button" @click="$router.push('/') " label="Natrag na početnu" />
    </q-card-section>
  </div>
</template>

<script setup>
import moment from 'moment';
import { ref, onMounted } from "vue";
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';

const posts = ref([]);
const comments = ref([]);
const route = useRoute();
const router = useRouter();

const trenutniID = route.params.id;

const getPosts = async (id) => {
  try {
    const response = await api.get(`http://localhost:3000/film/` + trenutniID);
    posts.value = response.data;
    console.log("ID je: ", trenutniID);
    console.log("Podatak iz baze po ID: ", posts.value);

    // Load available dates from a different table
    const availableDatesResponse = await api.get('http://localhost:3000/available-dates/' + trenutniID);
    availableDates.value = availableDatesResponse.data;

  } catch (error) {
    console.log(error);
  }
};

const availableDates = ref([]);
const columns = [
  { name: 'date', required: true, label: 'Datum', align: 'left', field: 'date', sortable: true },
  { name: 'vrijeme', required: true, label: 'Vrijeme', align: 'left', field: 'vrijeme', sortable: true },
  { name: 'action', required: true, label: 'Rezervacija', align: 'center', field: 'action' }
];
const pagination = { rowsPerPage: 5 };



const rezervacijaFilma = () => {
  // Handle rezervacijaFilma logic
};

const formatDate = (date) => {
  return moment(date).format('DD-MM-YYYY');
};

const formatTime = (time) => {
  return moment(time, 'HH:mm:ss', true).format('HH:mm');
};

const navigateToAnotherPage = (rowID) => {
  router.push({
    path: '/rezervacija',
    name: "rezervacija",
    params: {
      id_filma: trenutniID,
      id_prikaza: rowID,
    },
  });
};

onMounted(() => {
  getPosts(trenutniID);
});

</script>


<style>
.slikica{
  background-image: url(https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3798.jpg?w=1380&t=st=1686499615~exp=1686500215~hmac=fb07370caa8ee4df1d990942b3c5340b177150ae87af62f2bf885389144f2200);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#filmovitablica{
  background-color: #ffffff93;
  padding: 10px;
}

.q-table th{
font-size: 15pt;
}
.q-table p{
  font-size: 14pt;
}
.pozadina{
  color: #fff;
  padding-top :2%; 
  padding-bottom:4%; 
  background-color: 
  rgba(26, 26, 26, 0.462); width:80%; 
  border-radius: 15px;
}

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