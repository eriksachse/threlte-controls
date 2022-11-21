import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
// import { ThrelteControls } from "$lib/ThrelteControls.svelte";
import CameraControls from "camera-controls";
import seqPreprocessor from "svelte-sequential-preprocessor";
import { preprocessThrelte } from "@threlte/preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: seqPreprocessor([
    preprocess(),
    preprocessThrelte({
      extensions: {
        // import { CustomGrid } from '$lib/CustomGrid'
        // "$lib/ThrelteControls": [ThrelteControls],
        "camera-controls": [CameraControls],
      },
    }),
  ]),

  kit: {
    adapter: adapter(),
  },
};

export default config;
