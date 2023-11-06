# Course Evaluation App
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ci-pipeline](https://github.com/chrisj117/CS-472-GROUP-2-PROJECT/actions/workflows/ci.yaml/badge.svg)](https://github.com/chrisj117/CS-472-GROUP-2-PROJECT/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/chrisj117/CS-472-GROUP-2-PROJECT/graph/badge.svg?token=****)](https://codecov.io/gh/chrisj117/CS-472-GROUP-2-PROJECT)

This repository contain source code and documentation for Group 2's CS 472 project. This project’s aim is to be a web application that serves as a hub for students to discuss courses. As of now, student feedback and information for courses are fragmented across various sites and amongst course catalogues. With this app, the main categorization for user posts would be the classes themselves. Main inputs will be comments about the course and rating scales, and users will navigate the website via sorting by schools and classes
## System Architecture
The App is decoupled to two parts backend (api) and frontend (web). 
- **API**: Contain business logic rendered as set of endpoints using [RESTFul API](https://restfulapi.net/) design principles. The programmning language is Python and we leverage the [Django RESTframework](https://www.django-rest-framework.org/). 
- **Web**: Cool and intractive user interface designed with [React Bootstrap](https://react-bootstrap.netlify.app/)

<!--![Architecture of
Course Evaluation App](./docs/img/class_diagram.jpg) -->
<p align="center"><img src="https://github.com/chrisj117/CS-472-GROUP-2-PROJECT/blob/main/docs/img/class_diagram.jpg" width="520" height="570"></p>

## Features
- Post reviews
- Read reviews, update and delete own reviews
- Download analytical reports
- Compare Course Reviews across different schools

### Installation and Usage
1. **Running locally**
   
   **Backend API**

   - Setup the API by cloning the repository using `git clone` and `cd` to `/api` diectory.
   - It is a good practice to configure python virtual environment. Use the commands below to setup python virtual environment on `Linux/MacOS` or `Windows OS`
   ```
   # For Linux/MacOS

   python3 -m venv venv
   source venv/bin/activate
   ```
   - For `Window OS` user, the easest approach is to install `virtualenv` by running `pip install virtualenv`. The next step is pretty much similar to above;
   ```
   # For Window OS

   python3 -m virtualenv venv
   venv\Scripts\activate
   ```
   - Install required dependencies using `pip3 install -r requirements.txt`
   - Start the `API` server by running `python3 manage.py runserver`. Ensure that port `8000` is open on your firewell.

   **Frontend**

   - The frontend is based on `React Bootstrap`. Clone the repository using `git clone` and `cd` to `/web` diectory. 
   - Run `npm install` to install all the required dependencies the start the web app by running `npm run dev`. 
   - Go to your browser url and type `localhost:5173`. You should be able to see the landing page of the application
   - That's it 😇, Happy course evaluation or coding!!
2. **Running locally with "Docker for Desktop"**
   - Download and install `Docker fo Desktop` using the [link](https://www.docker.com/products/docker-desktop/). Once you are all set, run the commands below;
   ```
   git clone <project>
   cd /project
   docker compose up -d
   ```
   - That's all 😎!! The backend api and frontend will be running on port `8000` and `5173` respectively. To interact with the app, go to your browser url and type `localhost:5173`. You should be able to see the landing page of the application

## Contributing
We invite you to help us build this platform. Please look up the [contributing guide](CONTRIBUTING.md) for details.

## Issues
Before reporting a problem, please check out the [issue guide](CONTRIBUTING.md).
