<template>
  <div class="container mt-5">
    <button class="btn btn-secondary mb-3" @click="goBack">Back</button>
    <h2>Your Purchases</h2>
    
    <div class="row">
      <div
        v-for="(purchase, index) in purchases"
        :key="index"
        class="col-12 col-sm-6 col-md-4 mb-3"
      >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ purchase.productName }}</h5>
            <p class="card-text">
              <strong>Product ID:</strong> {{ purchase.productId }}<br>
              <strong>Price:</strong> {{(parseInt(purchase.price) / 100).toFixed(2)}}  {{ purchase.currency }}<br>
              <strong>Seller:</strong> {{ purchase.sellerName }}
            </p>
            <!-- View Details Button -->
            <button class="btn btn-primary" @click="viewDetails(purchase)">View Details</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="purchases.length === 0 && !error" class="alert alert-info">No purchases found</div>
 
    <!-- Modal for purchase details -->
  <div class="modal fade show" v-if="selectedPurchase" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Purchase Details</h5>
            <button type="button" class="btn-close" @click="closeDetails"></button>
          </div>
          <div class="modal-body">
            <p><strong>Product Name:</strong> {{ selectedPurchase.productName }}</p>
            <p><strong>Product ID:</strong> {{ selectedPurchase.productId }}</p>
            <p><strong>Price:</strong> {{ (parseInt(selectedPurchase.price) / 100).toFixed(2) }} {{ selectedPurchase.currency }}</p>
            <p><strong>Seller:</strong> {{ selectedPurchase.sellerName }}</p>
            <p><strong>Seller Address:</strong> {{ selectedPurchase.seller }}</p>
            <p><strong>Purchase Date:</strong> {{ new Date(Number(selectedPurchase.purchaseDate) * 1000).toLocaleString() }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDetails">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Contract } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';

export default {
  data() {
    return {
      purchases: [], // Array to hold purchase data
      walletAddress: '', // This should be set when the wallet is connected
      error: null, // To hold error messages
      selectedPurchase: null,
    };
  },
  mounted() {
    // Read wallet address from local storage when component is mounted
    this.walletAddress = localStorage.getItem('walletAddress') || ''; // Default to an empty string if not found
    this.fetchPurchases();
  },
  methods: {
    async fetchPurchases() {
      if (!this.walletAddress) {
        this.error = 'Please connect your wallet first.';
        return;
      }

      try {
        const provider = new JsonRpcProvider('https://hardhat.elunesoft.com'); // Your local node URL
        const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; // Replace with your contract address

        const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "purchaseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "productId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "productName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "currency",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "sellerName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "purchaseDate",
          "type": "uint256"
        }
      ],
      "name": "PurchaseCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_productId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "productName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "currency",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_buyer",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "sellerName",
          "type": "string"
        }
      ],
      "name": "createPurchase",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPurchaseCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_buyer",
          "type": "address"
        }
      ],
      "name": "getPurchasesByBuyer",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "productId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "currency",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "sellerName",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "purchaseDate",
              "type": "uint256"
            }
          ],
          "internalType": "struct PurchaseOrder.Purchase[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

        const contract = new Contract(contractAddress, abi, provider);

        // Fetch the purchases using the connected wallet address
        const purchaseData = await contract.getPurchasesByBuyer(this.walletAddress);

        // Convert and store the purchase data
        this.purchases = purchaseData.map(purchase => ({
          productId: purchase.productId,
          productName: purchase.productName,
          currency: purchase.currency,
          price: purchase.price,
          buyer: purchase.buyer,
          sellerName: purchase.sellerName,
          seller: purchase.seller,
          purchaseDate: purchase.purchaseDate
        }));
      } catch (error) {
        this.error = 'Error fetching purchases: ' + error.message;
        console.error('Error fetching purchases:', error);
      }
    },

    viewDetails(purchase) {
      // Set the selected purchase and open the modal
      this.selectedPurchase = purchase;
    },
    closeDetails() {
      // Close the modal by resetting the selectedPurchase
      this.selectedPurchase = null;
    },
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
