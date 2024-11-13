<template>
    <div v-if="step === 1">
      <!-- Step 1: Initial Form -->
      <h2>Step 1: Fill the Form</h2>
      <form @submit.prevent="submitForm">
        <label>
          First Name:
          <input type="text" v-model="formData.firstName" />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" v-model="formData.lastName" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  
    <div v-else-if="step === 2">
      <!-- Step 2: Actions -->
      <h2>Step 2: Choose an Action</h2>
      <p>First Name: {{ formData.firstName }}</p>
      <p>Last Name: {{ formData.lastName }}</p>
      
      <button @click="redirectToPayment">Proceed to Payment</button>
      <button @click="openAdditionalForm">Collect More Data</button>
      <button @click="fetchUserData">Fetch Data</button>
      
      <br /><br />
      <button @click="goBack">Go Back</button>
    </div>
  
    <div v-else-if="step === 2.5">
      <!-- Additional Form for More Data -->
      <h2>Additional Data Form</h2>
      <label>
        Additional Info:
        <input type="text" v-model="formData.additionalInfo" />
      </label>
      <br />
      <button @click="submitAdditionalData">Submit Additional Data</button>
      <button @click="goBackToStep2">Cancel</button>
    </div>
  
    <div v-else-if="step === 3">
      <!-- Step 3: Final Display -->
      <h2>Step 3: Summary</h2>
      <p>First Name: {{ formData.firstName }}</p>
      <p>Last Name: {{ formData.lastName }}</p>
      <p>Additional Info: {{ formData.additionalInfo }}</p>
      <p v-if="userData">Fetched User Data: {{ userData }}</p>
      <button @click="goBack">Go Back to Edit</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const step = ref(1)
  
  // Form state
  const formData = ref({
    firstName: '',
    lastName: '',
    additionalInfo: ''
  })
  
  // Simulate fetched user data
  const userData = ref('')
  
  // Step 1 submission
  function submitForm() {
    step.value = 2
  }
  
  // Redirect to payment gateway (simulated)
  function redirectToPayment() {
    window.location.href = 'https://mockpaymentgateway.com'
  }
  
  // Open additional form
  function openAdditionalForm() {
    step.value = 2.5
  }
  
  // Submit additional data and return to Step 3
  function submitAdditionalData() {
    step.value = 3
  }
  
  // Fetch data from backend (simulated)
  async function fetchUserData() {
    // Simulate backend delay
    userData.value = 'Loading...'
    await new Promise(resolve => setTimeout(resolve, 1000))
    userData.value = 'Fetched data for user ' + formData.value.firstName + ' ' + formData.value.lastName
    step.value = 3
  }
  
  // Go back to Step 1 with data intact
  function goBack() {
    step.value = 1
  }
  
  // Cancel additional data form and return to Step 2
  function goBackToStep2() {
    step.value = 2
  }
  </script>
  
  <style scoped>
  form, button {
    margin-bottom: 1rem;
  }
  button {
    margin-right: 1rem;
  }
  </style>
  