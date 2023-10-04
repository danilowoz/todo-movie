<script>
  import './tabs.css';
  import { onMount } from 'svelte';
  import { preferences } from '../store/preferences';

  let items = ['Rate', 'Last added', 'Unseen'];
  let current = items[0];

  let leftPosition = 4;
  let rightPosition = 205;

  function setActiveItem({ target }) {
    current = target.innerText;

    leftPosition = target.offsetLeft;
    rightPosition = target.parentElement.offsetWidth - target.offsetLeft - target.offsetWidth;

    preferences.update((prev) => ({ ...prev, tab: current }));
  }

  onMount(() => {
    current = $preferences.tab;

    document.querySelector(`.app-nav_item[data-tab-name="${current}"]`).click();
  });
</script>

<div class="app-nav_container">
  <nav class="app-nav" style="--left: {leftPosition}px; --right: {rightPosition}px;">
    {#each items as item}
      <button
        on:click={setActiveItem}
        class="app-nav_item"
        data-tab-name={item}
        class:app-nav_item--active={current === item}>{item}</button
      >
    {/each}
  </nav>
</div>
