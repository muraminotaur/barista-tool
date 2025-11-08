<script>
	import Ingredient from "./ingredient.svelte";
    import { drink_data } from '$lib/drink_data';
    import { ingredients } from './shared.svelte.js';

    // i think the characteristics of the drink should be detailed in this file.
    // things like hot/iced/frozen, milk/no milk, etc.
    let size = $state(16); //size should stay a variable user-set number to account for iced/hot espresso, i.e. not complete drinks.
    let iced = $state(true);
    //i've changed this to a complete drink bool. i expand on this in my dev journal.
    let complete_drink = $state(true);

    //unsure if this works because my state management isn't good enough to get this to trigger correctly.
    function calc_nutrition_field(array, field) {
        let total = 0;
        if(field === "calories") {
            //can i programmatically calculate all of these?
            //i need to sketch this out.
        }
        array.forEach((e) => total += e[field]);
        console.log("currently calculating: " + field + ": " + total);
        return total;
    }

    let calories = $state(0);
    calories = calc_nutrition_field(ingredients, "calories");
    let fat = $derived(calc_nutrition_field(ingredients, "fat"));
    let sodium = $derived(calc_nutrition_field(ingredients, "sodium"));
    let carbs = $derived(calc_nutrition_field(ingredients, "carbs"));
    let sugar = $derived(calc_nutrition_field(ingredients, "sugar"));

    function addIngredient() {
        ingredients.push({
            category: "",
            name: "",
            ounces: 0
        });
    }
    


    // FIXME:
    // This function receives the ID of the child ingredient.svelte component and removes it
    // from the parent Drink.svelte component. It should do that, but currently doesn't.
    // Deleting still pops off the top.
    function handleDeletion(event) {
        //const index = ingredients.indexOf(event.detail.id); //FIXME: this is flawed and doesn't search as deeply as it needs to.
        //const index = ingredients.find(u => u.id === event.detail.id)["id"];
        //console.log("handleDeletion() - event.detail.id: " + event.detail.id + "\nindex number: " + index);
        //console.log("handleDeletion() - updated array: ", $state.snapshot(ingredients));
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
        <!-- <Ingredient {...ingredient} on:removeIngredient={handleDeletion}/> -->
        <Ingredient {...ingredient} on:removeIngredient={handleDeletion}/>
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