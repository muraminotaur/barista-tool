<script lang="ts">
	import Ingredient from "./Ingredient.svelte";

    import { presets } from "$lib/shared.svelte";
    import { DECI_PRECISION, uuid, deepCopy, drinkCalc, type DrinkNode, type Preset } from '$lib/utility';


    let ingredients: DrinkNode[] = $state([
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

    //iterate ingredients array, add up all ounces
    let total = $derived.by(() => {
        if (ingredients.length <= 0) return 0;
        return ingredients.reduce((accumulator, currentValue) => accumulator + currentValue.ounces, 0);
    });

    let calories = $derived(drinkCalc(ingredients, "calories"));
    let fat = $derived(drinkCalc(ingredients, "fat"));
    let sodium = $derived(drinkCalc(ingredients, "sodium"));
    let carbs = $derived(drinkCalc(ingredients, "carbs"));
    let sugar = $derived(drinkCalc(ingredients, "sugar"));
    
    function addIngredient() {
        ingredients.push({
            id: uuid(),
            category: "",
            ingredient: {
                name: "",
                subcategory: "",
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
    }

    function onPresetChange() {
        ingredients = deepCopy(currentPreset.preset);
        //do i need to send an update signal to the ingredients
    }

    let currentPreset: Preset = $state({
        name: "fallback preset -- SOMETHING BROKE!",
        preset: [{ 
            id: "xx",
            category: "flavor", 
            ingredient: {
                name: "",
                subcategory: "",
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
    }]});

    function logList(){
        console.log($state.snapshot(ingredients));
    }

</script>

<div class="drink-comp">
    <h2>Beverage Creation</h2>
    <hr>

    <select name="preset" bind:value={currentPreset} onchange={onPresetChange}>
        {#each presets as preset}
            <option value={preset}>{preset.name}</option>
        {/each}
    </select>

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
    min-height: 300px;
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