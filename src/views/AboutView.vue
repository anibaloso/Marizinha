<script>
import vueFilePond from 'vue-filepond';
export default {
  name: 'app',
  components: {
    FilePond: vueFilePond()
  }
}
</script>
<template>
  <div class="row">
    <div class="col border">
      <input type="file" class="filepond" multiple name="filepond" />
    </div>
  </div>
  <div id="app">
    <FilePond allowMultiple="true" />
  </div>
</template>

<style></style>
