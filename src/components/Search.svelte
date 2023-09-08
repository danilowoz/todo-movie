<script lang="ts">
  import './search.css';

  let query = '';
  let predictTerm = null;
  let cursorOffset = 0;

  async function search(query) {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=7ab33eb9`);
    const data = await response.json();

    if (data.Search && data.Search[0].Title.match(new RegExp('^' + query, 'gi'))) {
      predictTerm = data.Search[0];
    }
  }

  function onSearch(event: Event) {
    const { target } = event;
    query = target.value;

    const queryWidth = document.querySelector('.app-search_query').getBoundingClientRect().width;
    cursorOffset = queryWidth + 4;
    predictTerm = '';

    search(query);

    window.addEventListener('keydown', (event) => {
      if (event.code === 'Tab') {
        query = predictTerm.Title;
        predictTerm = null;
        event.preventDefault();
      }
    });
  }
</script>

<div class="app-search" style="--cursor-offset: {cursorOffset}px">
  <input bind:value={query} on:input={onSearch} type="search" placeholder="Search..." />
  <span class="app-search_query">{query}</span>
  {#if predictTerm}
    <span class="app-search_predict">{predictTerm.Title.replace(new RegExp(query, 'gi'), '')}</span>
  {/if}
</div>
