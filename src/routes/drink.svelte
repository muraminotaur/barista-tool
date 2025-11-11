<script lang="ts">
	import Ingredient from "./ingredient.svelte";
    import { drink_data } from '$lib/drink_data';
    import { ingredient_list_starter } from './shared.svelte';

    import { uuid } from '$lib/utility';

    let ingredients = $state(ingredient_list_starter);

    // i think the characteristics of the drink should be detailed in this file.
    // things like hot/iced/frozen, milk/no milk, etc.
    let size = $state(16); //size should stay a variable user-set number to account for iced/hot espresso, i.e. not complete drinks.
    let iced = $state(true);
    //i've changed this to a complete drink bool. i expand on this in my dev journal.
    let complete_drink = $state(true);

    //unsure if this works because my state management isn't good enough to get this to trigger correctly.
    /*function calc_nutrition_field(array, field: string) {
        let total = 0;
        if(field === "calories") {
            //can i programmatically calculate all of these?
            //i need to sketch this out.
        }
        array.forEach((e) => total += e[field]);
        console.log("currently calculating: " + field + ": " + total);
        return total;
    }*/
    let fat = 'unfinished';
    let sodium = 'unfinished';
    let carbs = 'unfinished';
    let sugar = 'unfinished';

    let calories = $state(0);
   
    function addIngredient() {
        ingredients.push({
            id: uuid(),
            category: "",
            name: "",
            ounces: 0
        });
    }

    function handleDeletion({ id }: {id: string}) {
        const index = ingredients.findIndex(t => t.id === id);
        ingredients.splice(index, 1);

        console.log("handle deletion reached in drink.svelte. component " + id + "\nTarget was " + id + "\nIndex was " + index);
        console.log($state.snapshot(ingredients));
    }
</script>

<div>
    <h2> - drink component - </h2>
    <input type="number" bind:value={size}>
    <label for="Size in Fl. Oz.">Drink size? (In fl.oz.)</label>
    <br/>

    <input type="checkbox" bind:checked={iced}>
    <label for="iced">Iced?</label>
    <br/>

    <input type="checkbox" bind:checked={complete_drink}>
    <label for="include_milk">Is this a complete drink? (i.e., not just shots of espresso over ice?)</label>
    <br/>

    <button aria-label="Add ingredient" onclick={addIngredient}>Add Ingredient</button>
    {#each ingredients as ingredient}
        <Ingredient {...ingredient} onRemoval={handleDeletion}/>
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

<style lang="css">
div {
    margin: 0.5em;
    padding: 0.5em;
    border: 1px solid #000;
}
</style>