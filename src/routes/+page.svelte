<script>
  import Tabs from '../components/Tabs.svelte';
  import Stage from '../components/Stage.svelte';
  import Search from '../components/Search.svelte';
  import Movies from '../components/Movies.svelte';
</script>

<Stage>
  <Tabs />

  <div class="app-content">
    <Search />

    <Movies />
  </div>
</Stage>

<style>
  .app-content {
    padding: calc(var(--step-width) * 1) calc(var(--step-width) * 2);
  }
</style>
