import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import data from '../data.json';
export const store = new Vuex.Store({
  state: {
    user: {
      name: null,
      password: null,
      token: null
    },
    index: 0,
    loaded: false,
    feedback: {
      name: null,
      rating: null,
      comment: null
    },
    votes: data.categories.map(function (c) {
      return {
        title: c.title,
        _id: c._id,
        nominees: {
          name: null,
          _id: null
        }
      }
    }),
    categories: data.categories,
    error: null
  },
  mutations: {
    storeName: (state, payload) => {
      state.user.name = payload;
    },
    storePass: (state, payload) => {
      state.user.password = payload;
    },
    storeToken: (state, payload) => {
      state.user.token = payload;
    },
    storeFeedback: (state, payload) => {
      state.feedback.comment = payload;
    },
    setRating: (state, payload) => {
      state.feedback.rating = payload;
    },
    setName: (state, payload) => {
      state.feedback.name = payload;
    },
    incrementIndex: (state) => {
      state.index++;
    },
    decrementIndex: (state) => {
      state.index--;
    },
    setLoaded: (state, payload) => {
      state.loaded = payload;
    },
    addFinalist: (state, payload) => {
      state.votes[state.index].nominees.name = payload.name;
      state.votes[state.index].nominees._id= payload.id;
    },
    storeError: (state, payload) => {
      state.error = payload;
    },
    resetState: (state, payload) => {
      for (let k in state) {
        state[k] = payload[k];
      }
    }
  }
});
