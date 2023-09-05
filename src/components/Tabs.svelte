<script>
  import './tabs.css';

  let items = ['Default', 'Last added', 'Unseen'];
  let current = items[0];
</script>

<div>
  <nav class="app-nav">
    {#each items as item}
      <button class="app-nav_item" class:app-nav_item--active={current === item}>{item}</button>
    {/each}
  </nav>
</div>
