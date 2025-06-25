# RecruitMax Takehome Assessment

## Background

This is an opportunity to demonstrate your frontend knowledge and familiarize yourself with our stack.

We decided to use some of the most popular libraries/frameworks to abstract out boilerplate code and keep our project organized.

Our frontend is built with:
- `next.js` - [react framework](https://nextjs.org/)
- `@tanstack/react-query` - [state management library](https://www.npmjs.com/package/@tanstack/react-query)
- `shadcn` - [component library with prebuilt components](https://ui.shadcn.com/)
- `tailwindcss` - [styling library](https://tailwindcss.com/)
- `react-hook-form` - [form library](https://www.npmjs.com/package/react-hook-form)
- `yup` - [schema builder for form validation](https://www.npmjs.com/package/yup)
- `lucid-react` - [icon library](https://lucide.dev/icons/)

This take-home assignment is designed to be completed in 1.5 to 2 hours. Please push your changes to the repository and email Bruce and Carey (brucehsu1126@gmail.com and climberkip@gmail.com) when you are completed with the assessment.

## Assessment

You are allowed to use any online resource / AI-assisted IDEs like Cursor. We are primarily interested in seeing how you actually work in order to assess your frontend knowledge and how clean/maintainable your code is. You do not need to go above and beyond to add additional features, besides the ones we specify in the task.

For RecruitMax's MVP, we streamline the process of filling out college athletic recruiting forms across multiple sports (e.g., baseball, basketball, football, etc.).

On our website, users can subscribe to the sports they’re interested in being recruited for.

We have provided stubbed APIs that talk to a fictitious backend to obtain the data that needs to be displayed in the component. These APIs can be found in `/src/api/sports.ts`.

Your task is to build a component that allows users to:
- View all the sports they are currently subscribed to
- Click on a sport's icon to select and switch to that sport
- Add a new sport and display it on the page
- Remove a sport using a delete button
- When all the sports are added, the add sport button is disabled

Use the existing code we provided, as well as the relevant libraries our frontend uses.

Upon loading the page, the screen would look like this:

The screen should look like this:
![image](https://github.com/user-attachments/assets/fe4e1403-845e-4c98-8b22-cf9611e89b9b)


After the tasks are completed, the screen should look like this video.

https://github.com/user-attachments/assets/b604dace-983b-4d15-bc6b-366d8b8a7fd5

Here are some helpful tips for the project organization:
- Mock api functions are included in `/src/api/sports.ts`
- Fetch query options are included in `app/queries.ts`
- Reusable shadcn components are included in `app/components/ui`
- The main file you need to write code in is in `app/_components/user-sport-section.tsx`

## Setting Up the Project
1. Clone the repository
```bash
git clone https://github.com/recruitmax/takehome-assessment.git
```
2. Install [node.js](https://nodejs.org/en) on your computer
3. On your terminal, install all dependencies
```bash
npm install
```
4. Run the local server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
