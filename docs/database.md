# Database Design

# Database

Database: MongoDB Atlas

Database Name:

stockpilot

ODM:

Mongoose

# Users

- firstName
- lastName
- email
- password
- role
- warehouse
-isActive
-lastLogin

## Warehouse

- name
- code
- address
- city
- state
- isActive

## Product

- name
- sku
- description
- unit
- reorderLevel
- costPrice
- sellingPrice
- image
- isActive

## Inventory

- product (Reference)
- warehouse (Reference)
- quantity
- reservedQuantity

## StockMovement

- product (Reference)
- warehouse (Reference)
- movementType
- quantity
- reason
- performedBy (Reference)
- remarks