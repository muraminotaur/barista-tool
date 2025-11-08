<script>
    import { drink_data } from '$lib/drink_data';
    let { id = 1, category = "", name = "", ounces = 0 } = $props();

    const types = ['flavor', 'milk', 'base'];
    // Auxiliary variable will act as possible additonal information. 
    // example: flavor needs to know *which* flavor it is and how many oz. Base also needs to be
    // specified and quantified. Milk/fluid doesn't necessarily need to be quantified if the drink is a full
    // drink. It can be $derived instead.
    let auxiliary = $state('');
    // entirely possible i can define the auxiliary milk control in the drink component itself. this may be easier to 
    // write the calculation for this in drink.svelte.
</script>

<div class="ingredient-container">
    <div class="info">
        <p>{category ? category:'...'}<br/>#{id}</p>
    </div>

    <div class="ingredient">
        <select 
            name="type-selection" 
            bind:value={category}
        >
            {#each types as type}
                <option value={type}>
                    {type}
                </option>
            {/each}
        </select>
    </div>
    
    {#snippet flavor()}
        <select name="flavor-selection" bind:value={name}>
            {#each drink_data.flavors as f_option}
                <option value={f_option}>
                    {f_option.name}
                </option>
            {/each}
        </select>

        <input type="number" step=0.25 bind:value={ounces}>
        <label for="amount in ounces">oz</label>
    {/snippet}

    {#snippet milk()}
        <select name="milk-selection" bind:value={name}>
            {#each drink_data.milks as f_option}
                <option value={f_option}>
                    {f_option.name}
                </option>
            {/each}
        </select>
    {/snippet}

    {#snippet base()}
        <select name="base-selection" bind:value={name}>
            {#each drink_data.bases as f_option}
                <option value={f_option}>
                    {f_option.name}
                </option>
            {/each}
        </select>
        
        <input type="number" step=0.25 bind:value={ounces}>
        <label for="amount in ounces">oz</label>
    {/snippet}

    {#if category === 'flavor'}
        {@render flavor()}
    {:else if category === 'milk'}
        {@render milk()}
    {:else if category === 'base'}
        {@render base()}
    {:else}
        <br/>
    {/if}

    <div class="delete-button">
        <button onclick={removeIngredient}>Remove ingredient</button>
    </div>
</div>

<style>
    div {
        display: inline grid; /* <-- may be a good design choice on desktop?*/
    }

    .ingredient-container {
        border: 1px solid #000;
        margin: 0.25em;
        padding: 0.25em;
    }
</style>