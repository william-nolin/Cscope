# Endpoints

## Introduction
This project is a standard rails project. Therefore, you can get a good overview of all the endpoints by checking the [`config/routes.rb`](../config/routes.rb) file. You can learn about routing in rails here: https://guides.rubyonrails.org/routing.html

## Repositories
### Search a repository via URL
Retrieve data about a repository via a remote URL.
Currently, only repositories from `https://github.com` are supported.

Example request for a repository not yet analyzed by the application:
```
GET /repositories/search?url=https://github.com/moodle/moodle
```

Response:
```json
  "repository": null,
  "remote_repository": {
    "name": "moodle",
    "description": "Moodle - the world's open source learning platform",
    "domain": "github.com",
    "path": "/moodle/moodle",
    "url": "https://github.com/moodle/moodle"
  }
```

Example request for a repository known by the application:
```
GET /repositories/search?url=https://github.com/moodle/moodle
```

Response:
```json
  "repository": {
    "id": 12345,
    "name": "moodle",
    "domain": "github.com",
    "path": "/moodle/moodle",
    "url": "https://github.com/moodle/moodle",
    "created_at": "2024-11-02 05:25:16.365778000 UTC +00:00",
    "updated_at": "2024-11-02 05:25:16.365778000 UTC +00:00"
  }
  "remote_repository": {
    "name": "moodle",
    "description": "Moodle - the world's open source learning platform",
    "domain": "github.com",
    "path": "/moodle/moodle",
    "url": "https://github.com/moodle/moodle"
  }
```

Example request for a repository that does not exists:
```
GET /repositories/search?url=https://github.com/not-found/invalid
```

Response:
```json
  "repository": null,
  "remote_repository": null
```

### Show information about a repository
Retrieve data about a repository.

Example request:
```
GET /repositories/1
```

Response:
```json
{
  "id": 1,
  "name": "rails",
  "domain": "github.com",
  "path": "/rails/rails",
  "created_at": "2024-10-09T01:05:49.819Z",
  "updated_at": "2024-10-09T01:05:49.819Z"
}
```

### Create a repository
Ask the API to create an entry for a repository.
If the url points to a valid remote repository, a record for that repository will be created.

Example request:
```
POST /repositories
Content-Type: application/json

{
  "url": "https://github.com/discourse/discourse",
}
```

Response:
```json
{
  "id": 1,
  "name": "discourse",
  "domain": "github.com",
  "path": "/discourse/discourse",
  "created_at": "2024-10-16T01:05:49.819Z",
  "updated_at": "2024-10-16T01:05:49.819Z"
}
```

### List files on a repository
Retrieve the full list of files of a repository.

Example request:
```
GET /repositories/1/tree/head
```

Response:
```json
[
  {
    "filepath": "actioncable/CHANGELOG.md",
    "line_count": 7
  },
  {
    "filepath": "actioncable/MIT-LICENSE",
    "line_count": 20
  },
  {
    "filepath": "actioncable/README.md",
    "line_count": 24
  },
  {
    "filepath": "actioncable/Rakefile",
    "line_count": 44
  },
  ...
]
```
