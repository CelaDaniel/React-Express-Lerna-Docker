## Project Setup

---
## Docker Start (Recommended) 🚀🏁▶️🚩
### Step 1: Download Docker Desktop
Ensure Docker Desktop is installed on your machine. You can download it from [here](https://www.docker.com/products/docker-desktop).

### Step 2: Install python

### Step 3: Start Monsters App
```bash
npm start
```

## Other Commands


### Stop Monsters App (Delete(Containers + Volumes))
```bash
npm run exit
```
---

## Lerna Start (It is not necessary if you will use the above method☝️)
### Step 1: Download Docker Desktop
Ensure Docker Desktop is installed on your machine. You can download it from [here](https://www.docker.com/products/docker-desktop).

### Step 2: Install python

### Step 3: Install Node Modules

```bash
npm install
```
### Step 4: Build Lerna Workspaces
```bash
npm run build
```
### Step 5: Start Monsters App Containers

1. Start Application with (No Logs on Console)
```bash
npm run start:docker
```
or

2. Start Application with (Logs on Console)
```bash
npm run start:docker logs
```

### Step 6: Start Lerna workspaces in parallel

```bash
npm start
```

### Step 7: App ports

1. Find React App here:
```
http://localhost:3000
```


2. Find Express App here:
```
http://localhost:5000
```
<b>Notes:</b> The command <b>"npm run start:docker"</b> will start the containers. The mysql db is in path : ./backup/mysql/monsters_db.sql.
<br/>
<br/>
When mysql container starts, it will get the bd from <b>./backup/mysql/monsters_db.sql</b> and restores in the mysql.
<br/>
On command <b>"npm run exit"</b> the <b>monsters_db.sql</b> will be backuped in <b>./backup/mysql</b>

### Postman Collecion is in path "./postman"


## Other Commands

---
### Stop Monsters App (Delete(Containers + Volumes))
```bash
npm run exit
```

### Format Code
```bash
npm run format
```
