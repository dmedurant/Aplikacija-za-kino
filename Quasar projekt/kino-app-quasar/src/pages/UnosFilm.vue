<template>
    <div class="bg-image">
    <q-page padding class="flex flex-center">
      <q-card style="width: 40%; padding:20px;" class="pozadina">
        <q-card-section>
          <div class="q-gutter-md" >
          <div class="full-with">
      <div class="q-gutter-md" >
        <p  class="text-h4 text-center" style="color:#5855ad">Unos novog Filma</p>
        <q-input ref="naslovRef" v-model="inputNaslov" label="Naslov" placeholder="Naslov">
        </q-input>
  
        <q-input ref="SadrzajRef" v-model="inputSadrzaj" label="Sadrzaj" placeholder="Sadržaj ">
        </q-input>
  
        <q-input ref="DatumObjaveRef" v-model="inputDatumObjave" label="Datum Objave" placeholder="format: gg-mm-dd ">
        </q-input>
        <q-input ref="trajanjeRef" v-model="inputTrajanje" label="Trajanje" placeholder="Trajanje ">
        </q-input>
        
        <q-input ref="coverRef" v-model="inputCover" label="Cover slika" placeholder="url ">
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
          <q-card-section> Film je uspješno dodan! </q-card-section>
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
    </q-card>
  </q-page>
  </div>
  </template>
  
  <script>
  // eslint-disable-next-line no-unused-vars
  import { QDialog } from 'quasar'
  // eslint-disable-next-line no-unused-vars
  import { ref } from 'vue'
  import axios from 'axios' // Import axios
  export default {
    data () {
      return {
        inputNaslov: '',
        inputSadrzaj: '',
        inputDatumObjave: '',
        inputTrajanje: '',
        inputCover: ''
  
      }
    },
    methods: {
      closeAndReload() {
        this.showDialog = false;
        window.location.reload();
      },
  
      resetForm () {
        this.inputNaslov = ''
        this.inputSadrzaj = ''
        this.inputDatumObjave = ''
        this.inputTrajanje = ''
        this.inputCover = ''
        this.$refs.coverRef.resetValidation()
        this.$refs.naslovRef.resetValidation()
        this.$refs.SadrzajRef.resetValidation()
        this.$refs.DatumObjaveRef.resetValidation()
        this.$refs.trajanjeRef.resetValidation()
      },
      async submitForm () {
        const sampleData = {
          naslov: this.inputNaslov,
          sadrzaj: this.inputSadrzaj,
          datumObjave: this.inputDatumObjave,
          trajanje: this.inputTrajanje,
          cover: this.inputCover
        }
        try {
          const response = await axios.post(
            'http://localhost:3000/unosFilm',
            sampleData
          )
          console.log(response.data)
          this.showDialog = true
          this.resetForm()
        } catch (error) {
          console.error(error)
        }
      }
    },
  }
  
  </script>
  
  <style>
    .bg-image {
      background-image:url(src/assets/pozadina2.jpg) ;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .pozadina{
      background-color: 
      rgba(248, 248, 248, 0.614); width:80%; 
      border-radius: 15px;
    }
    .pozadina q-input{
      color:white;
    }
  </style>