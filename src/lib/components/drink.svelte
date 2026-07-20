<script lang="ts">
	import Ingredient from "$lib/components/ingredient.svelte";

    import { presets } from "./shared.svelte";
    import { uuid, deepCopy } from '$lib/utility';

    const DECI_PRECISION = 2;

    interface Nutrition {
        calories: number;
        fat: number;
        sodium: number;
        carbs: number;
        sugar: number;
    }

    interface Ingredient extends Nutrition {
        name: string;
        subcategory: string;
        ingredient: Nutrition;
    }

    interface IngredientArrayItem extends Ingredient {
        id: string;
        category: string;
        ingredient: Ingredient;
        ounces: number;
        autofill: boolean;
    }
    // ^^ is all of this done correctly?

    //FIXME: the '| any[]' is there to silence errors, but this makes me think there's likely a 
    //more elegant solution for this. what tools do I have to silence this and make it more secure/clearer to read?
    //the solution is almost certainly an Interface now that I'm thinking about it lol. 
    let ingredients: [{ 
        id: string; 
        category: string; 
        ingredient: {
                nutrition: {
                "calories": 0,
                "fat": 0,
                "sodium": 0,
                "carbs": 0,
                "sugar": 0
                }
            }; 
        ounces: number;
        autofill: boolean 
    }] | any[] = $state([
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

    //TODO: i gotta clean this shit up lmao. i hate looking @ this. try putting everything into a nutrition array.
    // move the reduce() into its own function that can take the target type as a parameter.
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

    function onPresetChange() {
        ingredients = deepCopy(currentPreset.preset);
        //do i need to send an update signal to the ingredients
        console.log("ingredients[] -> ", $state.snapshot(ingredients));
        console.log("currentPreset -> ", $state.snapshot(currentPreset));
    }

    //FIXME: change this to use an Interface or something man, lmao.
    let currentPreset: {
        name: string;
        preset: [{ 
            id: string; 
            category: string; 
            ingredient: {
                    nutrition: {
                    "calories": 0,
                    "fat": 0,
                    "sodium": 0,
                    "carbs": 0,
                    "sugar": 0
                    }
                }; 
            ounces: number;
            autofill: boolean 
    }]} = $state({
        name: "fallback preset -- SOMETHING BROKE!",
        preset: [{ 
            id: "xx",
            category: "flavor", 
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