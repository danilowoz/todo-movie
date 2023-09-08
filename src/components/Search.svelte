<script lang="ts">
  import './search.css';

  let controller = new AbortController();
  let signal = controller.signal;

  let query = '';
  let predictTerm = null;
  let cursorOffset = 0;
  let results = [];

  async function search(query) {
    try {
      // abort previous request
      controller.abort();

      // reassign signal
      controller = new AbortController();
      signal = controller.signal;

      const response = await fetch(`https://www.omdbapi.com/?s=${query.trim()}&apikey=7ab33eb9`, {
        signal
      });
      const data = await response.json();

      if (data.Search && data.Search[0].Title.match(new RegExp('^' + query, 'gi'))) {
        predictTerm = data.Search[0];
      }

      results = data.Search ? data.Search.slice(1, 6) : [];
    } catch (error) {
      console.error(error);
    }
  }

  function tabHandler(event) {
    if (event.code === 'Tab') {
      query = predictTerm?.Title;
      predictTerm = null;

      search(query);
      event.preventDefault();
    }
  }

  function disposeTabHandler() {
    window.removeEventListener('keydown', tabHandler);
  }

  function onSearch(event: Event) {
    const { target } = event;
    query = target.value;

    const queryWidth = document.querySelector('.app-search_query').getBoundingClientRect().width;
    cursorOffset = queryWidth + 4;
    predictTerm = '';

    search(query);
  }

  let focused = false;
  let selectionOpacity = 0;
  function onBlur() {
    selectionOpacity = 0;
    disposeTabHandler();
    focused = false;
  }

  function onFocus() {
    selectionOpacity = 1;
    window.addEventListener('keydown', tabHandler);
    focused = true;
  }

  let topOffeset = 0;
  function setSelection(event) {
    topOffeset = event.target.offsetTop;
    selectionOpacity = 1;
  }

  function setInitialPosition() {
    topOffeset = 0;
    if (!focused) {
      selectionOpacity = 0;
    }
  }
</script>

<div
  class="app-search_container"
  style="--selection-offset: {topOffeset}px; --selection-opacity: {selectionOpacity}"
>
  <div class="app-search" style="--cursor-offset: {cursorOffset}px">
    <input
      bind:value={query}
      on:input={onSearch}
      on:focus={onFocus}
      on:blur={onBlur}
      type="search"
      placeholder="Search..."
    />
    <span class="app-search_query">{query}</span>
    {#if predictTerm}
      <span class="app-search_predict"
        >{predictTerm.Title.replace(new RegExp(query, 'gi'), '')}</span
      >
    {/if}
  </div>

  {#each results as result}
    {#if result.Title}
      <div on:mouseover={setSelection} on:mouseout={setInitialPosition} class="app-search_result">
        {result.Title}
      </div>
    {/if}
  {/each}
</div>
