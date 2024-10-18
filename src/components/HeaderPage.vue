<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src="logo.png" alt="Logo"  class="d-inline-block align-text-top me-2 logo">
          <span>PoPIT</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Dropdown for Wallet -->
          <div class="dropdown ms-auto">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="walletDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Wallet
            </button>
            <ul class="dropdown-menu" aria-labelledby="walletDropdown">
              <li v-if="!walletAddress">
                <a class="dropdown-item" href="#" @click="addWallet">Add Wallet Address</a>
              </li>
              <li v-else>
                <a class="dropdown-item" href="#" @click="showWallet">Show Wallet</a>
                <a class="dropdown-item" href="#" @click="removeWallet">Remove Wallet</a>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </nav>

  <!-- Input for adding wallet address -->
  <div v-if="addingWallet" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Enter Wallet Address</h5>
          <button type="button" class="btn-close" @click="addingWallet = false"></button>
        </div>
        <div class="modal-body">
          <input type="text" v-model="newWalletAddress" class="form-control" placeholder="Wallet Address" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="addingWallet = false">Cancel</button>
          <button type="button" class="btn btn-primary" @click="saveWallet">Save</button>
        </div>
      </div>
    </div>
  </div>

  <!-- QR Code Display -->
  <div v-if="showingQR" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Your Wallet QR Code</h5>
          <button type="button" class="btn-close" @click="showingQR = false"></button>
        </div>
        <div class="modal-body text-center">
          <img :src="qrCodeDataUrl" alt="QR Code" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showingQR = false">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
  data() {
    return {
      walletAddress: '', // Holds the wallet address input
      addingWallet: false, // Controls whether the add wallet modal is shown
      newWalletAddress: '', // Holds the new wallet address input
      showingQR: false, // Controls whether the QR code modal is shown
      qrCodeDataUrl: '', // Holds the QR code data URL
    };
  },
  methods: {
    addWallet() {
      this.addingWallet = true; // Show the modal to add wallet address
    },
    showWallet() {
      this.walletAddress = localStorage.getItem('walletAddress');
      this.generateQRCode(this.walletAddress); // Generate QR code
      this.showingQR = true; // Show the QR code modal
    },
    removeWallet() {
      localStorage.removeItem('walletAddress');
      this.walletAddress = '';
      alert('Wallet address removed!');
    },
    saveWallet() {
      localStorage.setItem('walletAddress', this.newWalletAddress);
      this.walletAddress = this.newWalletAddress; // Update the local variable
      this.newWalletAddress = ''; // Clear the input field
      this.addingWallet = false; // Hide the modal after saving
      alert("Wallet address saved!");
    },
    generateQRCode(address) {
      QRCode.toDataURL(address)
        .then(url => {
          this.qrCodeDataUrl = url; // Set QR code data URL
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.walletAddress = localStorage.getItem('walletAddress'); // Load wallet address on mount
  },
};
</script>

<style scoped>

.bg-light {
  background-color: #19113d !important;
}
.container-fluid {
 padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.modal-fullscreen .modal-content {
  width: 100vw; /* Full screen width */
  max-width: 100%; /* Ensure no extra margin */
  height: 100vh; /* Full screen height */
}

.modal-body {
  overflow-y: auto; /* Ensure scroll for long content */
}

.card {
  width: 100%; /* Ensure cards take full width */
  max-width: 100%;
  margin-bottom: 20px;
}

.navbar .dropdown-menu {
  position: absolute;
  right: 0; /* Align the dropdown to the right edge of its parent */
  left: auto; /* Ensure it doesn't go outside the screen on the left */
  min-width: 200px; /* Set a minimum width for the dropdown */
  max-width: 100vw; /* Prevent the dropdown from exceeding the viewport width */
  transform: translateX(0); /* Default horizontal translation */
  overflow-x: hidden; /* Prevent any horizontal scroll */
}

.logo {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

a span {
  color: white;
  font-size: 26pt;
  padding-top: 20%;
   vertical-align: middle;
 }

.navbar-toggler-icon {
  filter: brightness(0) invert(1); /* White icon */
}
 
@media (max-width: 767px) {
  .navbar .dropdown-menu {
    right: 10px; /* Add some space from the right edge on smaller screens */
    width: auto;
  }
}
</style>
