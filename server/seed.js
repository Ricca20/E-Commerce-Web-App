
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothing-brand-ecommerce');

const products = [
    // Men's T-shirts
    {
        name: "Classic White Tee",
        description: "A staple for every wardrobe. 100% Cotton.",
        price: 25,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "T-shirt",
        sizes: ["S", "M", "L", "XL"],
        stock: 50
    },
    {
        name: "Graphic Print Tee",
        description: "Bold graphic print for a modern look.",
        price: 35,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "T-shirt",
        sizes: ["M", "L", "XL"],
        stock: 40
    },
    // Men's Hoodies
    {
        name: "Urban Pullover Hoodie",
        description: "Soft fleece lining for warmth.",
        price: 60,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "Hoodie",
        sizes: ["S", "M", "L", "XL"],
        stock: 30
    },
    // Men's Jackets
    {
        name: "Denim Trucker Jacket",
        description: "Classic denim jacket with a rugged finish.",
        price: 85,
        image: "https://images.unsplash.com/photo-1516257984-b1b4d8c92306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "Jacket",
        sizes: ["M", "L", "XL"],
        stock: 20
    },
    // Men's Jeans
    {
        name: "Slim Fit Blue Jeans",
        description: "Stretch denim for comfort and style.",
        price: 55,
        image: "https://images.unsplash.com/photo-1542272454374-d14070861217?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "Jeans",
        sizes: ["28", "30", "32", "34"], // Adjusting for standard sizes but keeping S/M/L logic as per prompt or mapping them. Let's stick to prompt sizing for simplicity or map them.
        // Prompt says Sizes: S, M, L, XL. I will use those for jeans too for simplicity as requested, or maybe I should stick to the requested set.
        sizes: ["S", "M", "L", "XL"],
        stock: 60
    },

    // Women's T-shirts
    {
        name: "Striped Cotton Tee",
        description: "Breathable striped t-shirt.",
        price: 28,
        image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "T-shirt",
        sizes: ["S", "M", "L"],
        stock: 45
    },
    {
        name: "V-Neck Essential Tee",
        description: "Perfect for layering.",
        price: 22,
        image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "T-shirt",
        sizes: ["S", "M", "L"],
        stock: 50
    },
    // Women's Hoodies
    {
        name: "Cozy Oversized Hoodie",
        description: "Maximum comfort for lounging.",
        price: 65,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Hoodie",
        sizes: ["S", "M", "L"],
        stock: 25
    },
    // Women's Jackets
    {
        name: "Faux Leather Moto Jacket",
        description: "Adds an edge to any outfit.",
        price: 90,
        image: "https://images.unsplash.com/photo-1551028919-ac7eed8e329b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Jacket",
        sizes: ["S", "M", "L"],
        stock: 15
    },
    // Women's Jeans
    {
        name: "High Waisted Skinny Jeans",
        description: "Flattering fit with high stretch.",
        price: 58,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Jeans",
        sizes: ["S", "M", "L", "XL"],
        stock: 40
    },

    // Kids
    {
        name: "Kids Dinosaur Tee",
        description: "Fun dinosaur print.",
        price: 15,
        image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "T-shirt",
        sizes: ["S", "M", "L"],
        stock: 30
    },
    {
        name: "Kids Denim Jacket",
        description: "Mini version of the classic.",
        price: 40,
        image: "https://images.unsplash.com/photo-1622290291314-1f9f257d0322?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "Jacket",
        sizes: ["S", "M", "L"],
        stock: 20
    },
    {
        name: "Kids Hoodie",
        description: "Warm and durable.",
        price: 30,
        image: "https://images.unsplash.com/photo-1519238809107-160d720b0051?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "Hoodie",
        sizes: ["S", "M", "L"],
        stock: 25
    },
    {
        name: "Kids Comfortable Jeans",
        description: "Elastic waist for easy wear.",
        price: 25,
        image: "https://plus.unsplash.com/premium_photo-1664299401726-53896dfa3b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "Jeans",
        sizes: ["S", "M", "L"],
        stock: 35
    },

    // More Men's
    {
        name: "Plaid Flannel Shirt",
        description: "Warm flannel for cooler days.",
        price: 45,
        image: "https://images.unsplash.com/photo-1509539665780-e32cd92a178e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "T-shirt", // Categorizing as Shirt/T-shirt for simplicity of Types requested
        sizes: ["M", "L", "XL"],
        stock: 25
    },
    {
        name: "Bomber Jacket",
        description: "Sleek and stylish bomber.",
        price: 75,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "Jacket",
        sizes: ["M", "L", "XL"],
        stock: 15
    },

    // More Women's
    {
        name: "Crop Hoodie",
        description: "Trendy cropped length.",
        price: 40,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Hoodie",
        sizes: ["S", "M", "L"],
        stock: 20
    },
    {
        name: "Distressed Jeans",
        description: "Ripped details for a casual vibe.",
        price: 60,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Jeans",
        sizes: ["S", "M", "L"],
        stock: 30
    },

    // More Kids
    {
        name: "Kids Graphic Tee",
        description: "Cool space design.",
        price: 18,
        image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "T-shirt",
        sizes: ["S", "M", "L"],
        stock: 40
    },
    {
        name: "Kids Sport Hoodie",
        description: "Great for active kids.",
        price: 32,
        image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "Hoodie",
        sizes: ["S", "M", "L"],
        stock: 25
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Database Seeded!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
