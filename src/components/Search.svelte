<script lang="ts">
  import './search.css';
  import { createCancellableFetch, createAPI } from '../utils/fetch';

  const cancellableFetch = createCancellableFetch();

  let query = '';
  let predictTerm = null;
  let cursorOffset = 0;
  let results = [];

  async function search(query) {
    try {
      const data = await cancellableFetch(createAPI({ search: query }));

      if (data.Search && data.Search[0].Title.match(new RegExp('^' + query, 'gi'))) {
        predictTerm = data.Search[0];
      }

      results = data.Search ? data.Search.slice(1, 6) : [];
    } catch (error) {
      console.error(error);
    }
  }

  function tabHandler(event) {
    const { code, preventDefault } = event;
    if (code === 'Tab' || code === 'Enter') {
      query = predictTerm?.Title;
      predictTerm = null;

      search(query);
      preventDefault();
    } else if (code === 'Escape') {
      console.log('Escape');
    } else if (code === 'ArrowUp') {
      console.log('ArrowUp');
    } else if (code === 'ArrowDown') {
      console.log('ArrowDown');
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

  let inputFocused = false;
  let selectionOpacity = 0;
  function onBlur() {
    selectionOpacity = 0;
    disposeTabHandler();
    inputFocused = false;
  }

  function onFocus() {
    selectionOpacity = 1;
    window.addEventListener('keydown', tabHandler);
    inputFocused = true;
  }

  let topOffset = 0;
  function onMouseOverResult(event) {
    let target = event.target;
    if (!event.target.classList.contains('app-search_result')) {
      target = event.target.parentElement;
    }

    topOffset = target.offsetTop;
    selectionOpacity = 1;
  }

  function onMouseOutResult() {
    topOffset = 0;
    if (!inputFocused) {
      selectionOpacity = 0;
    }
  }
</script>

<div
  class="app-search_container"
  style="--selection-offset: {topOffset}px; --selection-opacity: {selectionOpacity}"
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
      <div
        on:mouseover={onMouseOverResult}
        on:mouseout={onMouseOutResult}
        class="app-search_result"
      >
        {#each result.Title.split(new RegExp(`(${query})`, 'gi')) as part}
          <span on:mouseover on:mouseout class:query={part === query}>{part}</span>
        {/each}
      </div>
    {/if}
  {/each}
</div>
