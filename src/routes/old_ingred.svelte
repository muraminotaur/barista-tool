<script>
    /**
     * this should probably have logic to determine a "portion" and what type of portion that is.
     * i.e., an ingredient component that is milk, and an ingredient component that is flavor scoops, etc.
     * base-style components likely shouldn't have amount controls, but there arises the issue of 
     * having things like Americanos (water base) with splashes of milk. will i need a new component or
     * can i somehow include logic to cover these cases?
    */
   
    let selected = $state(``); //this throws a fit if i don't have something here. do i need an async thing here to stop calories from being dependent and unstable at runtime?
    let amount = $state(1); //these also act as the default values when attached to html elements.
    let shots = $state(2);
</script>

<div>
    <p> - ingredient component - </p>
    <select 
        name="ingredient-selection"
        bind:value={selected}
    >
        {#each ingredient_list as ingredient}
            <option value={ingredient}>
                {ingredient.name}
            </option>
        {/each}
    </select>

    <p>Selected option {selected ? selected.id : '...'} {selected ? "-- " + selected.name : ''}</p>

    <p>For testing purposes the drink will be a <strong>Medium Iced {selected.name || ''} Latte (Prairie Farms Whole Milk)</strong>.</p>
    
    <label>
        <input type="number" bind:value={amount} min="0" step="0.25"/>
        <label for="flavor amount">scoops of flavor (in oz)</label>
    </label>

    <label>
        <input type="number" bind:value={shots} min="1" step="1"/>
        <label for="shots amount">shots of espresso</label>
    </label>

    <p>This drink will have {milk_amt}oz of milk.</p>

    <br/>
    <!-- advanced!!! -->
    <table>
        <thead>
            <tr>
                <th>Drink</th>
                <th>Calories</th>
                <th>Fat</th>
                <th>Sodium</th>
                <th>Carbs</th>
                <th>Sugar</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{selected.name} Latte</td>
                <td>{calories}cal</td>
                <td>{fat}g</td>
                <td>{sodium}mg</td>
                <td>{carbs}g</td>
                <td>{sugar}g</td>
            </tr>
        </tbody>
    </table>
</div>

<style>
div {
    margin: 0.5em;
    padding: 0.5em;
    border: 1px solid rgba(0.2, 0.2, 0.2, 0.25);
}
</style>