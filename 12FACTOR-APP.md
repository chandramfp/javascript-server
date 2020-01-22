# The Tweleve Factors
##### In the modern era, software is commonly delivered as a service: called web apps, or software-as-a-service. The twelve-factor app is a methodology for building software-as-a-service apps that:-

- ##### Use **declarative** formats for setup automation, to minimize time and cost for new developers joining the project;
- ##### Have a **clean contract** with the underlying operating system, offering **maximum portability** between execution environments;
- ##### Are suitable for **deployment** on modern **cloud platforms**, obviating the need for servers and systems administration;
- ##### **Minimize divergence** between development and production, enabling **continuous deployment** for maximum agility;
- ##### And can **scale up** without significant changes to tooling, architecture, or development practices.

### 1. Codebase
- #### One codebase tracked in revision control, many deploys
##### There is only one codebase per app, but there will be many deploys of the app. This means that you might have deployed your application to production and to staging, for example. Both environments share the same codebase, but might be in a different state. Staging could have some commits not yet deployed to production for testing.

### 2. Dependencies
- #### Explicitly declare and isolate dependencies
##### **A twelve-factor app never relies on implicit existence of system-wide packages**. It declares all dependencies, completely and exactly, via a dependency declaration manifest. Furthermore, it uses a dependency isolation tool during execution to ensure that no implicit dependencies “leak in” from the surrounding system. The full and explicit dependency specification is applied uniformly to both production and development.

### 3. Config
- #### Store config in the environment
##### An app’s config is everything that is likely to vary between deploys (staging, production, developer environments, etc). This includes:

- ##### Resource handles to the database, Memcached, and other backing services
- ##### Credentials to external services such as Amazon S3 or Twitter
- ##### Per-deploy values such as the canonical hostname for the deploy
- ##### Apps sometimes store config as constants in the code. This is a violation of twelve-factor, which requires strict separation of config from code. Config varies substantially across deploys, code does not.

### 4.Backing Services
- #### Treat backing services as attached resources
##### A backing service is one that requires a network connection to run, like MySQL or Memcached. If the location or connection details of such a service changes, you should not have to make code changes. Instead, these details should be available in the configuration.

##### For example, your development environment talks to a MySQL server on your local machine. On production, your database runs on another server. The only difference will be the URL to connect to in the configuration.

### Build, release, run
- #### Strictly separate build and run stages
##### Build, release, and run stages should be treated as completely distinct from one another:

- ##### The build stage is fully controlled by the developer. This is where we tag a new release and fix bugs.
- ##### The release stage prepares the build for execution in the target environment. In this stage, you can run tests to verify if the code behaves as intented.
- ##### The run stage executes the application and should not need any intervention.
- ##### For example, it's now impossible to make changes to the runtime. Instead, you make changes to the code in the build stage where you have total control. This reduces risk and ensures your team that everything is running well.
### 6. Processes
- #### Execute the app as one or more stateless processes
##### Stateless applications are designed to degrade gracefully. That means if a part of your application stack fails, the app itself does not become a failure. In other words, the state of your system is completely defined by your databases and shared storage, and not by each individual running application instance.

### 7. Port Binding
- #### Export services via port binding
##### Your application service should also be accessible via a URL, just as your backing services are. This enables your application to be fully self-contained.

##### This means you should be able to run the Joomlatools Platform using PHP's built-in webserver on your development machine, while your production server can route your domain name to the application by adding a more complicated webserver on top.

### 8. Concurrency
- #### Scale out via the process model
##### Every process inside your application should be treated as a first-class citizen. That means that each process should be able to scale, restart, or clone itself when needed. This approach will improve the sustainability and scalability of your application as a whole.

### 9. Disposability
- #### Maximize robustness with fast startup and graceful shutdown
##### When you deploy new code, you want the new version to start right away and be able to deal with incoming traffic. This principle is a natural result of the backing services and concurrency principles: after a crash or new deployment, your app should have everything it needs waiting in databases or caches. Reloading the code should only take a few seconds max.

### 10. Dev/prod parity
- #### Keep development, staging, and production as similar as possible
##### Your development environment should resemble production as close as possible. That means working on the same operating system, using the same backing services and the same dependencies, and so on. This reduces the number of bugs and downtime and allows your organisation to have a much more rapid development cycle.

### 11. Logs
- #### Treat logs as event streams
##### Logging is important for debugging and checking up on the general health of your application. However, your application should not be concerned with the storage and management of these logs. Instead, log entries should be treated as an event stream that is routed to a separate service for archival and analysis.

### 12. Admin Processes
- #### Run admin/management tasks as one-off processes
##### Once your application is running in production, you'll want to do a lot of simple administrative tasks from time to time. You could need to run a database migration or fetch analytical data to gather business insights.

