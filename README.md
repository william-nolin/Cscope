# PFE028

**Auteurs** : Cédric Audy, Julien Boisvert-Simard, Félix Dufresne

**Superviseurs** : Ali, Ouni

Dans le cadre de LOG795 – Projet de fin d’étude

## Quick start using Docker
Make sure you have docker installed on your machine: https://docs.docker.com/engine/install/

1. Clone the repo locally
2. Run `docker compose up`

This will start both the backend and frontend services.

Visit http://localhost:8080/

## Séparation

La séparation des fichiers est claire, backend, frontend et documentation

## Documentation

Un guide utilisateur et de programmeur se trouve dans la documentation ainsi que plusieurs readme dans chacun des sous-dossier

## Edit : option manuelle

Dans /cscope/api, exécutez :
1. docker build -t cscope -f Dockerfile.dev .
2. docker run -p 3000:3000 --name cscope cscope
3. docker exec -it cscope /bin/bash
    3.1 ./bin/rails db:reset && ./bin/rails db:prepare
    3.2 ./bin/jobs

Dans /cscope/frontend, exécutez : 
1. npm run start
