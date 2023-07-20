const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");

const Product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/eCommercial");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const products = await Product.find({});
  let totalPrice = 0.0;
  const active = "";
  const homeScript = true;

  res.render("home", { products, totalPrice, active, homeScript });
});

app.get("/generate-dummy-data", async (req, res) => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products?limit=20&/category/laptops"
    );
    const dummyData = response.data;
    //   for(let data of dummyData.products){
    //     console.log(data)
    //     const product = new Product({
    //         name: data.title,
    //         description: data.description,
    //         category: 'Laptop',
    //         rating: data.rating,
    //         brand: data.brand,
    //         stock:data.stock,
    //         thumbnail: data.thumbnail,
    //         img:data.images,
    //         price: data.price
    //     })

    //     await product.save()
    //   }

    res.json(dummyData);
    //   console.log(dummyData)
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating dummy data." });
  }
});

app.get(
  "/products",
  catchAsync(async (req, res) => {
    const allProducts = await Product.find({});
    let selectedOrder = req.query.orderBy || "default"; // Default to 'default' if no value is provided
    const currentPage = "Store";
    let totalPrice = 0.0;
    const active = "Everything";

    const validOrders = [
      "default",
      "popularity",
      "rating",
      "price",
      "price-dec",
    ];
    if (!validOrders.includes(selectedOrder)) {
      selectedOrder = "default";
    }

    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    let productsQuery = {};

    if (minPrice && maxPrice) {
      // Add price range condition to the query if both minPrice and maxPrice are provided
      productsQuery.price = { $gte: minPrice, $lte: maxPrice };
    }

    const products = await Product.find(productsQuery);
    const productsCount = products.length;

    const productsPerPage = 12;
    const currentPageCount = req.params.page || 1; // Default to page 1 if no value is provided
    const totalPages = Math.ceil(products.length / productsPerPage);

    const startSort = parseInt(req.query.startSort) || 0; // Default to 0 if no value is provided
    const endSort = startSort + 12;

    res.render("products/index", {
      products: products.slice(startSort, endSort),
      productsCount,
      selectedOrder,
      currentPage,
      startSort,
      currentPageCount,
      totalPages,
      allProducts,
      totalPrice,
      active,
    });
  })
);

app.get(
  "/products/page/:page",
  catchAsync(async (req, res) => {
    const allProducts = await Product.find({});
    // const products = await Product.find({})
    let selectedOrder = req.query.orderBy || "default"; // Default to 'default' if no value is provided
    const currentPage = "Store";
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    let totalPrice = 0.0;
    const active = "Everything";

    const validOrders = [
      "default",
      "popularity",
      "rating",
      "price",
      "price-dec",
    ];
    if (!validOrders.includes(selectedOrder)) {
      selectedOrder = "default";
    }

    let productsQuery = {};

    if (minPrice && maxPrice) {
      // Add price range condition to the query if both minPrice and maxPrice are provided
      productsQuery.price = { $gte: minPrice, $lte: maxPrice };
    }

    const products = await Product.find(productsQuery);
    const productsCount = products.length;

    const productsPerPage = 12;
    const currentPageCount = req.params.page || 1; // Default to page 1 if no value is provided
    const totalPages = Math.ceil(products.length / productsPerPage);

    const startSort = (currentPageCount - 1) * productsPerPage;
    const endSort = startSort + productsPerPage;

    res.render("products/index", {
      products: products.slice(startSort, endSort),
      productsCount,
      selectedOrder,
      currentPage,
      currentPageCount,
      totalPages,
      allProducts,
      totalPrice,
      active,
    });
  })
);

app.get(
  "/products/category/:category",
  catchAsync(async (req, res) => {
    const { category } = req.params;
    const allProducts = await Product.find({});
    // const products = await Product.find({ category });
    let selectedOrder = req.query.orderBy || "default"; // Default to 'default' if no value is provided
    const currentPage = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize the category name
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    let totalPrice = 0.0;
    const active = category;

    const validOrders = [
      "default",
      "popularity",
      "rating",
      "price",
      "price-dec",
    ];
    if (!validOrders.includes(selectedOrder)) {
      selectedOrder = "default";
    }

    let productsQuery = { category };

    if (minPrice && maxPrice) {
      // Add price range condition to the query if both minPrice and maxPrice are provided
      productsQuery.price = { $gte: minPrice, $lte: maxPrice };
    }

    // Retrieve products from the database based on the query
    const products = await Product.find(productsQuery);
    const productsCount = products.length;

    const productsPerPage = 12;
    const currentPageCount = req.params.page || 1; // Default to page 1 if no value is provided
    const totalPages = Math.ceil(products.length / productsPerPage);

    const startSort = (currentPageCount - 1) * productsPerPage;
    const endSort = startSort + productsPerPage;

    res.render("products/index", {
      products: products.slice(startSort, endSort),
      productsCount,
      selectedOrder,
      currentPage,
      currentPageCount,
      totalPages,
      allProducts,
      category,
      totalPrice,
      active,
    });
  })
);

app.get(
  "/products/category/:category/page/:page",
  catchAsync(async (req, res) => {
    const { category } = req.params;
    const allProducts = await Product.find({});
    // const products = await Product.find({ category });
    let selectedOrder = req.query.orderBy || "default"; // Default to 'default' if no value is provided
    const currentPage = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize the category name
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    let totalPrice = 0.0;
    const active = category;

    const validOrders = [
      "default",
      "popularity",
      "rating",
      "price",
      "price-dec",
    ];
    if (!validOrders.includes(selectedOrder)) {
      selectedOrder = "default";
    }

    let productsQuery = { category };

    if (minPrice && maxPrice) {
      // Add price range condition to the query if both minPrice and maxPrice are provided
      productsQuery.price = { $gte: minPrice, $lte: maxPrice };
    }

    // Retrieve products from the database based on the query
    const products = await Product.find(productsQuery);
    const productsCount = products.length;

    const productsPerPage = 12;
    const currentPageCount = req.params.page || 1; // Default to page 1 if no value is provided
    const totalPages = Math.ceil(products.length / productsPerPage);

    const startSort = (currentPageCount - 1) * productsPerPage;
    const endSort = startSort + productsPerPage;

    res.render("products/index", {
      products: products.slice(startSort, endSort),
      productsCount,
      selectedOrder,
      currentPage,
      currentPageCount,
      totalPages,
      allProducts,
      totalPrice,
      active,
    });
  })
);

app.get("/products/new", (req, res) => {
  let totalPrice = 0.0;
  const active = "";

  res.render("products/new", { totalPrice, active });
});

app.get(
  "/product",
  catchAsync(async (req, res) => {
    const searchTerm = req.query.name;
    if (!searchTerm) {
      return res.redirect("/products");
    }
    const product = await Product.findOne({ name: searchTerm });
    if (!product) {
      return res.redirect(`/${searchTerm}`);
    }
    res.redirect(`/product/${product._id}`);
  })
);

function getRandomElementsFromArray(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

app.get(
  "/product/:id",
  catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    let qty = req.query.quantity;
    let totalPrice = 0.0;
    const active = "";

    if (qty) {
      totalPrice = qty * product.price;
    }

    // Get all products from the same category as the current product
    const productsInSameCategory = await Product.find({
      category: product.category,
    });

    // Get all products except the current one
    const allProductsExceptCurrent = await Product.find({
      _id: { $ne: req.params.id },
    });

    // Get two random products from the same category
    const randomProductsFromSameCategory = getRandomElementsFromArray(
      productsInSameCategory,
      2
    );

    // Get one random product from any category
    const randomProductFromAnyCategory = getRandomElementsFromArray(
      allProductsExceptCurrent,
      1
    );

    // Combine the three featured products
    const featuredProducts = [
      ...randomProductsFromSameCategory,
      ...randomProductFromAnyCategory,
    ];

    res.render("products/show", {
      product,
      featuredProducts,
      totalPrice,
      qty,
      active,
    });
  })
);

app.get(
  "/:searchTerm",
  catchAsync(async (req, res) => {
    const { searchTerm } = req.params;
    const allProducts = await Product.find({});
    // const selectedOrder = req.query.orderBy || "default"; // Default to 'default' if no value is provided
    const currentPage = "Store";
    let totalPrice = 0.0;
    const active = "Everything";

    const currentPageCount = 1;

    res.render("products/indexNotfound", {
      searchTerm,
      currentPage,
      currentPageCount,
      allProducts,
      totalPrice,
      active,
    });
  })
);

app.post(
  "/products/new",
  catchAsync(async (req, res) => {
    if (!req.body.product) throw new ExpressError("Invalid Product Data", 400);
    const product = new Product(req.body.product);
    await product.save();
    console.log(product);
    res.redirect(`/product/${product._id}`);
  })
);

app.delete(
  "/products/:id",
  catchAsync(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    // console.log(product)
    res.redirect("/products");
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  // if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  // res.status(statusCode).render("error", { err });
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("SERVING ON PORT 3000!!");
});
