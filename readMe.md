# Project Information

## npm modules used in it
- **bcrypt**: for hashing the password
- **cors**: as a middleware for express application
- **bodyParser**: as a middleware for express application
- **jsonwebtoken (jwt)**: for authentication and authorization
- **nodeMailer**: email sending services
- **bcrypt**: hashing for the password

### Endpoints
- [Register User](http://192.168.1.64:8080/api/auth/user/register-user)
- [Login](http://192.168.1.64:8080/api/auth/user/login)
- [Google Login](http://192.168.1.64:8080/api/auth/user/google/login)
- [Forgot Password](http://192.168.1.64:8080/api/user/forgot-password)
- [Set Password](http://192.168.1.64:8080/api/user/set-password/:email) (email to be passed in params)
- [Google OAuth](http://localhost:8080/api/auth/user/google/login)
- [Add User Details](http://localhost:8080/api/user/add-details) (when the user is logged in, a pop-up will appear for additional information)

