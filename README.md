# Hit the buzz, Jack

This project was initially a fork of https://github.com/bufferapp/buzzer
<br>
Thanks a lot to this community!

## Getting started

### Local

To build and run this project, make sure you have nodejs/npm installed on your computer.
Then, you can execute these commands:

```bash
$ npm install
# Dev environment
$ npm run start
# OR if you just want to build
$ npm run build
$ npm run run
```

Now, the application will be available on port `3000`

### docker

To set up this project using docker, obviously, make sure you have docker installed and started.
Then, follow these commands:

```bash
# if you want to use the local Dockerfile, build it and run it
$ docker build -t ${USER}/hit-the-buzz-jack
$ docker run -p 8090:8090 --name buzzer ${USER}/hit-the-buzz-jack
# OR if you want to use the official image:
$ docker -p 8090:8090 --name buzzer lesspion/hit-the-buzz-jack:1.0.0
```

Now, the application will be available on port `8090`

To stop/rm this container, follow these commands:

```bash
$ docker stop buzzer
$ docker rm buzzer
```

## Sample dev commands

There are sample commands available in the `package.json` file.
To see all of these commands, run `npm run --list`.

### commands

```bash
$ npm run build    # Build all the application in dist files
$ npm run run      # Run the application from the dist files
$ npm run start    # Run the application with live-reload
$ npm run check    # Check if all the typescript files can be compiled.
$ npm run lint     # Lint all the files to see if the conventions are respected
$ npm run lint:fix # Lint all files, and fix all auto-fixable errors/warnings
```

## K8S / Helm

There is a chart helm available in the folder `k8s/chart`.
You can edit the values.yaml to configure this project for your environment.
Then, simply use all the helm commands, e.g.

```bash
$ cd k8s/chart
$ helm install -n buzzer hit-the-buzz-jack .
```

## mockup
![login](https://raw.githubusercontent.com/pawndev/hit-the-buzz-jack/master/misc/login.jpg)
![main_play](https://raw.githubusercontent.com/pawndev/hit-the-buzz-jack/master/misc/main_player.jpg)
![host](https://raw.githubusercontent.com/pawndev/hit-the-buzz-jack/master/misc/host_dashboard.jpg)

## video

You can find the presentation video here: https://youtu.be/wdHWkQP2u08
