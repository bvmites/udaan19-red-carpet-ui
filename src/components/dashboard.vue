<template>
  <div>
    <div class="loading-container" id="loader" v-if="!loaded">
      <div class="loading"></div>
      <div id="loading-text">Loading</div>
    </div>
    <div id="list" v-if="loaded">
      <transition name="slide"
                  @enter="enter"
                  @leave="leave">
        <b-container class="list" :key="index">
          <b-row>
            <b-col>
              <div class="retro-text">
                <span>{{category.title}}</span>
              </div>
            </b-col>
          </b-row>
          <participant-list class="participant-row" :nominees="category.nominees"
                            :imgObject="imgObject"></participant-list>
        </b-container>
      </transition>
      <div class="navigators">
        <button v-if="index > 0" size="lg" class="prev retro-btn" @click="prev">prev</button>
        <button v-if="index < categories.length-1" size="lg"
                :class="{'next': true, 'retro-btn': true, 'disabled': !votes[index].nominees.name}" @click="next"
                :disabled="!votes[index].nominees.name">next
        </button>
        <button v-if="index === categories.length-1"
                :class="{'submit': true, 'retro-btn': true, 'disabled': !votes[index].nominees.name}" @click="submit"
                :disabled="!votes[index].nominees.name">Submit
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  import participantList from './participantList.vue';
  import {mapState} from 'vuex';
  import {baseUrl} from '../config';

  function addEventListener(el, done) {
    el.addEventListener('animationend', function () {
      el.style = "";
      done();
    })
  }

  export default {
    components: {
      'participant-list': participantList
    },
    computed: mapState({
      index: state => state.index,
      categories: state => state.categories,
      category: state => state.categories[state.index],
      votes: state => state.votes,
      loaded: state => state.loaded
    }),
    data() {
      return {
        imgObject: {}
      }
    },
    methods: {
      enter(el, done) {
        el.childNodes[0].childNodes[0].childNodes[0].classList.add("rollIn");
        el.childNodes[2].childNodes[0].childNodes[0].classList.add("slideIn");
        el.childNodes[2].childNodes[0].childNodes[1].classList.add("slideIn");
        el.childNodes[2].childNodes[0].childNodes[2].classList.add("slideIn");
        el.childNodes[2].childNodes[0].childNodes[3].classList.add("slideIn");
        addEventListener(el, done);
      },
      leave(el, done) {
        el.childNodes[0].childNodes[0].childNodes[0].classList.add("rollOut");
        el.childNodes[2].childNodes[0].childNodes[0].classList.add("slideOut");
        el.childNodes[2].childNodes[0].childNodes[1].classList.add("slideOut");
        el.childNodes[2].childNodes[0].childNodes[2].classList.add("slideOut");
        el.childNodes[2].childNodes[0].childNodes[3].classList.add("slideOut");
        addEventListener(el, done);
      },
      next() {
        this.$store.commit('incrementIndex');
      },
      prev() {
        this.$store.commit('decrementIndex');
      },
      submit() {
        const data = this.votes.map((vote) => {
          return {
            categoryId: vote._id,
            nomineeId: vote.nominees._id
          }
        });
        this.$http.post(baseUrl + "votes", data, {
          headers: {
            Authorization: this.$store.state.user.token
          }
        }).then(function () {
          this.$router.push("/feedback");
        })
      }
    },
    created() {
      function arrayBufferToBase64(buffer) {
        let base64Flag = 'data:image/jpeg;base64,';
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return base64Flag + window.btoa(binary);
      }

      function cachedFetch(url, options) {
        let storedImage = localStorage.getItem(url);
        if (storedImage) {
          return Promise.resolve(storedImage)
        }
        else {
          return fetch(url, options)
            .then(response => response.arrayBuffer())
            .then(buffer => {
              const base64Image = arrayBufferToBase64(buffer);
              localStorage.setItem(url, base64Image);
              return Promise.resolve(base64Image);
            })
            .catch(error => {
              console.log(error);
              return Promise.reject(error);
            });

        }
      }

      const imageUrls = this.categories.reduce((imgList, category) => {
        return imgList.concat(category.nominees.map(nominee => nominee.imgUrl));
      }, []);

      Promise.all(imageUrls.map(url => cachedFetch(url, {cache: 'force-cache'})))
        .then(() => {
         this.$store.commit("setLoaded", true);
        })
        .catch(error => {
          console.log(error);
          this.$store.commit("setLoaded", true)
        });
    }
  }

</script>

<style scoped>
  @import '../css/retro.css';
  @import '../css/dashboard.css';
</style>
