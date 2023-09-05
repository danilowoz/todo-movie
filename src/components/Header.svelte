<script>
  import './header.css';
  let glassSteps = new Array(50).fill(null);
</script>

<header class="app-header">
  <div class="app-header_glass">
    <div class="app-header_glass-container">
      {#each glassSteps as step}
        <div class="app-header_glass-step" />
      {/each}
    </div>
  </div>

  <div class="app-header_noise" />

  <div class="app-header_background">
    <div class="container">
      <img class="app-header_logo" src="./check.svg" />
    </div>

    <div class="app-header_light red" />
    <div class="app-header_light blue" />
    <div class="app-header_light yellow" />
  </div>

  <div class="app-header_title">
    <div class="container">
      <h1><span>Todo</span>MOVIE</h1>
      <p>Don't skip one</p>
    </div>
  </div>
</header>
