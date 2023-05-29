<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:485px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Login</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="add" color="purple-4" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input ref="username" square clearable v-model="username" type="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input ref="password" square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" label="Sign In" @click="submitForm" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section> Login uspješan! </q-card-section>
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
  </q-page>
</template>

<script>
import { QDialog } from 'quasar'
import { ref } from 'vue'
  import axios from 'axios' // Import axios
export default {
  name: 'LoginInp',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
      closeAndReload() {
        this.showDialog = false;
        window.location.reload();
      },
  
      resetForm () {
        this.username = ''
        this.password = ''
        this.$refs.username.resetValidation()
        this.$refs.password.resetValidation()
      },
      async submitForm () {
        const sampleData = {
            username: this.username,
            password: this.password,
        }
        try {
          const response = await axios.post(
            'http://localhost:3000/login',
            sampleData
          )
          console.log(response.data)
          console.log("Korisnik postoji")
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
</style>