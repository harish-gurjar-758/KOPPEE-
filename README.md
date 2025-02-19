# KOPPEE - Coffee Shop Web App (MERN Stack)

KOPPEE is a modern and fully responsive coffee shop web application built using the MERN stack (MongoDB, Express, React, Node.js). It provides a seamless experience for customers, allowing them to browse the menu, book tables online, manage orders, and more.

## Features

- 🏪 **Beautiful UI** – Sleek and modern design for a coffee shop experience
- 📋 **Menu Showcase** – Display available drinks and food items
- 🛒 **Order Management** – Customers can place and track their orders
- 📅 **Table Booking** – Reserve tables online
- 🔐 **User Authentication** – Secure login and signup (JWT-based)
- 🛠 **Admin Panel** – Manage menu, orders, and bookings
- 📱 **Fully Responsive** – Works across all devices and browsers

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting:**  Render (Backend)

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB

### Clone the Repository
```sh
git clone git@github.com:harish-gurjar-758/KOPPEE-.git
cd koppee-mern
```

### Install Dependencies
#### Backend
```sh
cd server
npm install
```
#### Frontend
```sh
cd client
npm install
```

## Running the App

### Start the Backend Server
```sh
cd server
npm start
```

### Start the Frontend
```sh
cd client
npm start
```

The application will be available at `http://localhost:3000/`

## API Endpoints
| Method | Endpoint           | Description              |
|--------|-------------------|--------------------------|
| GET    | /api/menu        | Fetch all menu items    |
| POST   | /api/orders      | Place a new order       |
| GET    | /api/orders/:id  | Get order details       |
| POST   | /api/auth/signup | User registration       |
| POST   | /api/auth/login  | User login              |

## Contributing
Feel free to fork this project and submit pull requests. Contributions are welcome!

## License
This project is open-source and available under the MIT License.

---
**Made with ☕ by [Harish Gurjar]**

