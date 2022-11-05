<script lang="ts">
  import App from "$lib/solid/App";
  import { mountSolid } from "$lib/solid/mount";
  import { writable, type Writable } from "svelte/store";

  let count = 0;
  const d = writable("0");
  const text = writable("Fooo");
  function testWritable<T extends Record<string, unknown>>(
    node: HTMLElement,
    params: { [X in keyof T]: Writable<T[X]> }
  ) {
    params.d.subscribe(v => (node.textContent = v as string));
  }
</script>

<div>
  <h1>Show me what you got</h1>
  <input class="text-black" type="text" bind:value={$text} />
  <button use:testWritable={{ d }} on:click={() => count++}>Svelte counter = {count}</button>

  <!-- solid -->
  <!-- Async import is only necessary when ssr = true -->
  <!-- {#await import("$lib/solid/App") then { default: App }} -->
  <div use:mountSolid={{ App, props: { text } }} />
  <!-- {/await} -->
</div>

<svelte:head>
  <title>Solid + Svelte</title>
</svelte:head>
