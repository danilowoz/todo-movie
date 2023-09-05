<script>
    import "./tabs.css"

    let items = ["Default", "Last added", "Unsee"]
</script>

<nav>
    {#each items as item}
        <button>{item}</button>
    {/each}
</nav>
