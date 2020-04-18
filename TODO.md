# ToDo list

- [x] list all users for host
- [x] list all users by team for host
- [ ] point system for host (miss increment/decrement point)
- [ ] display current team point for player (miss synchro with event)
- [ ] bug: when change teams, create new user, without
delete old
- [ ] bug: style tab host (active/inactive)

# new interface

- host<br>
    - [x] make it static
    - [ ] make it dynamics<br>
        - [ ]  list buzzes (on buzzes)
        - [ ]  clear buzzes (emit clear buzzes)
        - [ ]  team list (on new player|player_exit)
        - [ ]  scores ( on score change )
- login<br>
    - [x] make it static
    - [ ] make it dynamics
        - [ ] fill select (on load + on team create)
        - [ ] create team: check if exist before
        - [ ] login (emit new player)
- play<br>
    - [x] make it static
    - [ ] make it dynamics
        - [ ] click buzz (emit buzz)
        - [ ] scores ( on score change )
        - [ ] change team
            - [ ] go to login
            - [ ] emit player_exit
