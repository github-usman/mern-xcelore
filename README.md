# Frontend :
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `npm run build`
for Deployement file

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more 

# Backend:
### User Authentication:
- Register: A new user should be able to register with a first name, last name,
email, and password.
- Login: A registered user should be able to log in using their email and password.
- Logout: A logged-in user should be able to log out.

### Admin Panel:
- Create: Admin should be able to add new users.
- Read: Admin should be able to view the list of users.
- Update: Admin should be able to edit user details.
- Delete: Admin should be able to delete users

### Additional Requirements (Difficulty Enhancement):
- Password Encryption: Ensure that user passwords are securely hashed and
stored in the database.
-  Role-based Access Control (RBAC): Implemented roles (e.g., Admin, User) and
ensure only admins can access the admin panel.
- Form Validation: Implemented  ```[backend]``` form validation for registration
and login forms.
- Error Handling: Implemented proper error handling ```[backend]```
- Pagination and Search: Added pagination from ```[.ENV]``` and search from ```[query params]``` functionality to the user list in
the admin panel.