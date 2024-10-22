# ze-code-backend-challenge

## Overview

This project is a backend service developed for managing partners and performing geographic-based searches. It allows you to create new partners, retrieve partner details by ID, and find the nearest partner based on location using geographic data.

## Features

1. **Create Partner**
   - Add new partners to the database with their respective address and coverage area.
   - The partner's address is a GeoJSON Point, and the coverage area is a MultiPolygon.

2. **Load Partner by ID**
   - Fetch details of a specific partner using their unique `id`.
     
2. **Load All Partners**
   - Fetch details of all registered partners.

3. **Search Nearest Partner**
   - Given a specific location (longitude and latitude), the API returns the nearest partner whose coverage area includes the location.

## Technologies Used

- **Node.js / Express**: Server-side framework to create the REST API.
- **Knex.js**: SQL query builder for managing database interactions.
- **MySQL2**: MySQL database driver for Node.js.
- **dotenv**: For managing environment variables.
- **uuid**: To generate unique identifiers for partners.
- **Nodemon**: Development tool to automatically restart the server upon changes.

## Prerequisites

To run the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/) or a compatible MySQL-based database

## Installation

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/alyssonfaria99/ze-code-backend-challenge.git
   cd ze-code-backend-challenge

2. Install the dependencies:

     ```bash
     npm install

3. Set up the environment variables:
   Create a .env file at the root of the project with the following content:

     ```bash
     DB_HOST=localhost
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=your_db_name
     DB_PORT=3000

4. Start the server in development mode:
   ```bash
    npm run dev
   
The server will be running on http://localhost:3000.

  ## API Endpoints

### 1. Create Partner

- **Endpoint**: `POST /insertPartner`
- **Description**: Adds a new partner to the database.
- **Request Body**:

  ```json
  {
    "id": "1",
    "tradingName": "Adega da Cerveja - Pinheiros",
    "ownerName": "Zé da Silva",
    "document": "1432132123891/0001",
    "coverageArea": {
      "type": "MultiPolygon",
      "coordinates": [
        [[[30, 20], [45, 40], [10, 40], [30, 20]]]
      ]
    },
    "address": {
      "type": "Point",
      "coordinates": [-46.57421, -21.785741]
    }
  }
  
### 2. Load Partner by ID

- **Endpoint**: `GET /:id`
- **Description**: Retrieves a partner's details by its ID.
- **Request Example: http://localhost:3000/30**
- **Response Example**:
  ```bash
    {
	  "id": "30",
	  "tradingName": "Emporio legal",
	  "ownerName": "Ze da Ambev",
	  "document": "22512343000178",
	  "coverageArea": {
		  "type": "MultiPolygon",
		  "coordinates": [
			[
				[
					{
						"x": -43.521893,
						"y": -23.00843
					},
					{
						"x": -43.52361,
						"y": -23.029285
					},
					{
						"x": -43.43469,
						"y": -23.051086
					},
					{
						"x": -43.388683,
						"y": -22.973034
					},
					{
						"x": -43.508846,
						"y": -22.961021
					},
					{
						"x": -43.521893,
						"y": -23.00843
					}
				]
			]
		]
	},
	"address": {
		"type": "Point",
		"coordinates": [
			-43.471878,
			-23.03035
		  ]
	  }
   }

### 3. Load All Partners

- **Endpoint**: `GET /allPartners`
- **Description**: Retrieves all partner's details.
- **Request Example**: http://localhost:3000/allPartners
  
### 4. Search Nearest Partner
- **Endpoint**: `GET /searchPartner`
- **Description**: Retrieves the nearest partner which the coverage area includes the location.
- **Request Example:**
  ```json
  {
	"location": [-46.703, -23.630]
  }
- **Response Example**:
  ```bash
  [
	{
		"id": "29",
		"tradingName": "Ze da Ambev",
		"ownerName": "Eduardo Pipoca",
		"document": "22.15.127.213/0001-56.752/0001-90"
	}
  ]




