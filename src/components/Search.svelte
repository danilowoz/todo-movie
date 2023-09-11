<script lang="ts">
  import { onMount } from 'svelte';
  import './search.css';
  import { createCancellableFetch, createAPI } from '../utils/fetch';

  const cancellableFetch = createCancellableFetch();

  let query = '';
  let predictTerm = null;
  let cursorOffset = 0;
  let results = [];
  $: resultItemIndexSelected = -1;

  function onInput(event: Event) {
    const { target } = event;

    query = target.value;

    const queryWidth = document.querySelector('.app-search_query').getBoundingClientRect().width;
    cursorOffset = queryWidth + 5;
    predictTerm = '';

    search(query);
  }

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

  function keyHandler(event) {
    const { code, preventDefault } = event;
    if (code === 'Tab' || code === 'Enter') {
      if (resultItemIndexSelected !== -1) {
        query = results[resultItemIndexSelected]?.Title;
      } else {
        query = predictTerm?.Title;
      }

      predictTerm = null;

      goToTop();
      search(query);

      preventDefault();
    } else if (code === 'Escape') {
      goToTop();
    } else if (code === 'ArrowUp') {
      if (resultItemIndexSelected !== -1) {
        resultItemIndexSelected -= 1;
        onSelectedChange(resultItemIndexSelected);
      }
    } else if (code === 'ArrowDown') {
      if (resultItemIndexSelected !== results.length - 1) {
        resultItemIndexSelected += 1;
        onSelectedChange(resultItemIndexSelected);
      }
    }
  }

  function onSelectedChange(index: number) {
    let currentResult = document.querySelector(`.app-search_result:nth-child(${index + 1})`);

    if (currentResult) {
      onMouseOverResult({ target: currentResult });
    } else {
      onMouseOutResult();
    }
  }

  function disposeKeyHandler() {
    window.removeEventListener('keydown', keyHandler);
  }

  let inputFocused = false;
  let selectionOpacity = 0.25;
  let topOffset = 0;

  function resetInterfaceState() {
    selectionOpacity = 0.25;
    inputFocused = false;
    results = [];

    goToTop();
    disposeKeyHandler();
  }

  function onSearchFocus() {
    selectionOpacity = 1;
    window.addEventListener('keydown', keyHandler);
    inputFocused = true;
  }

  function onMouseOverResult(event) {
    let target = event.target;
    if (!event.target.classList.contains('app-search_result')) {
      target = event.target.parentElement;
    }

    topOffset = target.offsetTop;
    selectionOpacity = 1;
  }

  function onMouseOutResult() {
    goToTop();

    if (!inputFocused) {
      selectionOpacity = 0.25;
    }
  }

  function goToTop() {
    topOffset = 0;
    resultItemIndexSelected = -1;
  }
</script>

<label class="app-search_label" for="search"
  >Add a movie
  {#if inputFocused && predictTerm}
    <small>Press enter to select</small>
  {/if}
</label>
<div
  class="app-search_container"
  style="--selection-offset: {topOffset}px; --selection-opacity: {selectionOpacity}"
  on:mousemove={(event) => {
    if (!inputFocused) {
      selectionOpacity = 0.5;
    }
  }}
  on:mouseout={() => {
    if (!inputFocused) {
      selectionOpacity = 0.25;
    }
  }}
>
  <div class="app-search" style="--cursor-offset: {cursorOffset}px">
    <input
      id="search"
      bind:value={query}
      on:input={onInput}
      on:focus={onSearchFocus}
      on:blur={resetInterfaceState}
      on:keydown={(event) => {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
          event.preventDefault();
        }
      }}
      type="search"
      placeholder="Search..."
    />
    <span class="app-search_query">{query}</span>
    {#if predictTerm}
      <span class="app-search_predict">
        {predictTerm.Title.replace(new RegExp(query, 'gi'), '')}
      </span>
    {/if}
  </div>

  <div>
    {#each results as result, index}
      {#if result.Title}
        <div
          on:mouseover={onMouseOverResult}
          on:mouseout={onMouseOutResult}
          class="app-search_result"
          class:app-search_result--selected={resultItemIndexSelected === index}
        >
          {#each result.Title.split(new RegExp(`(${query})`, 'gi')) as part}
            <span on:mouseover on:mouseout class:query={part === query}>{part}</span>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
</div>
