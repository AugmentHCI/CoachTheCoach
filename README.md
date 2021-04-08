# CoachTheCoach

This project tries to create a profile of a coach based on a questionnaire of 60 items

##Deployment through git
1. ssh to server (putty)
2. [optional] git clone
3. cd CoachTheCoach
4. git pull
5. podman build -t coachthecoach:dev .
6. podman stop/rm coachthechoach   
7. podman run -dit --name coachthecoach -p 3039:3000 coachthecoach:dev
8. test on picasso.experiments.cs.kuleuven.be:3039