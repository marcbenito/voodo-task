# Voodoo task
## About the practical tasks:
- For task B I decided to avoid repeated values in the database if we populate the same Given the limited time of the exercise, I decided not to refactor anything.
- I hadn't enough time to refactor but I would like to make some small refactors.# Theory answers
### Question 1
__We are planning to put this project in production. According to you, what are the missing pieces to make this project production ready? Please elaborate an action plan.__

I decided to separate the improvements/missing pieces in:- Performance & architecture- Quality of the code - Others

#### Performance & architecture
Let's imagine that these are the numbers:In 2022 we will have:
- 3.2 Millions APPs in GooglePlay, 
- 2.110 Milions APPS in IOs, 
- 500.000 in Amazon Store.
- I don't have clear numbers about APPs in china but it has about 400 android app stores but only 10 hold the 90% of market. Le'ts imagine that all the APPs in all the marketplaces in China sum up another 6.000 Milion apps.

It makes a total of about __12.000 Milions apps__ approx.
I assume that the frequency of the __Updates + Posts__ in the API should be __"low"__ but the total __search & get queries__ of apps should be __"high"__ but __not as high as an external__ system. In the same way, I imagine that almost all of the queries should come from the API not from te web UI.

Having this numbers in consideration, I decided to:

- __Remove the database__ from the API server nodes to a dedicated database server. For that, a good idea should be migrating into a MySQL database or Postgresql database. Better than that we could use an ElasticSearch database but let's imagine that we don't want to complicate too much the system. Migrating to another SQL database should be a good Idea because we can reuse almost all the code and we can still use sequelize.With the database apart, we can also create database read-only nodes.
- __Scale horizontally__ the API server. With the database outside of the server this task should be easy to accomplish.
- Create a cache layer to cache the last searches. Probably it's not needed and it will complicate more our code but it could be a good idea to scale.

#### Quality of the code
Even the simplicity of the project should be a good idea to split the code by responsibilities. Having for example:
- Routes: file for defining all endpoints.
- Controllers: Taking care about the parameters and preparing the data for the domain layer.
- Services: take apart all the database queries into services.

More aspects of the code quality should be:

- Avoid __adding the models by reading a folder and dynamically__ requiring the models. We have the index file inside the models folder, we can use it to collect all the models and add it there.
- Avoid the use of __require with __dirname__ (the config file). We can do it relative to the project root.
- __Separate the frontend part__. I don't consider that point a performance because of the reduced number of queries that I assume we will have but it could be a good idea to separate that part to allow the teams to work on it independently.- Migrate to typescript. It will help to make more maintainable code.

### Others
- Logs: we need logs. It's basically to find errors and also to know what the user does.
- Monitoring: we need to know what is the status of the system and what is the performance.
- Documentation: we need to know how to use the API. I suggest the use of Swagger.
- Security: I'm assuming that the server is in an internal vpn or something like that. Even that, it should be a good idea to protect the POSTS and PUT calls at least with a user login.
- Deployment: We can prepare some docker compose files to simplyfy the deployment process.



## Question 2
__Let's pretend our data team is now delivering new files every day into the S3 bucket, and our service needs to ingest those filesevery day through the populate API. Could you describe a suitable solution to automate this? Feel free to propose architectural changes.__

- The easiest option should be having a server/process that triggers a cron job every day that activates API endpoint api/games/populate.
- The second option could be removing the populate API and using a lambda function that is triggered every day.

## Question 3:
__Both the current database schema and the files dropped in the S3 bucket are not optimal.Can you find ways to improve them?__
- We can create a new table to define the platforms and then make a foreging key to the platforms table.
- The data of the storeId and publisherId should have the same format in both platforms. We can change one of the feeds to have the same format.
- The S3 files have 3 values for each Game, we can remove the second and third because we don't need them.
- We are receiving a lot of fields that are not used. We can remove them.




