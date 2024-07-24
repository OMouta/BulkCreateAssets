<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { onMounted } from 'vue';

    import keys from '@/keys.json';

    const { clientID, secret } = keys;

    const isAuthenticated = ref(false);
    const router = useRouter();

    function base64UrlEncode(str) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    function generateCodeVerifier() {
        const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        let array = new Uint8Array(43); // Minimum length
        window.crypto.getRandomValues(array);
        array = array.map(x => validChars.charCodeAt(x % validChars.length));
        return String.fromCharCode.apply(null, array);
    }

    async function generateCodeChallenge(codeVerifier) {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return base64UrlEncode(digest);
    }

    function generateState() {
        const array = new Uint8Array(32);
        window.crypto.getRandomValues(array);
        return base64UrlEncode(array);
    }

    const handleLogin = async () => {
        if (!isAuthenticated.value) {
            const codeVerifier = generateCodeVerifier();
            localStorage.setItem('codeVerifier', codeVerifier);

            let redirectUri = '';

            if (import.meta.env.MODE === 'development') {
                redirectUri = 'http://localhost:5173/verifylogin';
            } else {
                redirectUri = 'https://roblox-api-frontend.vercel.app/verifylogin';
            }

            const scope = encodeURIComponent('openid profile');
            const responseType = 'code';
            const codeChallenge = await generateCodeChallenge(codeVerifier);
            const codeChallengeMethod = 'S256';
            const state = generateState();

            const authUrl = `https://apis.roblox.com/oauth/v1/authorize?client_id=${clientID}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}`;

            window.location.href = authUrl;
        } else {
            isAuthenticated.value = false;
            router.push('/');
        }
    };

    onMounted(() => {
        handleLogin()
    });
</script>

<template>
</template>