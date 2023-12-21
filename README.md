# UltraRide: Shoe Ecommerce Website
This is a shoe ecommerce website built with React.js, Node.js, TypeScript, and GraphQL. It provides a platform for users to browse and purchase shoes online. The application integrates with Stripe for processing payments and utilizes Docker for containerization of the website and server.

## Gallery
<table border="0">
 <tr>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/3800827c-1ce4-45a9-ac79-2bf1c2be996f" /></td>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/735390df-2ed1-4d40-91d5-a91acfbf60a7" /></td>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/da5cbb75-a19c-433f-8ed4-e951868d655c" /></td>
 </tr>
 <tr>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/165ff1ae-15d9-4e0e-8293-ad7089695a5a" /></td>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/2d361538-0af3-4052-be1f-77f3b3a62717" /></td>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/3169e4ab-7619-42a5-be78-56a27b0f4496" /></td>
 </tr>
   <tr>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/9ffb69e5-400c-405e-a4f9-98f4cc148e1b" /></td>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/1e42dd03-b70f-4988-a449-b85daef6f92a" /></td>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/1711fa53-d00d-443a-9ed7-103cc19a8b21" /></td>
 </tr>
   <tr>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/7165b700-6f2c-4ab6-9510-0aed381f67da" /></td>
    <td><img src="https://github.com/raj-pulapakura/ultraride/assets/87762282/a6a600eb-d891-4059-85f6-198eb99f0e76" /></td>
 </tr>
</table>

## Features

The shoe ecommerce website offers the following features:

- 📑 **Product Catalogue Page**: Users can browse through a wide range of shoe products listed on the website. The product catalogue page provides an overview of available shoes, including their names, prices, and images.

- 🤩 **Product Details Page**: Each shoe product has a dedicated details page where users can view additional information about the product, such as its description, available sizes, and customer reviews.

- 🔍 **Search Bar**: Users can use the search bar to find specific shoe products based on keywords, making it easier to discover desired items quickly.

- 🛒 **Shopping Cart**: The website includes a shopping cart feature that allows users to add products to their cart, view the contents, update quantities, and proceed to checkout.

- 👍 **Product Filters**: Users can apply various filters, such as brand, size, color, and price range, to narrow down their search results and find products that match their preferences.

- 📚 **Admin Page**: The website has an admin page designed for website maintainers. Admin users can manage product listings, including adding new products, updating existing products, and removing products from the catalog.

## Technologies used

- 👀 **Website**: TypeScript, React.js, MaterialUI, Redux
- ⚙️ **Server**: TypeScript, Node.js, Express.js, ApolloGraphQL, TypeORM
- 💳 **Payments**: TypeScript, Stripe API
- 🧪 **Cache\***: Redis
- 🗃️ **Orchestration**: Docker, Docker Compose
- 🛖 **Database**: MySQL

\*Redis was used to store authentication information.

## Technical notes

### API

The backend of the application utilizes GraphQL for data fetching and manipulation. The available GraphQL queries, mutations, and subscriptions are documented using GraphQL schema and can be explored through tools like GraphiQL or GraphQL Playground.

### Admin Page

The admin page provides an interface for authorized users to manage the product catalog. To access the admin page, a user must have the necessary admin credentials. Once authenticated, the admin can perform various tasks, such as adding new products, updating existing product details, and removing products from the catalog.
