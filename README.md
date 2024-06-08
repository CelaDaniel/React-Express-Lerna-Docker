# Monsters App Start 🚀🏁▶️🚩

### Step 1: Download Docker Desktop
Ensure Docker Desktop is installed on your machine. You can download it from [here](https://www.docker.com/products/docker-desktop).

### Step 2: Install python

### Step 3: Start Monsters App

1. Start Application with (No Logs on Console)
```bash
npm start
```
or

2. Start Application with (Logs on Console)
```bash
npm start logs
```

### Step 4: Start Lerna workspaces in parallel

```bash
npm start
```

### Step 5: App ports

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
### Stop Monsters App (Delete(Containers + Volumes))
```bash
npm run exit
```