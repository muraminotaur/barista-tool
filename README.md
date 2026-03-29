# BaristaToolkit

A web application to calculate (almost) any drink at \[Coffee Branch Name Here\]! This is geared towards baristas and other people that have intimate knowledge of coffee making. BaristaToolkit is intended to be incredibly freeform to allow for accurate calculations for most drinks that customers will order. 

The site is hosted [here](https://muraminotaur.github.io/barista-tool).

*Coffee shops this should apply to:*
- Dutch Bros
- 7Brew
- Jet Coffee
- CC's Coffee House
- any coffee shop with a large selection of Torani syrups

### Features

- Per-ounce control
- Reactive nutritional information table
- Non-standard milks
    - Non-dairy options
    - Heavy whip
    - Eggnog
- Non-standard drinks/ingredients
    - Lemonade
    - Energy Drinks (Blumania brand)
    - Apple Juice
    - Club Soda
    - Caffeine extracts
    - Chai
    - Frozen coffee
- Sugar-free syrups and sauces

### Agenda

- [x] Mobile responsive
- [x] Total ounces display
- [x] Changelog/Notes section
- [ ] Free-mode toggle
- [x] Design Update
- [ ] A/B Testing
- [ ] Presets

# Svelte building and running related commands

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
