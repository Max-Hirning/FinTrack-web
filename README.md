# FinTrack Web
Welcome to the FinTrack Web, a web client service for a fintrack app built using NextJS, Tailwind css, and other technologies. <br/>
[Published on Vercel](https://fin-track-web.vercel.app/)

## Getting Started
To get started with the FinTrack Web, follow these steps:

- [NextJS](https://nextjs.org/): React framework that enables server-side rendering, static site generation, and other powerful features for building fast and scalable web applications.
- [Tailwind css](https://www.npmjs.com/package/tailwindcss): A utility-first CSS framework for rapidly building custom designs.
- [Chart.JS](https://www.chartjs.org/): Chart.js, a simple yet flexible JavaScript charting library.
- [Next Auth](https://www.npmjs.com/package/next-auth): NextAuth, an authentication library for Next.js applications.
- [React](https://react.dev/): React, a JavaScript library for building user interfaces.
- [Reduxtoolkit](https://redux-toolkit.js.org/): Redux Toolkit, an opinionated toolset for efficient Redux development.
- [ESLint](https://eslint.org/): A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

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
