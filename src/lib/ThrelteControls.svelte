<script>
  import * as THREE from "three";
  import CameraControls from "camera-controls";
  import { useFrame, useThrelte, T, Three, useParent } from "@threlte/core";
  import { onMount } from "svelte";
  // import { writable, readable } from "svelte/store";
  // const cameraControls = writable();

  export let cameraControls;
  let mounted = false;

  const camera = useParent();
  const { renderer } = useThrelte();
  onMount(() => {
    CameraControls.install({ THREE: THREE });
    cameraControls = new CameraControls($camera, renderer.domElement);
  });
  useFrame(({ clock }) => {
    cameraControls.update(clock.elapsedTime);
  });
</script>
