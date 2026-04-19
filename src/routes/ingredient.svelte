<script lang="ts">
    import { drink_data } from '$lib/drink_data';
    import { flavors, milks } from '$lib/utility';

    let { 
        id = "", 
        category = $bindable(""), 
        ounces = $bindable(0), 
        autofill = $bindable(false),
        ingredient = $bindable({
                "name": "",
                "subcategory": "",
                nutrition: {
                    "calories": 0,
                    "fat": 0,
                    "sodium": 0,
                    "carbs": 0,
                    "sugar": 0
                }
            }),
        onRemoval 
    } = $props();

    const types = ['flavor', 'milk', 'base'];

    let targetAutofillOunces = $state(0);

    function removeIngredient(){
        //Call parent callback with the UUID of this component.
        onRemoval?.({ id });
        //learned that this ^^ syntax is called a Chaining Operator
        // and that it safely accesses a property / method and returns undefined if it doesn't exist.
    }

    function setAutofill(){
        //toggle
        autofill = !autofill;
        //this function will do more when fully implemented
    }

    //debugging
    function printout() {
        console.log(ingredient);
    }
</script>

<div class="ingredient-container">
    <div class="info">
        <p>{category ? category:'...'}</p>
    </div>

    <br/>
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
        {#key id}
            <select name="flavor-selection" bind:value={ingredient}>
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
        {/key}
        <input type="number" step=0.25 bind:value={ounces}>
        <label for="amount in ounces">oz</label>
    {/snippet}

    {#snippet milk()}
    <!-- id aint the correct thing -->
        {#key id}
            <select name="milk-selection" bind:value={ingredient}>
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
        {/key}

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
        <select name="base-selection" bind:value={ingredient}>
            {#each drink_data.base as f_option}
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

    <!-- <div class="printout">
        <button onclick={printout}>print ingredient</button>
    </div> -->
</div>

<style>
    div {
        display: inline grid; /* <-- may be a good design choice on desktop?*/
    }

    .ingredient-container {
        background: var(--primary-1);
        padding: 1ch;
        margin: 0 1ch 1ch 0;
        border-radius: var(--border-radius);
    }

    button {
        max-width: fit-content;
    }

    @media only screen and (max-width: 640px) {
        select {
            max-width: 250px;
        }
    }
</style>