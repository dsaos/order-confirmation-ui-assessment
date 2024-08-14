This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is created as an exercise for developing UI in compliance with provided designs & flows from [this Figma prototype](https://www.figma.com/design/ZM2a95BHxD2ghAbktn3Ql9/Principal-Frontend-Engineer-Prompt?node-id=1-8865&t=AHvvJWVMeoumkr2c-0).

## Install & Run

1. Clone the repo to your device, or visit [here](https://dsaos.github.io/order-confirmation-ui-assessment/).
2. Via the command line, run `yarn` to install dependencies.
3. Run `yarn start` to start a local server.

## Questions for Designers
This project aims to match the Figma prototypes 1:1, but I'd interface with the designers on the following:


- I'm going to broach the WCAG issues here: the card description (smaller text) is too small and lacks a sufficient contrast ratio for AA+ standards. We could simply change the color, but I have some larger concerns about text sizing, where we generally recommend a 16px base size as opposed to the 14px size used here (12px for the offending line). Although we're using scalable units to support browser/text zoom levels, the default experience may fail WCAG 2.1 AA+. Let's talk about this!
- I am concerned about **replacing a step's icon with a check when complete**. We already have an indicator of completion with the badge, and the change of the icon to `check-circle` might make the user lose their place, especially if we add more actions. Should we maintain the icon even when complete?
- **We didn't see any hover or focus styles for the card action buttons in Figma.** Those are important for indicating whether an element is interactive, so I have taken a stab at these, but would welcome feedback. Please note that the Figma-provided padding at least initially prevents us from animating with background color, although we can make this work if that's what designers want.
- We added some animations for the initialization of the modal, but per best practices, we aren't blocking interactivity with the app on successful completion of the modal, so no animation on exit. Please let me know if you'd like to talk further about animations.

## Dev Notes & Approach
Generally speaking, I wanted to do this quickly and simply. To that end, I started with `npx create-react-app --template typescript` and added my standard eslint ruleset so code can be consistent throughout the app (my Visual Studio Code lints on save). Although I have experience with AirBNB's excellent eslint config, it was a bit too strict for this project.

### Dependencies
In an effort to make this as simple as possible, I kept the additional dependencies down as much as I could. The only dependencies beyond those from `create-react-app` are as follows:
- `feather-icons-react`: Needed for Figma-provided icons. Upon working with this library, I might change it as a next step as the color assignment is iffy and the icons are poorly typed.
- `@fontsource/inter`: Needed to self-host the Inter font used throughout the prototypes.
- `styled-components`: Controversial, but I find this strikes the best balance between SCSS-style nesting of CSS, flexibility with dyanmic props and associated styles, and keeping everything localized (separation of concerns aside). We could instead explore component-level SCSS, CSS-in-JS, or otherwise, but I thought this was the best approach for doing this project quickly.

Notably, I opted not to use a UI library like Chakra as I feel they add too much overhead and complexity. Things like Tailwind's utility classes can be handy for rapid prototyping, but for performant applications I tend to prefer building styles from the ground up.

### Component Heirarchy
Before jumping in to the nature of how I wrote this, let me touch on some key files:
- `figmaData.ts`: All tokens from Figma, separated into categories, informed by Figma's heirarchy. This was separated as a kind of "theme" so that if designers update any variables, they can be easily changed here and take effect throughout the app. Bonus points if you can leverage the Figma API to have this happen automatically at build time.
- `orderData.ts`: I realize that in a real life scenario, we'd be fetching order data from an API. I have some comments around the repo about this, but consider this the source of truth for how the app would load data (and note that it suppports multiple orders!).

Now then, to speak briefly through the heirarchy here:

- `App` is pretty straightforward, it simply maps out an `OrderActionCard` for each order retrieved.
- `OrderActionCard` leverages nested styles to style the header and `OrderActionButton`s.
- `OrderActionButton` contains most of the logic for forms in this prototype; I've made an assumption that each button will instantiate a modal with a form to be completed, per variant. This could get hefty if we add more variants, but I've memoized and used callbacks to ensure performance here. We could split it down the road to maintain readability.
  - Note that while `Modal` would always be instantiated with each action, we can feed it different forms from `components/ModalContents`.
- `Badge`, `Button`, and `Modal` are universal UI components that should be reusable everywhere.

### Notes on Styling
- I have ensured this works in viewports down to 300px wide without signifiant breakages. 
- Each component's styles are localized directly to that component, but in this particular case, I have relied just a bit on inherited styles from parent components (e.g. `font-family`). Should we go further with this project, I'd add appropriate styles and consider having a dictionary of common traits that I can do a one-line import for.
- I tend to rely on flexbox implementations as they closely mirror Figma's Auto Layout functionalities.

## Potential Next Steps
Although this repo contains all the appropriate styles and behavior documented in [the Figma prototype](https://www.figma.com/design/ZM2a95BHxD2ghAbktn3Ql9/Principal-Frontend-Engineer-Prompt?node-id=1-8865&t=AHvvJWVMeoumkr2c-0), several steps could be taken to improve this repository. Should we move forward, I would consider the following:

1. **Form Manager Library**: For this one simple form, I didn't want to add the weight and complexity of something like `react-hook-form` for advanced validation. But that's something that could reasonbly be done when adding another, more complex form.
2. **Unit & Integration Tests**: Yep, we didn't write tests for this and I am generally not a test-driven developer. But we should.
3. **Component Library Integration**: With minimal effort, we could incorporate something like Storybook to the key reusable components like `Modal` and `Button`.
4. **Mock API**: Although this was developed with proper API integration in mind, we are just using mock data and have no loading states for functionality. In conjunction with the form library above, I'd explore loading states while fetching orders and POSTing your order confirmation.