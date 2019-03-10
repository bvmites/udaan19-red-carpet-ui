<template>
  <div>
    <div class="retro-text">
      {{error}}
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    computed: mapState({
      error: (state) => state.error
    })
  }
</script>
