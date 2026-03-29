<script lang="ts">
	import Ingredient from "./ingredient.svelte";

    // import { presets } from "./shared.svelte";
    import { uuid } from '$lib/utility';

    const DECI_PRECISION = 2;

    let ingredients: [{ 
        id: string; 
        category: string; 
        ingredient?: any; 
        ounces: number;
        autofill: boolean 
    }] = $state([
        {
            id: "starter",
            category: "flavor",
            ingredient: {
                "name": "Caramel",
                "subcategory": "Sauce",
                nutrition: {
                    "calories": 0,
                    "fat": 0,
                    "sodium": 0,
                    "carbs": 0,
                    "sugar": 0
                }
            },
            ounces: 1,
            autofill: false
        }
    ]);

    let size = $state(16); //size should stay a variable user-set number to account for iced/hot espresso, i.e. not complete drinks.

    //TODO: subtract current total ounces from target ounces.
    let freeOunces = $derived.by(() => {
        if (ingredients.length <= 0) return 0;
        return ingredients.reduce((accumulator, currentValue) => accumulator + currentValue.ounces, 0);
        //this currently doesnt do what it's supposed to.
        //i still need to actually implement a system to set what the target ounces are so that this can function.
        
        //2026.03.28 --> well wouldn't that be the size variable? i would need to use that first.
    });

    //iterate ingredients array, add up all ounces
    let total = $derived.by(() => {
        if (ingredients.length <= 0) return 0;
        return ingredients.reduce((accumulator, currentValue) => accumulator + currentValue.ounces, 0);
    });

    let calories = $derived.by(() => {
        return ingredients.reduce((accumulator, currentValue) => accumulator + (currentValue.ingredient.nutrition.calories * currentValue.ounces), 0).toFixed(DECI_PRECISION);
    });
    let fat = $derived.by(() => {
        return ingredients.reduce((accumulator, currentValue) => accumulator + (currentValue.ingredient.nutrition.fat * currentValue.ounces), 0).toFixed(DECI_PRECISION);
    });
    let sodium = $derived.by(() => {
        return ingredients.reduce((accumulator, currentValue) => accumulator + (currentValue.ingredient.nutrition.sodium * currentValue.ounces), 0).toFixed(DECI_PRECISION);
    });
    let carbs = $derived.by(() => {
        return ingredients.reduce((accumulator, currentValue) => accumulator + (currentValue.ingredient.nutrition.carbs * currentValue.ounces), 0).toFixed(DECI_PRECISION);
    });
    let sugar = $derived.by(() => {
        return ingredients.reduce((accumulator, currentValue) => accumulator + (currentValue.ingredient.nutrition.sugar * currentValue.ounces), 0).toFixed(DECI_PRECISION);
    });
   
    function addIngredient() {
        ingredients.push({
            id: uuid(),
            category: "",
            ingredient: {
                nutrition: {
                "calories": 0,
                "fat": 0,
                "sodium": 0,
                "carbs": 0,
                "sugar": 0
                }
            },
            ounces: 0,
            autofill: false
        });
    }

    function handleDeletion({ id }: {id: string}) {
        const index = ingredients.findIndex(t => t.id === id);
        ingredients.splice(index, 1);

        // console.log("handle deletion reached in drink.svelte. component " + id + "\nTarget was " + id + "\nIndex was " + index);
        // console.log($state.snapshot(ingredients));
    }

    //TODO: this.
    const onPresetChange = () => {
        ingredients = currentPreset;
        console.log($state.snapshot(ingredients));
        console.log($state.snapshot(currentPreset));
    }

    let currentPreset = $state([]);

    function logList(){
        console.log($state.snapshot(ingredients));
    }

</script>

<div class="drink-comp">
    <h2>Beverage Creation</h2>
    <hr>

    <!-- <select name="preset" bind:value={currentPreset} onchange={onPresetChange}>
        {#each presets as preset}
            <option value={preset}>{preset.name}</option>
        {/each}
    </select> -->

    <!-- <input type="number" bind:value={size}>
    <label for="Size in Fl. Oz.">Drink size? (In fl.oz.) DOES NOTHING RIGHT NOW</label>
    <br/> -->

    <p>Total ounces: {total}oz</p>
    
    <div class="ingr-container">
        {#each ingredients as ingredient (ingredient.id)}
            <Ingredient 
                {...ingredient} 
                onRemoval={handleDeletion} 
                id={ingredient.id} 
                bind:category={ingredient.category}
                bind:ounces={ingredient.ounces}
                bind:autofill={ingredient.autofill}
                bind:ingredient={ingredient.ingredient}
            />
        {/each}
    </div>

    <div class="add-ingr">
        <button aria-label="Add ingredient" onclick={addIngredient}>Add Ingredient</button>
    </div>
</div>
<div class="nutrition">
    <table>
        <tbody>
            <tr>
                <th scope="row">Calories</th>
                <td>{calories}cal</td>
            </tr>
            <tr>
                <th scope="row">Fat</th>
                <td>{fat}g</td>
            </tr>
            <tr>
                <th scope="row">Sodium</th>
                <td>{sodium}mg</td>
            </tr>
            <tr>
                <th scope="row">Carbs</th>
                <td>{carbs}g</td>
            </tr>
            <tr>
                <th scope="row">Sugar</th>
                <td>{sugar}g</td>
            </tr>
        </tbody>
    </table>
</div>

<!-- <div>
    <button onclick={logList}>console.log() the current ingredient list.</button>
</div> -->

<style lang="css">
div {
    /* max-width: fit-content; */
    background-color: var(--primary-2);
}

.drink-comp, .nutrition {
    margin: 1ch auto;
    padding: 2ch;
    border: var(--border-width) solid var(--secondary-1);
    border-radius: var(--border-radius);
}

.drink-comp {
    width: 60%;
}
.nutrition {
    width: fit-content;
}

td {
    padding-left: 3ch;
}

hr {
    color: var(--primary-2);
    border: var(--border-width) solid var(--secondary-1);
    border-radius: var(--border-radius);
}

@media only screen and (max-width: 640px) {
    .drink-comp {
        margin: 1ch;
        width: auto;
    }
}
</style>