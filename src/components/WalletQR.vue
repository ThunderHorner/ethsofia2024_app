<template>
    <div class="qr-code">
      <qrcode-vue :value="wallet" size="200" />
      <button @click="$emit('close')">Close</button>
    </div>
  </template>
  
  <script>
  import QrcodeVue from 'qrcode.vue';
  
  export default {
    props: ['wallet'],
    components: {
      QrcodeVue,
    },
  };
  </script>
  