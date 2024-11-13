<script setup>
import {onMounted, ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

const deferredPrompt = ref(null);
// const isInstallButtonVisible = ref(false);
const outputText = ref('');
const isChromiumBrowser = ref(false);
const showInstallButton = ref(false)
const showPwaModalVisible = ref(false)

// Platform Detection
const isSafariMobile = /iPhone|iPad|iPod/.test(navigator.userAgent) && !!navigator.userAgent.match(/Safari/);
const isFirefoxMobile = /Android/.test(navigator.userAgent) && /Firefox/.test(navigator.userAgent);
const isFirefoxDesktop = !isFirefoxMobile && /Firefox/.test(navigator.userAgent);
const isSafariDesktop = !isSafariMobile && /Safari/.test(navigator.userAgent);

// Check browser type to determine if to show the default or custom PWA installation button
const verifyBrowserType = () => {
  if ('BeforeInstallPromptEvent' in window) {
  //  console.log("It is a Chromium Browser")
  isChromiumBrowser.value = true
  } else {
    // console.log("It is not a Chromium Browser")
    isChromiumBrowser.value = false

  }
}


// Make api call here
const installAnalytics = () => {

}

// Track installation here for non-chromiun browsers. 
// This will send analytics the first time the user opens the standalone window
const trackCustomPwaInstallation = () => {
  if (window.matchMedia('(display-mode: standalone)').matches && !localStorage.getItem('pwaInstalled') && isChromiumBrowser.value === false) {
    // Call the analytics function here

    // Test this with an alert function
    // alert("Testing to see if this alert will be called in non chromium browsers standalone display")

    // Set a flag in local storage
    localStorage.setItem('pwaInstalled', true)

    // Turn showInstallButton flag to true to hide button
    showInstallButton.value = true
  } 
}


// This will run the default PWA installation prompt on button click
const installApp = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
 
    const { outcome } = await deferredPrompt.value.userChoice;
    deferredPrompt.value = null;
    if (outcome === 'accepted') {
      showInstallButton.value = true
      console.log('😀 User accepted the install prompt.');
    } else if (outcome === 'dismissed') {
      console.log('😟 User dismissed the install prompt');
    }
    
  }
};

// This will control the custom PWA installation instructions Modal
const customPwaInstallation = () => {

}


onMounted(() => {
  verifyBrowserType();

  trackCustomPwaInstallation()

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt.value = null;
  });
});


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <button 
      @click="installApp" 
      v-if="isChromiumBrowser && !showInstallButton"
    >
      Default Install App
    </button>
    <button 
    @click="installApp" 
    v-if="isChromiumBrowser === false && !showInstallButton"
  >
    Custom Install App
  </button>
  
    <output v-html="outputText"></output>

    <div>
      This is being added to test updates to PWA!
    </div>

    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

button {
  display: block;
  font-size: 16px;
  border: 2px solid black;
  border-radius: 8px;
  padding: 16px;
  margin: 0 8px;
  text-transform: uppercase;
}

/* Hide Install button until beforeinstallprompt fires */


output {
  display: block;
  color: gray;
  margin: 32px 16px;
  text-align: center;
  border: 1px silver dashed;
  padding: 16px;
  border-radius: 16px;  
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
