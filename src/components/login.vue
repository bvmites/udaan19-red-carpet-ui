<template>
  <div>
    <div id="body">
      <b-container>
        <b-row>
          <b-col>
            <div class="retro-text">
              <span>Login</span>
            </div>
          </b-col>
        </b-row>
        <div class="login">
          <b-input-group class="spacer" @keyup="storeName">
            <b-form-input ref="nameInput" placeholder="username"></b-form-input>
          </b-input-group>
          <b-input-group class="spacer" @keyup="storePass">
            <b-form-input ref="passInput" type="password" placeholder="password"></b-form-input>
          </b-input-group>
          <b-button class="spacer retro-btn" @click="login" :disabled="!(name && password)">Login</b-button>
        </div>
        <div class="instructions">
          <span>Instructions</span>
          <ul class="instructionList">
            <li>You can vote only once</li>
            <li>Once voted, you cannot login again</li>
            <li>This login is valid only from the time you collected credential till 12:00 AM</li>
            <li>Voting in each category is compulsory</li>
            <li>You will not be able to move to next category until you vote in current category</li>
            <li>Once submitted, votes cannot be edited</li>
          </ul>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {baseUrl} from '../config'

  export default {
    methods: {
      storeName() {
        this.$store.commit('storeName', this.$refs.nameInput.localValue);
      },
      storePass() {
        this.$store.commit('storePass', this.$refs.passInput.localValue);
      },
      login() {
        console.log(this.name, this.password)
        this.$http.post(baseUrl + "user/login", {
          username: this.name,
          password: this.password
        }).then(function (response) {
          if (response.status === 200) {
            this.$store.commit('storeToken', response.body.token);
            this.$router.push('/dashboard');
          }
        }).catch((err) => {
          this.$store.commit('storeError', err.body.message);
          this.$router.push('/error');
        });
      }
    },
    computed: mapState({
      name: state => state.user.name,
      password: state => state.user.password,
      error: state => state.error
    })
  }
</script>
<style scoped>
  @import '../css/retro.css';
  @import '../css/input.css';
  @import '../css/login.css';
</style>
