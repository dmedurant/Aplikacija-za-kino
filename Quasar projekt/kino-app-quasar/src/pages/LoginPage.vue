<template>
  <!-- <q-header elevated class="bg-deep-purple text-white"> -->

  <q-tabs v-model="tab" class="bg-primary text-white ">
    <q-tab name="Prijava" label="Prijava" @click.prevent="register = false" />
    <q-tab name="Registracija" label="Registracija" @click.prevent="register = true" />
  </q-tabs>
  <!-- </q-header> -->
  <q-card class="my-card">
    <q-card-section>
      <form @submit.prevent="onSubmit">
        <div class="q-gutter-md full-with" style="max-width: 500px">
          <div class="loginText" style="text-align: center">{{ tab }}</div>
          <q-input v-model="credentials.email" class="input" outlined label="Email" />
          <div> </div>
          <q-input v-model="credentials.password" class="input" outlined type="password" label="Password" />

          <div class="row justify-between">
            <q-btn class="bg-primary text-white" to="/">Odustani</q-btn>
            <q-btn class="bg-primary text-white" type="submit">{{ tab }}</q-btn>
          </div>
        </div>

      </form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { reactive } from "vue"
const register = ref(false)
const tab = ref('')
if (!register.value) {
  tab.value = "Prijava"
}
else {
  tab.value = "Registracija"
}
const credentials = reactive({
  email: '',
  password: ''
})
const onSubmit = () => {
  console.log("forma potvrđana")

  if (!credentials.email || !credentials.password) {
    alert('Unesite email i lozinku')
  }
  else {
    if (register.value) {
      console.log('Registriraj korisnika sa:', credentials)
      registracija ();
    }
    else {
      console.log('Prijavi korisnika sa:', credentials)
      submitForm ();
    }
  }
}
</script>

<script>
// eslint-disable-next-line no-unused-vars
import { QDialog } from 'quasar'
// eslint-disable-next-line no-unused-vars
import { ref } from 'vue'
import axios from 'axios' // Import axios
export default {
  data () {
    return {
      inputNaziv: '',
    }
  },
  methods: {

    resetForm () {
      this.inputNaziv = ''
      this.$refs.adresaRef.resetValidation()
    },

    closeAndReload () {
      this.showDialog = false
      window.location.reload()
    },

    async registracija () {
      const sampleData = {
        username: this.credentials.email,
        pass: this.credentials.password
      }
      try {
        const response = await axios.post(
          'http://localhost:3000/unosKorisnika',
          sampleData
        )
        console.log(response.data)
        this.showDialog = true
        this.resetForm()
      } catch (error) {
        console.error(error)
      }
    }
  }
}

</script>

<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 400px
    margin: 0 auto
    margin-top: 40px
    font-size: 36px
    width: 100%


</style>
