<script>
  import Tabs from '../components/Tabs.svelte';
  import Stage from '../components/Stage.svelte';
  import Search from '../components/Search.svelte';
</script>

<Stage>
  <Tabs />

  <div class="app-content">
    <Search />
  </div>
</Stage>

<style>
  .app-content {
    padding: 60px 80px 120px;
  }
</style>
