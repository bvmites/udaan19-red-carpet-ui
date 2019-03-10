<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <div class="retro-text">
            <span>Feedback</span>
          </div>
        </b-col>
      </b-row>
      <div class="login">
        <b-input-group class="spacer" @keyup="setName" >
          <b-form-input ref="nameInput" placeholder="Name (optional)"></b-form-input>
        </b-input-group>
        <b-input-group class="spacer" @keyup="storeFeedback">
          <b-form-textarea ref="feedbackInput"
                           placeholder="Write your feedback here..."
                           :rows="3"
                           v-model="text"></b-form-textarea>
        </b-input-group>
      </div>
      <form class="rating-form" action="#" method="post" name="rating-movie">
        <fieldset class="form-group">
          <div class="form-item">
            <input id="rating-5" name="rating" type="radio" value="5"  @click="setRating(5)"/>
            <label for="rating-5" data-value="5">
            <span class="rating-star">
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star"></i>
            </span>
              <span class="ir">5</span>
            </label>
            <input id="rating-4" name="rating" type="radio" value="4"  @click="setRating(4)"/>
            <label for="rating-4" data-value="4">
            <span class="rating-star">
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star"></i>
            </span>
              <span class="ir">4</span>
            </label>
            <input id="rating-3" name="rating" type="radio" value="3"  @click="setRating(3)"/>
            <label for="rating-3" data-value="3">
            <span class="rating-star">
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star"></i>
            </span>
              <span class="ir">3</span>
            </label>
            <input id="rating-2" name="rating" type="radio" value="2"  @click="setRating(2)"/>
            <label for="rating-2" data-value="2">
            <span class="rating-star">
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star"></i>
            </span>
              <span class="ir">2</span>
            </label>
            <input id="rating-1" name="rating" type="radio" value="1" @click="setRating(1)"/>
            <label for="rating-1" data-value="1">
            <span class="rating-star">
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star"></i>
            </span>
              <span class="ir">1</span>
            </label>
          </div>
        </fieldset>
      </form>
      <b-button :class="{'spacer': true, 'retro-btn': true, 'disabled': !feedback.rating}" @click="submit" :disabled="!feedback.rating">Submit</b-button>
    </b-container>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import getInitialState from '../initialState'
  import {baseUrl} from '../config'

  export default{
    data() {
      return {
        name: null,
        text: null
      }
    },
    methods: {
      setRating: function(stars) {
        this.$store.commit('setRating', stars);
      },
      storeFeedback() {
        this.$store.commit('storeFeedback', this.$refs.feedbackInput.localValue);
      },
      setName() {
        this.$store.commit('setName', this.$refs.nameInput.localValue);
      },
      submit() {
        this.$http.post(baseUrl + "feedback", this.feedback, {
          headers: {
            Authorization: this.$store.state.user.token
          }
        }).then(function(response) {
          const initialState = getInitialState();
          this.$store.commit("resetState", initialState);
          this.$router.push("/login");
        });
      }
    },
    computed: mapState({
        feedback: (state) => state.feedback
    })
  }
</script>
<style scoped>
  @import "../css/font-awesome.css";
  @import "../css/retro.css";
  @import "../css/input.css";
  @import "../css/feedback.css";
</style>
