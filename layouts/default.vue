<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Header from '~/components/Header.vue'

@Component({
  components: {
    Header
  }
})
export default class Default extends Vue {}
</script>
