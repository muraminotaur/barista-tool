1 oz of sugar is
90cal
24g sugar/carbs

//TODO: recheck the numbers for Freeze batch nutrition. It seems a little high

new lemonade info:
(per 1fl oz)
cal 85
fat 0g
sodium 0mg
carbs 22g
sugars 21g

## Calculations from work for new lemonade mix:

lemonade => concentrate per total ounce
store pitcher is 128oz, 22oz of lemonade concentrate, 106oz of water. 

per ounce nutritional breakdown:
|     | Lemonade | equation | total |
| --- | --- | --- | --- |
| calories | 85cal | $(85cal * 22)/128oz$ | 14.609 ~ **14.61cal** |
| fat      | 0g |  | 0g |
| sodium   | 0mg |  | 0mg |
| carbs    | 22g | $(22g * 22)/128oz$ | **3.78g** |
| sugar    | 21g | $(21g * 22)/128oz$ | 3.609 ~ **3.61g** |

chiller mix per-ounce breakdown:
|     | Lemonade       | Coconut milk | equation | total |
| ---      | ---       | --- | --- | --- |
| calories | 14.609cal  | 10cal | $((14.609cal * 64) + (10cal * 64))/128oz$ | 12.3045 ~ 12.31cal |
| fat      | 0g        | 0.625g | $((0g * 64) + (40g * 64))/128oz$ | 0.31g |
| sodium   | 0mg       | 16.25mg | $((0mg * 64) + (1040mg * 64))/128oz$ | 8.12mg |
| carbs    | 3.78g     | 1.25g | $((3.78g * 64) + (1.25g * 64))/128oz$ | 2.52g |
| sugar    | 3.609g     | 1.125g | $((3.609g * 64) + (1.125g * 64))/128oz$ | 2.367 ~> 2.37g |

old chiller values:
```typescript
nutrition: 
{
    "calories": 19.605,
    "fat": 0.3125,
    "sodium": 8.125,
    "carbs": 4.406,
    "sugar": 4.178
}
```