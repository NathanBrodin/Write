export type Template = {
  title: string;
  description: string;
  content: string;
};

export const templates: Template[] = [
  {
    title: "Blank",
    description: "A blank page, ready for your content",
    content: "",
  },
  {
    title: "School report",
    description: "Answer your teacher's questions, and get a good grade",
    content: `# Title

**members**: [John, Jane, Alice, Bob]

**date**: 2020-01-01

## Part 1

- **Question 1**
Answer 1`,
  },
  {
    title: "Meeting notes",
    description: "Keep track of what was discussed in a meeting",
    content: `# Meeting notes
**date of meeting**: 2020-01-01
**members**: [John, Jane, Alice, Bob]

## Agenda
- **Item 1**
  - Subitem 1
  - Subitem 2

## Notes
`,
  },
  {
    title: "Recipe",
    description: "Write down your favorite recipes",
    content: `# Recipe
**name**: Spaghetti Carbonara
**ingredients**:
- 200g spaghetti
- 100g pancetta
- 2 eggs
- 50g parmesan
- salt
- pepper

**instructions**:
1. Boil the spaghetti in salted water
2. Fry the pancetta in a pan
3. Mix the eggs and parmesan in a bowl
4. Drain the spaghetti and mix with the pancetta
5. Add the egg and cheese mixture
6. Mix well
7. Serve with a sprinkle of pepper
    `,
  },
];
