# TU Searchable Directory

Deployed at : http://nqbjqywexniaccq.bct.itclub.pp.ua/

Think of the TU Searchable Directory as a super helpful website. It’s like
an online book that has all the details about the colleges and schools under Tribhuvan
University. This includes information about the teachers and staff too. The cool thing is
that you can use it anytime and anywhere because it works on your computer and even
on your phone.
Imagine you’re a student or someone who wants to know about the colleges and the
people working there. Instead of searching through lots of papers, you can just go to
this website and find all the info you need.

## Setting up your project

### 1. Clone the repository:

```
git clone https://github.com/sandipkatel/Tu-Search-Directory

```

#### If already cloned run

```
git fetch --all --prune
git checkout main
```

### 2. Open the project directory.

### 3. Change directory to Frontend/.

### 4. Open terminal/command prompt.

## Run Frontend

### 5. Run `npm install` in your terminal to install all dependencies.

### 6. Run `npm run dev` to run the NextJs frontend.

## Create a databse server

### 7. Install Postgresql

### 8. Run queries in `query_postgres.sql` and `query_postgres2.sql` to create databse server.

### 9. Finally run `psql -U postgres` to connect

### If unable to create server run `pg_ctl -D "C:\Program Files\PostgreSQL\17\data" start` for version `17`.

## Run Backend

### 10. Go back to main directory of project and open Backend.

### 11. Run `nodemon index` in your terminal to run the Node backend prerequesties to install nodemon.

### 12. Finally, open your web browser and visit `http://localhost:3000/ ` to see the project in action.

## To make postgre server online

### Run `New-NetFirewallRule -DisplayName "PostgreSQL" -Direction Inbound -Protocol TCP -LocalPort 5432 -Action Allow` to allow fire wall

### Run `netstat -ano | findstr :5432` To start the server

### And run `psql -h 2403:3800:3204:16e3:e917:6772:faba:fc5 -U postgres -d tu_search_directory`on different computer to access database remotely


## Glimps of Final Output
![TU-Search-Directory](./Media/TU-Search-directory.mp4)

## Authors

- [@Sandip Katel](https://github.com/sandipkatel)

- [@Saphal Rimal](https://github.com/saphalr)
- [@Sijan Joshi](https://github.com/sijanj)

- [@Sharad Pokharel](https://github.com/sharadpokharel108)
