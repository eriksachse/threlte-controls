<script>
  import * as THREE from "three";
  import ThrelteMapControls from "$lib/ThrelteControls.svelte";
  import { Canvas, InteractiveObject, OrbitControls, T } from "@threlte/core";
  import { spring } from "svelte/motion";
  import { degToRad } from "three/src/math/MathUtils";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  const scale = spring(1);
  let cameraControls;
  onMount(() => {});
</script>

<div id="ui">
  {#if cameraControls}
    <button
      on:click={cameraControls.rotate(45 * THREE.MathUtils.DEG2RAD, 0, true)}
      >rotate theta 45deg</button
    >
  {/if}
</div>
<div id="canvas">
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[0, 40, 0]}
      fov={24}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <ThrelteMapControls cameraControls={cameraControls} />
    </T.PerspectiveCamera>
    <T.DirectionalLight castShadow position={[3, 10, 10]} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    <!-- Cube -->
    <T.Group scale={$scale}>
      <T.Mesh position.y={0.5} castShadow let:ref>
        <!-- Add interaction -->
        <InteractiveObject
          object={ref}
          interactive
          on:pointerenter={() => ($scale = 2)}
          on:pointerleave={() => ($scale = 1)}
        />

        <T.BoxGeometry />
        <T.MeshStandardMaterial color="#333333" />
      </T.Mesh>
    </T.Group>

    <!-- Floor -->
    <T.Mesh receiveShadow rotation.x={degToRad(-90)}>
      <T.CircleGeometry args={[3, 72]} />
      <T.MeshStandardMaterial color="white" />
    </T.Mesh>
  </Canvas>
</div>

<style>
  #ui {
    position: absolute;
  }
  #canvas {
    height: 100%;
  }
</style>
