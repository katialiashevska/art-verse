# Art-Verse

_by Katia Liashevska_

## Description of the project

Art-Verse is the final project I created during my 2023 Ironhack bootcamp in full-stack web development. I was inspired by [Google Arts & Culture](https://artsandculture.google.com/), an amazing plaform which has captured the hearts of art professionals and enthusiasts alike.
My app grants you access to an extensive catalogue of modern art pieces from the collection of one of the world's major art museums, [The Art Institute of Chicago](https://www.artic.edu/). By signing up for an account, you can curate your personal list of favourites that you can access on a dedicated page, truly making the experience your own.

## Tech stack

This full-stack application was built using the MERN stack (MongoDB, Express.js, React.js & Node.js).
It is integrated with a [public external API](https://api.artic.edu/docs/) kindly provided by The Art Institute of Chicago.
This is the front-end of the app which was created with React.js.
The back-end of the app is accesible via the _art-verse-server_ repo.

## Features

-   Infinite scroll through all the artworks on the home page and see their basic info on a simple hover thanks to the dynamic tooltip
-   Check the details and the large format image of each artwork in a dedicated modal by clicking on it from the home page as well as from the favourites page
-   Sign up or log in to add artworks to your favourites, as well as save and edit personalised notes on each of them from your profile

## Demo

[Art-Verse](https://art-verse.netlify.app/ "Art-Verse")

<hr>

#### Note to self

When working on the app again in the future, the path in BACKEND_URL.jsx file needs to be changed to "http://localhost:5005" to run locally and then changed back to the current path for deployment.
