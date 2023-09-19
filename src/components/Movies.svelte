<script>
  import './movies.css';

  const data = [
    {
      title: 'The Postman Always Rings Twice',
      length: '90 min',
      category: 'Drama',
      rate: '8.0',
      description:
        'Some things we can control, some we can’t. We can control our attitudes, opinions, goals and desires – choices of our own. We can’t control health, wealth, fame or power – things we can’t have by choosing them.'
    },
     {
      title: 'The Postman Always Rings Twice',
      length: '90 min',
      category: 'Drama',
      rate: '8.0',
      description:
        'Some things we can control, some we can’t. We can control our attitudes, opinions, goals and desires – choices of our own. We can’t control health, wealth, fame or power – things we can’t have by choosing them.'
    }
  ];
</script>

<ul class="movies">
  {#each data as movie}
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
