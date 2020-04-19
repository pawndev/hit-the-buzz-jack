# ToDo list

- [x] list all users for host
- [x] list all users by team for host
- [x] point system for host (miss increment/decrement point)
- [x] display current team point for player (miss synchro with event)
- [x] bug: when change teams, create new user, without
delete old
- [x] remove all old assets
- [x] remove all old pages
- [x] clean routes
- [x] use cdn for uikit
- [ ] refactor the player part (like in the host part)
- [ ] try to separate all event listener in the backend
- [x] dockerfile
- [ ] helm chart
- [ ] Readme
    - [ ] Usage (installation, with/without docker)
    - [ ] Docker build/run
    - [ ] Helm chart

# new interface

- host<br>
    - [x] make it static
    - [x] make it dynamics<br>
        - [x]  list buzzes (on buzzes)
        - [x]  clear buzzes (emit clear buzzes)
        - [x]  team list (on new player|player_exit)
        - [x]  scores ( on score change )
- login<br>
    - [x] make it static
    - [x] make it dynamics
        - [x] fill select (on load + on team create)
        - [x] create team: check if exist before
        - [x] login (emit new player)
- play<br>
    - [x] make it static
    - [x] make it dynamics
        - [x] click buzz (emit buzz)
        - [x] scores ( on score change )
        - [x] change team
            - [x] go to login
            - [x] emit player_exit
