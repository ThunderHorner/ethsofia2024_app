<template>
    <div class="wallet-dialog">
      <div v-if="!wallet">
        <input v-model="walletAddress" placeholder="Enter Wallet Address" />
        <button @click="save">Save</button>
      </div>
      <div v-else>
        <p>Wallet: {{ wallet }}</p>
        <button @click="$emit('remove')">Remove Wallet</button>
        <button @click="showQR = true">Show QR Code</button>
        <WalletQR v-if="showQR" :wallet="wallet" @close="showQR = false" />
      </div>
      <button @click="$emit('close')">Close</button>
    </div>
  </template>
  
  <script>
  import WalletQR from './WalletQR.vue';
  
  export default {
    props: ['wallet'],
    data() {
      return {
        walletAddress: '',
        showQR: false,
      };
    },
    methods: {
      save() {
        this.$emit('save', this.walletAddress);
      },
    },
    components: {
      WalletQR,
    },
  };
  </script>
  