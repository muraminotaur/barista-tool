<script lang="ts">
    import { drink_data } from '$lib/drink_data';

    let { 
        id = "", 
        category = $bindable(""), 
        ounces = $bindable(0), 
        autofill = $bindable(false),
        ingredient = $bindable(),
        onRemoval 
    } = $props();

    const types = ['flavor', 'milk', 'base'];

    let targetAutofillOunces = $state(0);

    function arrayRegroup(array: any[], key: string) {
        //Reduce bigger array into smaller subset. Having acc[] and item[] as parameters "creates" them, 
        //neither exist prior to this. (saying this so i can understand arrow notation better.)
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
    //as of rn this is being run every single time a new ingredient component is created. even if it isn't used.
    const flavors = arrayRegroup(drink_data.flavor, "subcategory");
    const milks = arrayRegroup(drink_data.milk, "subcategory");

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

        <input type="number" step=0.25 bind:value={ounces}>
        <label for="amount in ounces">oz</label>
    {/snippet}

    {#snippet milk()}
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

        <!--
        deciding to keep the ounces input for milks/water because 
        this will make adding splashes of milk to americanos and
        iced/hot espressos much easier. less complexity in exchange for
        slightly more user effort. (i'm really the only likely user so 
        who cares (i don't!))
        -->
        {#if !autofill}
            <input type="number" step=1 bind:value={ounces}>
            <label for="amount in ounces">oz</label>
        {/if}
        {#if autofill}
            <input type="number" step=1 bind:value={targetAutofillOunces}>
            <label for="Target ounces">Target size in ounces</label>
        {/if}
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

    {#snippet autofilloption()}
        <div class="autofill-option">
            <label for="x">Set this to autofill? <input type="button" bind:value={autofill} onclick={setAutofill}></label>
        </div>
    {/snippet}

    {#if category === 'flavor'}
        {@render flavor()}
    {:else if category === 'milk'}
        {@render autofilloption()}
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
        background: var(--primary-2);
        padding: 1ch;
    }
    button{
        max-width: fit-content;
    }

    @media only screen and (max-width: 640px) {
        select {
            max-width: 250px;
        }
    }
</style>