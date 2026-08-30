import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: [
        vitePreprocess(), 
        mdsvex({
            extensions: ['.md']
        })
    ],

    extensions: ['.svelte', '.md'],

    kit: {
        adapter: adapter({
            fallback: 'barista-toolkit'
        }),
        paths: {
            base: process.argv.includes('dev') ? '/barista-tool' : process.env.BASE_PATH
        },
    }
};

export default config;
