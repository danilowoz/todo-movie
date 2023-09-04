<script>
  let glassSteps = new Array(100).fill(null);
</script>

<header>
  <div class="glass">
    {#each glassSteps as step}
      <div class="glass_steps" />
    {/each}
  </div>

  <div class="noise" />

  <div class="background-elements">
    <div class="container">
      <img class="logo" src="./check.svg" />
    </div>

    <div class="light red" />
    <div class="light blue" />
    <div class="light yellow" />
  </div>

  <div class="title">
    <div class="container">
      <h1><span>Todo</span>MOVIE</h1>
      <p>Don't skip one</p>
    </div>
  </div>
</header>

<style>
  header {
    --step-width: 80px;
  }

  .background-elements {
    position: absolute;
    z-index: 1;
    inset: 0;
  }

  .logo {
    position: relative;
    left: 100px;
    top: 50px;
  }

  .glass {
    position: absolute;
    inset: 0;
    display: flex;
    z-index: 2;
    justify-content: center;
  }

  .glass_steps {
    backdrop-filter: blur(43px);
    min-width: var(--step-width);
    max-width: var(--step-width);
    height: 100%;
    filter: contrast(105%) saturate(1.2);
  }

  .noise {
    position: absolute;
    inset: 0;
    z-index: 3;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
      center;
    filter: contrast(400%) brightness(90%) saturate(0);
    mix-blend-mode: color-burn;
    opacity: 0.4;
  }

  .light {
    width: 500px;
    height: 200px;
    rotate: 45deg;
    filter: blur(200px);
  }

  .yellow {
    background-color: var(--brand-color-yellow);
    position: absolute;
    right: -200px;
    top: 300px;
    opacity: 0.2;
  }

  .blue {
    height: 400px;
    width: 500px;
    background-color: var(--brand-color-blue);
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0.15;
    rotate: 0deg;
  }

  .red {
    background-color: var(--brand-color-red);
    position: absolute;

    right: 300px;
    top: 0;
    opacity: 0.1;
  }

  .title {
    position: absolute;
    z-index: 9;
    inset: 0;
    height: var(--header-height);
    display: flex;
  }

  .title h1 {
    font-family: 'Koulen', sans-serif;
    color: white;
    font-weight: normal;
    font-size: 72px;

    padding-top: 0.5em;
    padding-left: calc(5 * var(--step-width) - 1.77em);
    line-height: 1;
    text-shadow: 0px 1px var(--brand-color-red), -1px -1px var(--brand-color-blue),
      1px 0px var(--brand-color-yellow);
    letter-spacing: 4px;
  }

  .title span {
    opacity: 0.3;
    letter-spacing: 0px;
  }

  .title p {
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-weight: normal;
    font-size: 18px;

    padding-left: 400px;
    color: var(--gray-10);
  }
</style>
