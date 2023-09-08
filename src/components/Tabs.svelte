<script>
  import './tabs.css';

  let items = ['Default', 'Last added', 'Unseen'];
  let current = items[0];

  let leftPosition = 4;
  let rightPosition = 159;

  function setActiveItem({ target }) {
    current = target.innerText;

    leftPosition = target.offsetLeft;
    rightPosition = target.parentElement.offsetWidth - target.offsetLeft - target.offsetWidth;
  }
</script>

<div class="app-nav_container">
  <nav class="app-nav" style="--left: {leftPosition}px; --right: {rightPosition}px;">
    {#each items as item}
      <button
        on:click={setActiveItem}
        class="app-nav_item"
        class:app-nav_item--active={current === item}>{item}</button
      >
    {/each}
  </nav>
</div>
