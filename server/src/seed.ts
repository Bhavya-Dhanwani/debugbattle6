import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import mongoose from "mongoose";
import Product from "./models/product.model";

const products = [
  {
    name: "Kapde Wala Flow X1",
    description: "Premium minimalist running shoes featuring breathable engineered knit, ultra-responsive sole cushioning, and clean modern styling. Built for everyday elevation.",
    price: 8999,
    category: "SNEAKERS",
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600"
  },
  {
    name: "Essential Cotton Hoodie",
    description: "Heavyweight organic cotton hoodie with a soft brushed fleece interior, robust double-lined hood, and a clean structured silhouette. Engineered for comfort.",
    price: 3499,
    category: "CLOTHING",
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600"
  },
  {
    name: "Heritage Chrono Leather Watch",
    description: "Minimalist timepiece with a vegetable-tanned Italian leather strap, premium Japanese quartz movement, and double-domed sapphire glass face.",
    price: 12499,
    category: "WATCHES",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600"
  },
  {
    name: "Bass Pro Wireless Headphones",
    description: "High-fidelity wireless headphones with class-leading active noise cancellation, deep spatial sound signature, and plush memory foam earcups.",
    price: 14999,
    category: "ACCESSORIES",
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600"
  },
  {
    name: "Canvas Commuter Backpack",
    description: "Water-resistant canvas backpack featuring a padded 15-inch laptop compartment, ergonomic mesh shoulder straps, and full-grain leather magnetic buckle straps.",
    price: 4999,
    category: "BAGS",
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600"
  },
  {
    name: "Classic Denim Jacket",
    description: "Indie-wash premium denim jacket constructed from rigid 12oz denim. Double-chest pockets, branded zinc buttons, and side-welt pockets.",
    price: 4299,
    category: "CLOTHING",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600"
  },
  {
    name: "Minimalist Cardholder Wallet",
    description: "Ultra-slim front-pocket leather wallet with RFID blocking, multiple card slots, and a smart pull-tab mechanism for quick access.",
    price: 1999,
    category: "ACCESSORIES",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1627124718515-4d3f94e2245b?q=80&w=600"
  },
  {
    name: "Ballistic Nylon Weekender",
    description: "Spacious overnight weekender bag made from 1680d ballistic nylon. Splash-resistant zippers, dual top handles, and a detachable padded shoulder strap.",
    price: 6999,
    category: "BAGS",
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600"
  },
  {
    name: "Kapde Wala Prime Knit Bold",
    description: "Bold red knit trainers designed with multi-directional flex outsoles, targeted arch support, and lightweight construction for high performance.",
    price: 9499,
    category: "SNEAKERS",
    stock: 8,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600"
  },
  {
    name: "Aero Matte Black Sports Watch",
    description: "Tactical sports watch with a matte black carbon fiber casing, water resistance up to 100 meters, dual time-zone display, and scratch-resistant sapphire crystal.",
    price: 15999,
    category: "WATCHES",
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600"
  }
];

const seedDB = async () => {
  try {
    const uri = process.env.MONGO_URI as string;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products.");

    // Insert new products
    await Product.insertMany(products);
    console.log("Seeded products successfully!");

    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedDB();
