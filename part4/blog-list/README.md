# Fullstackopen Part 4

This is my solution to [Full Stack Open Part 4](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing)

"A blog list application that allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog we will save the author, title, URL, and amount of upvotes from users of the application."

In this exercise you are given a basic application body which you first turn into a functioning npm project connected to a database.
The project is then refactored into separate modules.
Here is a list of the steps taken to achive this:

- start a new npm project -npm init
- install all the required dependencies
- add in error handling
- connect to the database and add the url for this as an environment variable
- verify it is possible to add blogs and that the application returns the added blogs at the correct endpoint

Refactoring:

- set up the file structure
- create a utils/logger.js for all printing to the console
- create a utils/config.js file for handling of environment variables
