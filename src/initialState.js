import data from './data.json';

export default function() {
  return {
    user: {
      name: null,
      password: null,
      token: null
    },
    index: 0,
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
  }
};
