<script>
  import './movies.css';
  import { derived, get } from 'svelte/store';
  import { sortedMovies, movies } from '../store/movies';
  import { preferences } from '../store/preferences';

  $: getData = () => {
    switch ($preferences.tab) {
      case 'Rate':
        return derived(movies, (store) =>
          store.sort((a, b) => {
            return (
              Number(b.imdbRating === 'N/A' ? 0 : b.imdbRating) -
              Number(a.imdbRating === 'N/A' ? 0 : a.imdbRating)
            );
          })
        );

      case 'Last added':
        return derived(movies, (store) =>
          store.sort((a, b) => {
            return new Date(b.added) - new Date(a.added);
          })
        );

      default:
      case 'Unseen':
        return derived(movies, (store) =>
          store.sort((a, b) => {
            if (a.Title < b.Title) {
              return -1;
            }
            if (a.Title > b.Title) {
              return 1;
            }
            return 0;
          })
        );
    }
  };

  $: data = getData()

  function deleteMovie(id) {
    movies.update((store) => store.filter((movie) => movie.imdbID !== id));
  }
</script>

<ul class="movies">
  {#each $data as movie}
    <li class="stack movie-item">
      <p class="movie-item_rate">{movie.imdbRating}
      
      <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

      <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </p>

      <button style="display: none" on:click={() => deleteMovie(movie.imdbID)}>delete</button>

      <div class="movie-item_info">
        <div class="stack movie-item_details">
          <h2 class="movie-item_title">{movie.Title} ({movie.Year})</h2>
          <p class="movie-item_metadata">by {movie.Director}</p>
          <p class="movie-item_metadata">{movie.Runtime}</p>
          <p class="movie-item_metadata">{movie.Genre}</p>
        </div>
        <p class="movie-item_description">{movie.Plot}</p>
      </div>
    </li>
  {/each}
</ul>
