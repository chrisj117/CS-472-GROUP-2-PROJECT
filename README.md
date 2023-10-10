# Course Review Web App
This repository contain source code and documentation for Group 2's CS 472 project. This project’s aim is to be a web application that serves as a hub for students to discuss courses. As of now, student feedback and information for courses are fragmented across various sites and amongst course catalogues. With this app, the main categorization for user posts would be the classes themselves. Main inputs will be comments about the course and rating scales, and users will navigate the website via sorting by schools and classes
## System Architecture
The App is decoupled to two parts backend (api) and frontend (web). 
- **Api**: Contain business logic rendered as set of endpoints using [RESTFul API](https://restfulapi.net/) design principles. The programmning language is Python and we leverage the [Django RESTframework](https://www.django-rest-framework.org/). 
- **Web**: Cool and intractive user interface designed with [React Bootstrap](https://react-bootstrap.netlify.app/)

[![Architecture of
Course Review App](./docs/img/class_diagram.jpg)](./docs/img/class_diagram.jpg)
## Features
- Post reviews
- Read reviews, update and delete own reviews
- Download analytical reports
- Compare Course Reviews across different schools

### Installation and Usage
1. **Running locally**
   
   **Backend API**

   - Setup the api by cloning the repository using `git clone` and `cd` to `/api` diectory.
   - It a good practice to configure python virtual environment. Use the commands below to setup python python virtual environment on `Linux/MacOS` or `Windows`
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
   - Run `npm install` to install all the required dependencies the start the web app by running `npm start`. 
   - Go to your browser url and type `localhost:5000`. You should be able to see the landing page of the application
   - That's it 😇, Happy course evaluation or coding!!
2. **Running locally with "Docker for Desktop"**
   - Download and install `Docker fo Desktop` using the [link](). Once you are all set, run the commonds below;
   ```
   git clone <project>
   cd /project
   docker compose up -d
   ```
   - That's all 😎!! The backend api and frontend will be running on port `8000` and `5000` respectively. To interact with the app, go to your browser url and type `localhost:5000`. You should be able to see the landing page of the application

## Contributing
We invite you to help us build this platform. Please look up the [contributing guide]() for details.

## Issues
Before reporting a problem, please check out the [issue guide]().