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

      case 'LastAdded':
        return derived(movies, (store) =>
          store.sort((a, b) => {
            return a.added - b.added;
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
</script>

<ul class="movies">
  {#each $data as movie}
    <li class="stack movie-item">
      <p class="movie-item_rate">{movie.imdbRating}</p>

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
