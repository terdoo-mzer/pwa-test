<template>
  <div
    v-if="showOnboarding"
    class="w-full h-screen flex flex-col justify-between items-center bg-white p-4"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Slide Content -->
    <div class="flex-1 w-full flex flex-col items-center justify-center">
      <!-- Placeholder for SVG image -->
      <div class="w-32 h-32 mb-4">
        <!-- SVG image will go here -->
      </div>
      <!-- Textbox -->
      <p class="text-center text-gray-700 text-lg">
        {{ slideContent[currentSlide].text }}
      </p>
    </div>

    <!-- Progress Indicators -->
    <div class="flex space-x-2 mb-4">
      <div
        v-for="(step, index) in slideContent"
        :key="index"
        :class="[
          'h-2 w-2 rounded-full transition-all duration-300',
          currentSlide === index ? 'w-4 h-2 bg-black rounded-full' : 'bg-gray-300'
        ]"
      ></div>
    </div>

    <!-- Buttons -->
    <div class="w-full flex flex-col items-center space-y-2 mb-6">
      <!-- Next / Learn More Button -->
      <button
        @click="handleNext"
        class="bg-blue-500 text-white py-2 px-6 rounded-full w-3/4 text-center"
      >
        {{ currentSlide < slideContent.length - 1 ? 'Next' : 'Learn More' }}
      </button>

      <!-- Login Button -->
      <button
        @click="goToLogin"
        class="text-blue-500 underline w-3/4 text-center"
      >
        Login
      </button>
    </div>

   
  </div>
  <RouterView v-else />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { RouterView } from 'vue-router';

// Define the content for each slide
const slideContent = [
  { text: "Welcome to our app! Discover amazing features to simplify your tasks." },
  { text: "Stay organized and connected with our seamless integrations." },
  { text: "Join now to start your journey with us!" }
];

const currentSlide = ref(0);
const showOnboarding = ref(false); // Controls onboarding screen visibility
const router = useRouter()

// Function to detect if app is running as PWA in standalone mode
const isPWAStandalone = () => window.matchMedia('(display-mode: standalone)').matches;

// Detect if it's a mobile device
const isMobile = () => window.innerWidth <= 768;

// Check if the onboarding screen should be shown
const checkOnboardingStatus = () => {
  const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
  if (!hasSeenOnboarding && isPWAStandalone() && isMobile()) {
    // alert(1234)
    console.log("Not On the pwas")
    //!hasSeenOnboarding && isPWAStandalone() && isMobile()
    showOnboarding.value = true;
  }
};

// Mark the onboarding as completed
const markOnboardingCompleted = () => {
  localStorage.setItem('hasSeenOnboarding', 'true');
  showOnboarding.value = false;
  console.log("Navigating to Login Screen...");
  router.push('/')
};

// Handle the Next / Learn More button click
const handleNext = () => {
  if (currentSlide.value < slideContent.length - 1) {
    currentSlide.value++;
  } else {
    markOnboardingCompleted();
  }
};

// Function to go to the login screen
const goToLogin = () => {
  markOnboardingCompleted();
  console.log("Navigating to Login Screen...");
};

// Swipe handling (for mobile swipes)
let touchStartX = 0;

const handleTouchStart = (event) => {
  touchStartX = event.touches[0].clientX;
};

const handleTouchEnd = (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  if (touchStartX - touchEndX > 50) {
    // Swipe left (next slide)
    if (currentSlide.value < slideContent.length - 1) {
      currentSlide.value++;
    } else {
      return false
    }
  } else if (touchEndX - touchStartX > 50) {
    // Swipe right (previous slide)
    if (currentSlide.value > 0) {
      currentSlide.value--;
    }
  }
};

// Run checks on component mount
onMounted(() => {
  window.addEventListener('touchstart', handleTouchStart, { passive: true });   
  window.addEventListener('touchend', handleTouchEnd, { passive: true });
  checkOnboardingStatus();
});

</script>

<style scoped>
/* Add custom styling if needed */
</style>
