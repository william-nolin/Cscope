## Installation
- Create new `.env` file at root of project
- Paste the content of the `.env.example` file to the new .env file
- Install dependencies: `npm install`
- To start to project: `npm run dev`

## Docker

- Create docker container: `docker build . -t "frontend"`
- Run the container: `docker run -d -p 8080:8080 frontend`
- Access the application: [http://localhost:8080/](http://localhost:8080/)