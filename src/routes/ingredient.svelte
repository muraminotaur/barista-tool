<script lang="ts">
    import { drink_data } from '$lib/drink_data';

    let { id = "", category = $bindable(""), subcategory = $bindable(""), name = $bindable(""), ounces = $bindable(0), onRemoval } = $props();

    const types = ['flavor', 'milk', 'base'];

    function arrayRegroup(array: any[], key: string) {
        //Reduce bigger array into smaller subset. Having acc[] and item[] as parameters "creates" them, neither exist. (saying this so i can understand arrow notation better.)
        return array.reduce((acc, item) => {
            //access each item in the array and find the field with Key
            const group = item[key];
            //if the group in array doesn't exist, set create a new array for that group.
            if (!acc[group]) acc[group] = [];
            //push the objects currently selected into the new array group
            acc[group].push(item);
            return acc;
        }, {});
    }

    //shouldn't i only really do this once? is there a smart way i can move this to a global definition
    const flavors = arrayRegroup(drink_data.flavors, "subcategory");
    const milks = arrayRegroup(drink_data.milks, "subcategory");

    function removeIngredient(){
        //Call parent callback with the UUID of this component.
        onRemoval?.({ id });
    }
</script>

<div class="ingredient-container">
    <div class="info">
        <!-- remove when done with debugging -->
        <p>{category ? category:'...'}<br/>svelte UID: {id}</p>
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
            <optgroup label="Sauces">
                {#each flavors.Sauce as f_option}
                    <option value={f_option}>
                        {f_option.name}
                    </option>
                {/each}
            </optgroup>
            <optgroup label="Syrups">
                {#each flavors.Syrup as f_option}
                    <option value={f_option}>
                        {f_option.name}
                    </option>
                {/each}
            </optgroup>
        </select>

        <input type="number" step=0.25 bind:value={ounces}>
        <label for="amount in ounces">oz</label>
    {/snippet}

    {#snippet milk()}
        <select name="milk-selection" bind:value={name}>
            <optgroup label="Dairy">
                {#each milks.Dairy as f_option}
                    <option value={f_option}>
                        {f_option.name}
                    </option>
                {/each}
            </optgroup>
            <optgroup label="Non-dairy">
                {#each milks["Non-dairy"] as f_option}
                    <option value={f_option}>
                        {f_option.name}
                    </option>
                {/each}
            </optgroup>
            <optgroup label="Misc">
                {#each milks.Misc as f_option}
                    <option value={f_option}>
                        {f_option.name}
                    </option>
                {/each}
            </optgroup>
        </select>

        <!--
        deciding to keep the ounces input for milks/water because 
        this will make adding splashes of milk to americanos and
        iced/hot espressos much easier. less complexity in exchange for
        slightly more user effort. (i'm really the only likely user so 
        who cares (i don't!))
        -->
        <input type="number" step=1 bind:value={ounces}>
        <label for="amount in ounces">oz</label>
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