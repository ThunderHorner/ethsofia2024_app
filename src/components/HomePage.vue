<template>
  <div class="container mt-5">
    <h1>Welcome to PoPIT</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Purchases</h5>
            <p class="card-text">View your purchases and transaction history.</p>
            <router-link to="/purchases" class="btn btn-primary">Go to Purchases</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Guarantees</h5>
            <p class="card-text">Check your guarantees and warranty information.</p>
            <router-link to="/guarantees" class="btn btn-primary">Go to Guarantees</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.card {
  margin-bottom: 20px; /* Space between cards */
}
</style>
