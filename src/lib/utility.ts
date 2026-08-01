// =======================================================================================
// Constants
// Used for menus in ingredient.svelte components.
export const flavors = arrayRegroup(drink_data.flavor, "subcategory");
export const milks = arrayRegroup(drink_data.milk, "subcategory");
// Decimal precision
export const DECI_PRECISION = 2;


// =======================================================================================
import { drink_data } from "./drink_data";

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

// =======================================================================================
// In this script I'm setting up the UUID system for referencing ingredients in the array.
// this implementation is taken from the cobalt.tools repository, since i'm unfamiliar with the best ways to do things
// and their implementation seems to be safe and error-handling.

// creating a constant that contains all possible valid characters within a UUID.
// the string is being indexed by a random number because...?
const digit = () => '0123456789abcdef'[Math.random() * 16 | 0];

export const uuid = () => {
    // this checks if the crypto library is available in this browser. returns a String
    /*
    > some old ass browers or certain environments wouldn't have it
    > for example you can run websites on node js
    > like
    > using node js as a browser
    > and in some cases like that, some in-browser stuff doesn't work
    > so people will use fallbacks like this
        - neil (thank you neil)
    */
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    // if the crypto library isn't available in the browser, use this naive implementation instead
    const digits = Array.from({length: 32}, digit);
    digits[12] = '4';
    digits[16] = '89ab'[Math.random() * 4 | 0];

    return digits
            .join('')
            .match(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/)!
            .slice(1)
            .join('-');
}

// =======================================================================================
export function deepCopy(cloningTarget: any[]){
    if (typeof structuredClone !== 'undefined' && 'structuredClone' in Window){
        return structuredClone(cloningTarget);
    }

    return cloningTarget.map(a => {return {...a}});
}

// =======================================================================================
// function for A/B testing
// This will copy the current ingredients array into a new array 
// and pre-calculate the nutritional information. 
export function moveToBSlot(targetArray: DrinkNode[]){

}


// =======================================================================================
// types for ingredient array
export interface NutritionFacts {
    calories: number;
    fat: number;
    sodium: number;
    carbs: number;
    sugar: number;
}

export interface Ingredient {
    name: string;
    subcategory: string;
    nutrition: NutritionFacts;
}

export interface DrinkNode {
    id: string;
    category: string;
    ingredient: Ingredient;
    ounces: number;
    autofill: boolean;
}

// =======================================================================================
// type for presets
export interface Preset {
    name: string;
    preset: DrinkNode[];
}

// =======================================================================================
// nutritional information calculation function
function getProperty<T, K extends keyof T>(object: T, key: K) {
    return object[key];
}

export function drinkCalc(targetArray: DrinkNode[], inputField: any) {
    return targetArray.reduce(
        (accumulator, currentNode) => 
            accumulator + 
            (getProperty(currentNode.ingredient.nutrition, inputField) * currentNode.ounces)
    , 0).toFixed(DECI_PRECISION);
}