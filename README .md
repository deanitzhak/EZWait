# EZWait 

**Welcome to our System!**

We are EZWait. 
Our project deals with appointment management in an easy, fast and accessible way for all types of users - small and large private business clinics.
We will use one database that will contain all customer data and each user defines the restrictions and characteristics of the queue, the entire system will be managed in one place and this will make it easier for the business to manage several platforms at the same time.
The appointments for the manager will be displayed as a calendar where all the details of the existing appointments are displayed.
The customer connects to the system, registers at the desired business, sets a date and the characteristics of the appointment and receives a notification that an appointment has been made. each customer is shown the available appointments in the system so that each patient makes an appointment at a time and hours that are available and suitable for him and the business. any change in the appointment details, for example - changing the date or editing the appointment details, the customer will be notified by email and in the system.

 > **Before you start**
1. [x] Download the code from Git-Hub https://github.com/deanitzhak/EZWait.git
2. [x] Cd to the working directory and start the server using the following command in the terminal - $node app.js
3. [x] Make sure to install all the dependencies  as described in the package.json [npm install].
4. [x] Make sure you have our .env file containing the sensitive info of our system account.
5. [x] You can check our system by using the UI - Open a browser page and go to https://ezwait.onrender.com

> **Instructions**
1. [x] Using the calls to the render website via Postman you can create and start AB test / Feature Flag experiments.
2. [x] View lists of exist experiments and planned future experiments.
3. [x] app.js  – the entry point of the system
4. [x] Router – consists of a map of all the API points for both server and client
5. [x] Controllers – direct the functionality of the system6.
6. [x] Services – contain the business logic of the system.
7. [x] Data Base – MongoDB.
8. [x] repositories .
9. [x] middleware – contain all the error logs - writes call logs inside logs.
    - http calls logger - configured in the middleware directory, writes call logs inside logs folder, filename: http.log
    - error handler - consists of 3 parts:
      - express-async-errors package - wraps the controllers in try/catch statement automatically (no implementation needed), and calls the next(error) function in the catch block with the error thrown. the next function will "fall" into the errorHandler.
      - errorHandler - a function that is used at the end of the server that catches all the errors thrown in the controllers
      - Custom Errors - in the errors' directory. Classes that extends Error class, with status and message to pass to the error handier at the end. More can be added if we need them.
10.[x] models – contain the schemas  that connects to the database through mongoose.

> **Tests**

 All tests were done using Mocha,Chai and sinos.
you can find all the tests under the folder "test".
 use [npm run test] to run all the test and check coverage and results.

> **How to Use**

As we mentioned, we are responsible for the logic in the system, the UI development of the system is done by team, we are responsible for the following features that can be tested by using the UI.
Below are the features in the system for which we were responsible and an explanation of their use

`Add Appointment:`

1. Open login page and signin.
2. Go to "Appointment" page.
3. Now you can see all appointments. 
4. Click on "Add Appointment" button - to add your appointment.
5. Fill all in the fields in the form: 
    * Client Full Name
    * Type
    * Date
    * Time
5. click on "Submit" button.
6. Your appointment is add.

`Edit Appointment:`

1. Open login page and signin.
2. Go to "Appointment" page.
3. Now you can see all appointments. 
4. Click on "Edit Appointment" button - to edit your appointment.
5. Your appointment is edit.

`Cancel Appointment:`

1. Open login page and signin.
2. Go to "Appointment" page.
3. Now you can see all appointments. 
4. Click on "Cancel Appointment" button - to cancel your appointment.
5. Your appointment is cancel.

`Add Customer:`

1. Go to "Customer List" page.
2. Now you can see all customer list. 
3. Click on "Add Customer" button - to add your new customer.
4. Fill all in the fields in the form:  
    * Client Full Name
    * Date of birth
    * Id
    * Family members 
5. click on "Submit" button.
6. Your customer is add.

`Communication:`

1. Go to "Communication" page.
2. Fill all in the fields in the form: 
    * Email
    * Full Name
    * Phone Number
    * Message  
    to return us a message 
3. click on "Submit" button.
4. Your message  is sent.

`Information Profile:`

1. Go to "Profile" page.
2. Fill all in the fields in the form: 
    * Name
    * Age
    * Date of Birth
    * Gender 
    * Email
    * Address
    * Password
    * Phone 
    * Add Family Member
    to fill your information. 
3. click on "Submit" button.
4. Your infomation profile is sent.



`Management Account:`

The management possesses the capability to access a comprehensive overview of all users within the system, including their respective roles, activities, and relevant data. Additionally, they have visibility into the existing queues, encompassing information such as queue statuses, contents, and associated tasks. This authority extends to the capacity to implement modifications, adjustments, and prioritization of queues based on their discretion. In essence, the management holds the authority to exercise control over user-related aspects, as well as the configuration and prioritization of queues within the system, providing a versatile and adaptive approach to meet the project's specific needs and objectives.

`Customer Account:`

The customer can view all of their queues, including a comprehensive display of information such as queue status, content, and associated tasks. Additionally, they are authorized to edit and even cancel these queues as needed. These rights grant the customer full and operational control over their queues, providing them with the flexibility to tailor tasks and actions according to their specific needs and requirements. Thus, the customer can focus on managing their queue activities in a practical and personally customized manner based on project progress and evolving needs.

> **Group members**

* Shir Amar
* Dean Itzhak
* Nave Maymon


Wish you happy Experiments: EZWait 🤩

