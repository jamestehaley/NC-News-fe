# Northcoders News front end

A frontend SPA for the Northcoders api. [Available here!](https://nc-news-jamestehaley.netlify.com/)

## Getting Started

These instructions will help you get the NC News front-end up and running on your local machine to view and edit.

### Prerequisites

To get your own copy of this project, fork this github repository and in your terminal, move to an appropriate directory and type the following command into your terminal using your new repository's url

```
git clone https://github.com/exampleusername/NC-News-fe.git
```

In order to install dependencies, ensure that you are in the root directory of this project, and type the following into the terminal:

```
npm install
```

To run the server, all you then need to do is run the following command, which should open a live server of the application in a browser

```
npm start
```

## How to use NC News

Upon opening the website, **after a period of loading**, you should find yourself on a page showing all articles. From here you can click anywhere on an article to view it in full with its comments, press the three bars in the top left to pick a topic of articles to view, or select ordering criteria or page using the search options above the article list. By default, you are not logged in, but can easily sign in to any existing profile just by clicking on the sign in button, and then selecting a user. This was a decision based upon the fact that there is no encrypted authentication for this website.

Once logged in, to post a new article, click on the New Article button on the articles list. If the user wishes, they can additionally make a new topic for the article using the new article page, which adds it to the sidebar.

Posting comments is similar: on an article page, any user can post comments, but only the user who posted them or the 'administator' account can delete them. The same requirements exist for deleting articles.

If all articles of a single topic are deleted, the topic is also deleted to save space, but the same topic can be remade by posting a new article with that topic.

The aesthetics of the website were designed to mimic [NorthCoders](https://northcoders.com) own website.

### Links

- [Hosted Back-end API](https://nc-news-jamesteh.herokuapp.com/api)
- [Back-end Github](https://github.com/jamestehaley/NC-News)
- [Hosted Front-end](https://nc-news-jamestehaley.netlify.com/)

## Built with

- [Axios](https://www.npmjs.com/package/axios) - A module for handling API promises
- [React](https://reactjs.org/) - A JavaScript library for building interfaces
- [Reach router](https://reach.tech/router) - A simple, accessibility friendly router for react.

Using the following testing modules for utilities

- [Mocha](https://mochajs.org/) - Javascript test framework
- [Chai](https://www.chaijs.com/) - Assertion library

## Author

- [James Haley](https://github.com/jamestehaley)

## Acknowledgements

Thankyou to the support from northcoders staff and my peers
