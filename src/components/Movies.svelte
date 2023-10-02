<script>
  import './movies.css';
  import { movies } from '../store/movies';
</script>

<ul class="movies">
  {#each $movies as movie}
    <li class="stack movie-item">
      <p class="movie-item_rate">{movie.rate}</p>

      <div class="movie-item_info">
        <div class="stack movie-item_details">
          <h2 class="movie-item_title">{movie.title}</h2>
          <p class="movie-item_length">{movie.length}</p>
          <p class="movie-item_category">{movie.category}</p>
        </div>
        <p class="movie-item_description">{movie.description}</p>
      </div>
    </li>
  {/each}
</ul>
