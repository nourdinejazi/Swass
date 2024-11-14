# Swass

## ✨ Features

- **Customer Website**: Shop from a variety of products, with a smooth add-to-cart and checkout experience.
- **Admin Dashboard**: Manage products, view customer orders, and oversee user accounts all in one place.
- **Image Serving**: Uses an Express server to serve images for better load times and caching.
- **Dockerized Deployment**: Ensures easy setup, consistent environments, and scalability across different platforms.

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, Typescript, NextJS
- **Backend**: Node.js, Express, NextJS
- **Database**: PostgreSQL
- **Docker**: Simplifies deployment with containers for the app and database

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose installed
- MongoDB URI (or use the MongoDB container provided)


```bash
git clone https://github.com/yourusername/swass.git
cd swass
   
docker-compose up -d

swass/
├── media-store/          # Express server for serving files
├── swass-admin/          # Admin Dashboard
├── swass-store/          # Customers website
├── docker-compose.yml    # Docker services configuration
└── .env                  # Environment configuration file (excluded from version control)
