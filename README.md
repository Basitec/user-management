User Management System

A simple user management system built with Next.js, Redux, and Tailwind CSS. This application allows users to view, add, and delete users while persisting data in a Redux store.

🚀 Features

Fetch and display a list of users from an API.

Add a new user with a unique ID.

Delete a user from the list.

Pagination for navigating through user pages.

State management using Redux.

Styled with Tailwind CSS.

🛠️ Technologies Used

Next.js – React framework for server-side rendering.

Redux Toolkit – State management.

Tailwind CSS – Utility-first CSS framework.

Reqres.in API – Mock API for user management.


🔥 API Integration

This project fetches user data from the Reqres API:

GET Users: https://reqres.in/api/users?page=1

POST User: https://reqres.in/api/users

DELETE User: https://reqres.in/api/users/{id}

🏗️ State Management (Redux)

Actions: fetchUsers, addUser, deleteUser.

Reducers: Updates the Redux store based on API responses.

Middleware: Handles async requests with Redux Thunk.

🎨 Styling (Tailwind CSS)

Fully responsive design.

Utility classes for quick styling.

Custom configurations in tailwind.config.mjs.

🤝 Contributing

Contributions are welcome! To contribute:

Fork the repository.

Create a feature branch (git checkout -b feature-name).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature-name).

Open a pull request.
