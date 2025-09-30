# 🛒 Quick Mart – Product Management Application

## 📌 Overview

**Quick Mart** is a **Product Management Application** built with **React JS** and **Redux Toolkit**, using **JSON Server** as a mock backend.  
It demonstrates **full CRUD functionality**, along with **search** and **filter** features, while managing state entirely through **Redux Toolkit**.

This project was developed as part of a **React JS Practical Exam (50 Marks)**.

---

## ✨ Features

- 🔹 Add new products (Title, Category, Price)
- 🔹 Edit existing products
- 🔹 Delete products
- 🔹 Fetch and display products from JSON Server
- 🔹 Search products by **title**
- 🔹 Filter products by **category**
- 🔹 Combined **search + filter** functionality
- 🔹 Global state management with **Redux Toolkit**
- 🔹 Clean and responsive UI

---

## 🛠️ Tech Stack

- **Frontend:** React JS, Redux Toolkit, pnpm package manager
- **Backend (Mock API):** JSON Server
- **Styling:** Tailwind CSS

---

## 📸 Sneak Peak

![Home Page](/src/assets/preview1.png)

![Add Product](/src/assets/preview2.png)
![Edit Product](assets/edit-product.png)

---

## 📂 Folder Structure

```bash
quick-mart/
│
├── public/
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Application pages
│ ├── modules/
│ │ ├── store.js # Redux store setup
│ │ └── productSlice.js # Product slice with CRUD operations
│ ├── App.js # Root component
│ └── index.js # Entry point
│
├── db.json # JSON Server mock database
├── package.json
└── README.md
```

---

## ⚡ Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/quick-mart.git
cd quick-mart
```

### Install Dependencies

```bash
pnpm install
```

### Start JSON Server

```bash
npx json-server --watch db.json
```

### Start React App

```bash
npm run dev
```

---

## 👨‍💻 Author

- **Name:** Rohit Pakhre
- **Project:** Quick Mart – Product Management Application
