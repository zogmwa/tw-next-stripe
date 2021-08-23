# ui

This library was generated with [Nx](https://nx.dev). It contains the codebase for the common ui components used in the app.

## Project Structure

We are using the following project directory structure

```
ui
  - index.ts
  - src
    - components (directory containing all the components)
      - button (directory containing the button component)
        - index.ts
        - button.tsx
        - button.stories.tsx
        - button.test.tsx
      - input (directory containing the input component)
        - index.ts
        - input.tsx
        - input.stories.tsx
        - input.test.tsx
    - utils (directory containing all the util functions)
      - theme.ts
    - hooks (directory containing all the hooks)
      - use-user.ts
      - use-auth.ts
```

### Component files

- `index.ts` - It just re-exports the component from `component.tsx`.
- `component.tsx` - It exports the component. Make sure to use **named export** instead of **default export** to make sure that the code would be compatible with [storybook](https://storybook.js.org/)
- `component.stories.tsx` - File containing the stories for a particular component
- `component.test.tsx` - File containing component's tests

Please refer to the `src/components/button/button.tsx` and `src/components/button/index.ts` for reference.

> @TODO: Add tests and stories for the missing components in future

## Technologies Used

- `react`
- `tailwindcss` - for styling
- `react-query` - for fetching data
- `@headlessui/react` - for creating custom components like (modal, dropdown, etc.)
- `downshift` - for building custom search functionality
- `constate` - for state management using `context` and `hooks`
