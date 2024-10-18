<template>
    <div class="container mt-5">
      <button class="btn btn-secondary mb-3" @click="goBack">Back</button>
      <h2>Guarantees</h2>
      <div v-if="contracts.length > 0">
        <div v-for="(contract, index) in contracts" :key="index">{{ contract.address }}</div>
      </div>
      <p v-else>No records found.</p>
    </div>
  </template>
  
  <script>
  import { ethers } from 'ethers';
  
  export default {
    name: 'GuaranteesPage',
    props: ['wallet'],
    data() {
      return {
        contracts: [],
      };
    },
    async mounted() {
      if (this.wallet) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const logs = await provider.getLogs({ address: this.wallet });
        this.contracts = logs;
      }
    },
    methods: {
      goBack() {
        this.$router.push('/'); // Navigate back to the homepage or other page
      },
    },
  };
  </script>
  
<style scoped>
/* Add some padding and spacing for better UI */
.container {
  padding-top: 20px;
}

.mb-3 {
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 20px;
}

.modal-title {
  font-weight: bold;
}
</style>