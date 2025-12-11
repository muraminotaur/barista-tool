<script lang="ts">
	import Ingredient from "./ingredient.svelte";
    import { drink_data } from '$lib/drink_data';

    import { uuid } from '$lib/utility';

    let ingredients: [{ 
    id: string; 
    category: string; 
    ingredient?: any; 
    ounces: number 
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
        ounces: 1
    }
])

    // i think the characteristics of the drink should be detailed in this file.
    // things like hot/iced/frozen, milk/no milk, etc.
    let size = $state(16); //size should stay a variable user-set number to account for iced/hot espresso, i.e. not complete drinks.
    //let iced = $state(true);
    //i've changed this to a complete drink bool. i expand on this in my dev journal.
    //let complete_drink = $state(true);

    let calories = $derived.by(() => {
        return ingredients.reduce((accumulator, currentValue) => accumulator + (currentValue.ingredient.nutrition.calories * currentValue.ounces), 0);
    });
    let fat = $derived.by(() => {
        return ingredients.reduce((accumulator, currentValue) => accumulator + (currentValue.ingredient.nutrition.fat * currentValue.ounces), 0);
    });
    let sodium = $derived.by(() => {
        return ingredients.reduce((accumulator, currentValue) => accumulator + (currentValue.ingredient.nutrition.sodium * currentValue.ounces), 0);
    });
    let carbs = $derived.by(() => {
        return ingredients.reduce((accumulator, currentValue) => accumulator + (currentValue.ingredient.nutrition.carbs * currentValue.ounces), 0);
    });
    let sugar = $derived.by(() => {
        return ingredients.reduce((accumulator, currentValue) => accumulator + (currentValue.ingredient.nutrition.sugar * currentValue.ounces), 0);
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
            ounces: 0
        });
    }

    //TODO: none of this is right. refer to the message i sent to neil for further information and make a devlog entry for it.
    //ingredient.svelte should now be able to pass the ingredient object i need as it's a property and a field in the ingredients[] array.

    // nutrition.calories = (ingredients.reduce((accumulator, currentValue) => {
    //         accumulator + (currentValue.ingredient.nutrition.calories * currentValue.ounces);
    // }, 0 /*initial value*/));

    function handleDeletion({ id }: {id: string}) {
        const index = ingredients.findIndex(t => t.id === id);
        ingredients.splice(index, 1);

        console.log("handle deletion reached in drink.svelte. component " + id + "\nTarget was " + id + "\nIndex was " + index);
        console.log($state.snapshot(ingredients));
    }

    function logList(){
        console.log($state.snapshot(ingredients));
    }

</script>

<div>
    <h2> - drink component - </h2>
    <input type="number" bind:value={size}>
    <label for="Size in Fl. Oz.">Drink size? (In fl.oz.)</label>
    <br/>

    <button aria-label="Add ingredient" onclick={addIngredient}>Add Ingredient</button>
    {#each ingredients as ingredient (ingredient.id)}
        <Ingredient 
            {...ingredient} 
            onRemoval={handleDeletion} 
            id={ingredient.id} 
            bind:category={ingredient.category}
            bind:ounces={ingredient.ounces}
            bind:ingredient={ingredient.ingredient}
        />
    {/each}
    
</div>
<div>
    <table>
        <thead>
            <tr>
                <th>Calories</th>
                <th>Fat</th>
                <th>Sodium</th>
                <th>Carbs</th>
                <th>Sugar</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{calories}cal</td>
                <td>{fat}g</td>
                <td>{sodium}mg</td>
                <td>{carbs}g</td>
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
    margin: 0.5em;
    padding: 0.5em;
    border: 1px solid #000;
}
</style>