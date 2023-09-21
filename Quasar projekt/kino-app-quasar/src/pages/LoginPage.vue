<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="ID_Korisnik">ID_Korisnik:</label>
        <input type="text" id="ID_Korisnik" v-model="formData.ID_Korisnik" required />
      </div>
      <div>
        <label for="broj">broj:</label>
        <input type="broj" id="broj" v-model="formData.broj" required />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        ID_Korisnik: '',
        broj: '',
      },
      message: '', 
    };
  },
  methods: {
    login() {
      axios
        .post('/login', this.formData) 
        .then((response) => {
          if (response.data.success) {
            this.message = 'Login je uspio.';
            
          } else {
            this.message = 'Login nije uspio.';
          }
        })
        .catch((error) => {
          console.error(error);
          this.message = 'Login greska.';
        });
    },
  },
};
</script>

