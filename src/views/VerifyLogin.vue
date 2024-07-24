<template>
    <div class="content">
      <div class="loading">
        <div class="spinner"></div>
        <p>Verifying login...</p>
      </div>
    </div>
  </template>
  
  <style scoped>
  
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  </style>
  
<script setup>

import keys from '@/keys.json';

const { clientID, secret } = keys;

  export default {
    name: 'VerifyLogin',
    async mounted() {
      const code = this.$route.query.code;
      if (!code) {
        console.error('Authorization code not found.');
        return;
      }
      const codeVerifier = localStorage.getItem('codeVerifier');
      if (!codeVerifier) {
        console.error('Code verifier not found in localStorage.');
        return;
      }
      // Removed the console.log here as clientId and redirectUri are not defined in this scope
      await this.fetchAccessToken(code, codeVerifier);
      await this.fetchUserInfo();
  
      this.$router.push('/create');
    },
    methods: {
      async fetchAccessToken(code, codeVerifier) {

        const clientId = clientID;
        const clientSecret = secret;
        const redirectUri = 'http://localhost:5173/verifylogin';
        const body = new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        });
        try {
          const response = await fetch('https://apis.roblox.com/oauth/v1/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem('accessToken', data.access_token);
          } else {
            console.error('Error fetching access token:', data);
          }
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
      },
      async fetchUserInfo() {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found.');
          return;
        }
        try {
          const response = await fetch('https://apis.roblox.com/oauth/v1/userinfo', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            // Store user ID and username
            localStorage.setItem('userId', data.sub);
            localStorage.setItem('username', data.name);
            localStorage.setItem('userAvatar', data.picture);
          } else {
            console.error('Error fetching user info:', data);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      },
    },
  };
  </script>