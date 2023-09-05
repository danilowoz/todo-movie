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
