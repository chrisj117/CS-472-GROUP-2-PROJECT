# Course Review Web App
This repository contain source code and documentation for Group 2's CS 472 project. This project’s aim is to be a web application that serves as a hub for students to discuss courses. As of now, student feedback and information for courses are fragmented across various sites and amongst course catalogues. With this app, the main categorization for user posts would be the classes themselves. Main inputs will be comments about the course and rating scales, and users will navigate the website via sorting by schools and classes
## System Architecture
The App is decoupled to two parts backend (api) and frontend (web). 
- **Api**: Contain business logic rendered as set of endpoints using [RESTFul API]() design principles. The programmning language is Python and we leverage the [Django RESTframework](). 
- **Web**: Cool and intractive user interface designed with [React Bootstrap]()

[![Architecture of
Course Review App](./docs/img/class_diagram.jpg)](./docs/img/class_diagram.jpg)
## Features
- Post reviews
- Read reviews, update and delete own reviews
- Download analytical reports
- Compare Course Reviews across different schools

Installation and Usage
1. Running locally without "Docker"
   
2. Running locally with "Docker for Desktop"

## Contributing
We invite you to help us build this platform. Please look up the [contributing guide]() for details.

## Issues
Before reporting a problem, please check out the [issue guide]().