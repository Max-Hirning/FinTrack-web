# FinTrack Web
Welcome to the FinTrack Web, a web client service for a fintrack app built using NextJS, Tailwind css, and other technologies.

## Getting Started
To get started with the FinTrack Web, follow these steps:

- [NextJS](https://nestjs.com/): A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- [Tailwind css](https://www.mongodb.com/): A NoSQL database for storing recipe data.
- [Chart.JS](https://cloudinary.com/): For storing and serving recipe images.
- [Formik](https://jwt.io/): JSON Web Token for authentication.
- [Next Auth](https://www.npmjs.com/package/bcrypt): A library for hashing passwords securely.
- [React](https://mongoosejs.com/): A MongoDB object modeling tool.
- [Reduxtoolkit](https://jestjs.io/): A JavaScript testing framework.
- [Yup](https://github.com/visionmedia/supertest): A library for testing HTTP servers.
- [ESLint](https://eslint.org/): A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [FXRatesAPI](https://fxratesapi.com/docs): Currencies rates API.

Clone the repository:

1. Copy code:
`git clone https://github.com/Max-Hirning/FinTrack-web.git`

2. Install dependencies:
`npm install`

3. Set up your environment variables by creating a .env file in the root directory. Sample .env variables:
* `NEXTAUTH_SECRET=""` 
* `NEXTAUTH_URL="http://localhost:3000"` 
* `NEXT_PUBLIC_API_URL=""` 
* `NEXT_PUBLIC_LOCAL_URL="http://localhost:3000"`

4. Test account for app:
* email: `test@gmail.com`
* password: `qwerty12345`</br>
#### You can't: </br>
* change password, email
* change some transactions/cards which aren't yours
* delete account. <br/>
#### You can: </br>
* create transactions/cards and update them or delete
* update other account info such as currency, names and avatar
* send `contact us` form

5. Start the development server:
`npm run dev`

The API server will start at `http://localhost:3000`.

---
#### **[API](https://github.com/Max-Hirning/FinTrack-api)**
---

## Support and Contributions
For support, questions, or feedback, please contact maxhirning25@gmail.com.

If you would like to contribute to the FinTrack Web, fork the repository and create a new branch for your feature. Submit a pull request with detailed information about the changes.

## License
This project is licensed under the MIT License.


## Additional Commands
***I haven't written the tests yet.***
* Run build:
`npm run build`
* Run typescript checking:
`npm run ts.check`
* Run linting:
`npm run lint`

Thank you for using the Fintrack Web! We hope it helps you manage your finance with ease. Happy coding!



## About the Author
FinTrack Web is developed and maintained by Max Hirning. For more projects and updates, visit the [GitHub repository](https://github.com/Max-Hirning).


## Future updates
* Invest tracker(stocks)
* Crypto tracker(cryptocurrencies)
