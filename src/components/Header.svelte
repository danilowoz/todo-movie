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
      <svg
        class="app-header_logo"
        width="304"
        viewBox="0 0 304 294"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M300.567 117.878L128.929 293.905L29.6407 195.829L68.5087 155.949L128.929 215.448L268.509 79.9482L300.567 117.878Z"
          fill="var(--brand-color-yellow)"
        />
        <path
          d="M271.567 100.856L99.9287 276.884L0.640664 178.807L39.5087 138.928L99.9287 198.427L239.509 62.9268L271.567 100.856Z"
          fill="var(--brand-color-red)"
        />
        <path
          d="M285.567 104.878L113.929 280.905L14.6407 182.829L53.5087 142.949L113.929 202.448L253.509 66.9482L285.567 104.878Z"
          fill="var(--brand-color-blue)"
        />
      </svg>
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
