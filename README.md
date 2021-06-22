# CoachTheCoach

This project tries to create a profile of a coach based on a questionnaire of 60 items
This branch shows the "coachkompas" without octant

##Deployment through git
1. ssh to server (putty)
2. [optional] git clone
3. cd CoachTheCoach
4. git pull
5. Add src>auth.json   
5. podman build -t coachthecoach:dev .
6. podman stop/rm coachthecoach   
7. podman run -dit --name coachthecoach -p 3049:3000 coachthecoach:dev
8. test on picasso.experiments.cs.kuleuven.be:3049

## Prerequisites
1: mongodb
2: nodeserver

## mongodb deployment
podman run –d -–name mongoCoachTheCoach –p 3037:27017 –v ./data:/data/db –e MONGO_INITDB_ROOT_USERNAME=admin –e MONGO_INITDB_ROOT_PASSWORD=secret mongo:4.4

## Test database
Studio 3T
Host: picasso.experiments.cs.kuleuven.be:3037
AuthenticationDB: admin
Username: admin
password: secret: ask person from faber