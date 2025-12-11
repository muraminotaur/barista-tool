export const ingredients: [{ 
    id: string; 
    category: string; 
    subcategory: string; 
    ingredient: any; 
    ounces: number 
}] = $state([
    {
        id: "starter",
        category: "flavor",
        subcategory: "sauce",
        ingredient: {
            "name": "Caramel",
            "subcategory": "Sauce",
            nutrition: {
                "calories": 1,
                "fat": 1,
                "sodium": 1,
                "carbs": 1,
                "sugar": 1
            }
        },
        ounces: 1
    }
])

//this looks ugly :/
//maybe i'll clean this up with interfaces or whatever later

// the ? in ingredient?: signifies that this typecasting is optional. this is written
// so i don't get an error thrown in drink.svelte when pushing a new ingredient to the array with
// the current ingredient as undefined.