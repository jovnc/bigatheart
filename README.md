# Hack4Heart

We are Hack4Hearts! We are a team of 2 persons, looking to leave a positive impact on the community through our project.

We are responding to Problem Statement #1 of Hack4Good 2024, to develop a low-cost and efficient volunteer management solution for NPO Big At Heart.

![Logo](./public/assets/images/logo.png)

To achieve this, we created an aesthetically pleasing and user-friendly platform which aims to motivate volunteers to sign up more events through the ease of use of our website as well as through gamification of the volunteering system (including avatar unlocking, live view of user statistics etc.) The platform also aims to speed up administrative processes by allowing administrators to approve events and attendance easily. Administrators can now generate reports regarding volunteer trends (such as the number of volunteer hours for each month and for each gender, employment status etc.). Certificate issuing, welcome emails and WhatsApp group invites are automated.

This is the link to our [website](https://bigatheart.vercel.app/) hosted on Vercel.

## Tech Stack

- **Next.JS**, which is a fullstack framework built on top of React to handle both client side and server side rendering and logic
- **Tailwind CSS** to style components in React
- **Chakra UI** for pre-built React components to help with the design and layout
- **Supabase** which serves as the database to store user and event information, etc.
- **Supabase Auth** to help with authentication, middleware, registration, cookie management, etc.
- **EdgeStore** for object/file-level storage to help with certificarte and invitation generation and storage
- **PDFKit** to help with customising certificate and invitations
- **Vercel** for CI/CD deployment and web hosting

## Getting Started

These are the steps to get started with Hack4Heart website

1. Download [Node](https://nodejs.org/en/download)
2. Make sure you have Git installed and configured
3. `git clone` the repository
4. `cd bigatheart` to switch to the repository
5. `npm install` to install all node dependencies for the project
6. Create a `.env.local` file at the root of the `bigatheart` directory
7. Sign up for a Supabase account and create a new bucket and obtain the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` and place them inside the `.env.local` file
8. Configure the tables and fields of the Supabase database with relevant fields
9. Configure appropriate RLS for the tables
10. Sign up for an Edgestore account and create a new project and obtain `EDGE_STORE_ACCESS_KEY` and `EDGE_STORE_SECRET_KEY` and place them inside the `.env.local` file

```
NEXT_PUBLIC_SUPABASE_URL = your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY =  your_key
EDGE_STORE_ACCESS_KEY = your_key
EDGE_STORE_SECRET_KEY = your_key
```

11. `npm run dev` to run the website in local development server
12. `npm run build` then `npm run start` to build and run the production server locally
13. Optionally, you can choose to deploy on CI/CD web hosting sites such as Vercel or Netlify

## Future Development of Hack4Heart

Due to time and manpower limitations, we could only do so much and there are many places that can still be improved upon

1. Next.JS performance optimisation for faster speed loads
2. Additional sorting and filter fields for better user experience
3. Additional Graphs generated based on data fetched from the API
4. Integration of ChatGPT into the poster description for creation of events to help administrators write out the poster description
5. Implement tighter RLS security policies for database to prevent hacking
6. Lazy loading of events and creating pages to browse events
7. Generate more various kinds of certificates and invitation templates for better user experience
8. Generate Excel file from the user data for easier housekeeping for admins

Credits: Jovan Ng Chengen, Loh Jia Xin
