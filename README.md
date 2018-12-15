# MovieCentral (Team Falcons) 

1. **Rachit Chokshi**, ID: 012550044, rachit.chokshi@sjsu.edu
2. **Shreya Shah**, ID: 012541984, shreya.shah@sjsu.edu
3. **Sheethal Halandur Nagaraja**, ID: 012564786, sheethal.halandurnagaraja@sjsu.edu
4. **Tarun Arora**, ID: 012420772, tarun.arora@sjsu.edu

## Instructions for the TA to grade the app

### While Adding/Editing a movie

* please **do not** try to use **autosaved form submissions**
 
#### Instruction for each field (most important first)

1. Image URL: please provide a link to a **jpg** image on the web (e.g https://images-na.ssl-images-amazon.com/images/I/51ZT6MjIXOL.jpg)
2. Movie URL: Any youtube URL
3. Actors: choose from list or enter new text and select "Create new"
4. Studio, Director, Year, Genre, Country: are plain text fields.

### Click on the site header logo to access the admin dashboard.
### Top Movie scoreboard data is available 

## Click [cmpe275.ddns.net](https://cmpe275.ddns.net) to access

# Technologies used

## Database
Instance of **MariaDB 10.3** managed by Amazon RDS

## Spring Framework: spring-boot
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.1.0.RELEASE)
 ```
### Spring Data JPA
 - Hibernate implementation of JPA
 - Using MySQL5Dialect
 - `PagingAndSortingRepository` and `JpaSpecificationExecutor` for **Paging**, **Filtering** and Sorting resultsets
 - **Spring Specifications** interface using the Criteria API for filter conditions.
 - Entity Relationships and Transactions
		
### Spring HATEOAS
 * For supporting RESt representations of Page and Filtering aggregates.

### Spring AOP
 * <For what?>
 
### JavaMail API
 * For Mail System supporting user sign-ups
 
### spring-boot-core, spring-boot-web, spring-boot-security
 * Part of the Spring Boot framework
 
## Frontend technology: React.js

### Major modules/libraries used

 * FontAwesome
 * Bootstrap
 * ChartJS
 * Redux
 * react-youtube
 * react-toastify
 
 ## Server technologies
 * public facing **Nginx** instance for serving the UI, reverse proxying the backend via `/api` route.
 * Embedded **Tomcat** container for serving the Backend.
 * EC2 t2.micro instance in dedicated VPC hosting the backend and UI.
 * No-IP **dynamic dns** for making the website accessible.
