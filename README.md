
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

- Car list with filtering by brand and model
- Pagination for the car list
- Car detail page with image slider
- State persistence using `localStorage`
- Responsive design with Bootstrap

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [react-slider-image-js Documentation](https://github.com/harshnahta/react-slider-image-js) - learn about react-slider-image-js features and API.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Project Structure

```
.
├── components
│   ├── AutomobileCard.tsx
│   ├── AutomobileList.tsx
│   ├── EleganceFilter.tsx
│   ├── Pagination.tsx
│   └── PhotoGallery.tsx
├── interfaces
│   ├── automobile.ts
│   └── filterProps.ts
├── pages
│   ├── _app.tsx
│   ├── index.tsx
│   └── car
│       └── [id].tsx
├── public
│   └── placeholder.jpg
├── styles
│   └── globals.css
├── utils
│   └── api.ts
└── README.md
```

### Components

- `AutomobileCard.tsx`: Displays information about a single car and includes the `PhotoGallery` component.
- `AutomobileList.tsx`: Displays a list of cars using `AutomobileCard`.
- `EleganceFilter.tsx`: Provides filters for brands and models.
- `Pagination.tsx`: Handles pagination of the car list.
- `PhotoGallery.tsx`: Implements the image slider using `react-slider-image-js`.

### Interfaces

- `automobile.ts`: Type definitions for car data.
- `filterProps.ts`: Type definitions for filter data and props.

### Pages

- `_app.tsx`: Custom App component for initializing pages.
- `index.tsx`: Main page that displays the car list.
- `car/[id].tsx`: Car detail page.
