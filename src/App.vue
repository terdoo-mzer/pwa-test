<script setup>
import {onMounted, ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const deferredPrompt = ref(null);
const installButtonVisible = ref(false);
const outputText = ref('');

const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
if (isFirefox && !window.matchMedia('(display-mode: standalone)').matches) {
    alert("For a better experience, add this app to your home screen.");
}

const showResult = (text, append = false) => {
  if (append) {
    outputText.value += "\n" + text;
  } else {
    outputText.value = text;
  }
};

const installApp = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    showResult("🆗 Installation Dialog opened");
    
    const { outcome } = await deferredPrompt.value.userChoice;
    deferredPrompt.value = null;
    
    if (outcome === 'accepted') {
      showResult('😀 User accepted the install prompt.', true);
    } else if (outcome === 'dismissed') {
      showResult('😟 User dismissed the install prompt');
    }
    
    installButtonVisible.value = false;
  }
};


onMounted(() => {
  if ('BeforeInstallPromptEvent' in window) {
    showResult("⏳ BeforeInstallPromptEvent supported but not fired yet");
  } else {
    showResult("❌ BeforeInstallPromptEvent NOT supported");    
  }
});

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt.value = e;
  installButtonVisible.value = true;
  showResult("✅ BeforeInstallPromptEvent fired", true);
});

window.addEventListener('appinstalled', () => {
  showResult("✅ AppInstalled fired", true);
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <button 
      @click="installApp" 
      v-show="installButtonVisible"
      id="install"
    >
      Install App
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
