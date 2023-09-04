<script>
  import './styles.css';
  import './vars.css';
  import Header from '../components/Header.svelte';
</script>

<div class="app">
  <Header />
  <main>
    <slot />
  </main>
</div>

<style>
  :global(.container) {
    width: 1280px;
    margin: auto;
    position: relative;
  }
</style>
