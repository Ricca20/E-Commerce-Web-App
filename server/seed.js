
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothing-brand-ecommerce');

const products = [
    {
        name: "Men's Classic White Tee",
        description: "Premium cotton basic tee for everyday wear.",
        price: 25,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "T-shirt",
        sizes: ["S", "M", "L", "XL"],
        stock: 50
    },
    {
        name: "Men's Black Denim Jacket",
        description: "Rugged black denim jacket with a modern fit.",
        price: 89,
        image: "https://images.unsplash.com/photo-1605908502724-9093a79a1b39?auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "Jacket",
        sizes: ["M", "L", "XL"],
        stock: 30
    },
    {
        name: "Men's Urban Hoodie",
        description: "Comfortable grey hoodie for the city streets.",
        price: 55,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "Hoodie",
        sizes: ["S", "M", "L", "XL"],
        stock: 40
    },
    {
        name: "Men's Slim Fit Jeans",
        description: "Dark wash slim fit jeans with stretch.",
        price: 65,
        image: "https://images.unsplash.com/photo-1542272454374-d14070861217?auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "Jeans",
        sizes: ["S", "M", "L", "XL"],
        stock: 45
    },
    {
        name: "Men's Graphic Print Tee",
        description: "Abstract graphic print t-shirt.",
        price: 35,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "T-shirt",
        sizes: ["S", "M", "L", "XL"],
        stock: 35
    },
    {
        name: "Men's Bomber Jacket",
        description: "Olive green bomber jacket.",
        price: 95,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "Jacket",
        sizes: ["M", "L", "XL"],
        stock: 25
    },
    {
        name: "Men's Navy Pullover",
        description: "Classic navy pullover hoodie.",
        price: 60,
        image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "Hoodie",
        sizes: ["M", "L", "XL"],
        stock: 30
    },
    {
        name: "Men's Ripped Jeans",
        description: "Light wash jeans with distressed details.",
        price: 70,
        image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=800&q=80",
        category: "Men",
        type: "Jeans",
        sizes: ["S", "M", "L", "XL"],
        stock: 40
    },
    {
        name: "Women's Striped Tee",
        description: "Classic Breton stripe long sleeve t-shirt.",
        price: 30,
        image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "T-shirt",
        sizes: ["S", "M", "L"],
        stock: 50
    },
    {
        name: "Women's Leather Jacket",
        description: "Faux leather moto jacket in black.",
        price: 110,
        image: "https://images.unsplash.com/photo-1551028919-ac7eed8e329b?auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Jacket",
        sizes: ["S", "M", "L"],
        stock: 20
    },
    {
        name: "Women's Oversized Hoodie",
        description: "Cozy beige oversized hoodie.",
        price: 65,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Hoodie",
        sizes: ["S", "M", "L"],
        stock: 35
    },
    {
        name: "Women's High-Rise Jeans",
        description: "Vintage fit high-rise denim.",
        price: 75,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Jeans",
        sizes: ["S", "M", "L", "XL"],
        stock: 40
    },
    {
        name: "Women's Vintage Tee",
        description: "Soft vintage wash graphic t-shirt.",
        price: 28,
        image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "T-shirt",
        sizes: ["S", "M", "L"],
        stock: 45
    },
    {
        name: "Women's Denim Jacket",
        description: "Classic blue denim jacket.",
        price: 80,
        image: "https://images.unsplash.com/photo-1527016021513-b09758b777d5?auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Jacket",
        sizes: ["S", "M", "L"],
        stock: 25
    },
    {
        name: "Women's Cropped Hoodie",
        description: "Sporty cropped hoodie in pink.",
        price: 50,
        image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Hoodie",
        sizes: ["S", "M", "L"],
        stock: 30
    },
    {
        name: "Women's Mom Jeans",
        description: "Relaxed fit mom jeans.",
        price: 68,
        image: "https://images.unsplash.com/photo-1584370848010-d7ccb28015ae?auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "Jeans",
        sizes: ["S", "M", "L", "XL"],
        stock: 35
    },
    {
        name: "Women's Basic White Tee",
        description: "Essential white t-shirt.",
        price: 22,
        image: "https://images.unsplash.com/photo-1529139574466-a302d2052574?auto=format&fit=crop&w=800&q=80",
        category: "Women",
        type: "T-shirt",
        sizes: ["S", "M", "L"],
        stock: 60
    },
    {
        name: "Kids' Dino Print Tee",
        description: "Fun dinosaur graphic tee.",
        price: 18,
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "T-shirt",
        sizes: ["S", "M", "L"],
        stock: 40
    },
    {
        name: "Kids' Denim Jacket",
        description: "Durable denim jacket for play.",
        price: 45,
        image: "https://images.unsplash.com/photo-1622290291314-1f9f257d0322?auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "Jacket",
        sizes: ["S", "M", "L"],
        stock: 20
    },
    {
        name: "Kids' Yellow Hoodie",
        description: "Bright yellow hoodie.",
        price: 35,
        image: "https://images.unsplash.com/photo-1519238809107-160d720b0051?auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "Hoodie",
        sizes: ["S", "M", "L"],
        stock: 30
    },
    {
        name: "Kids' Comfy Jeans",
        description: "Soft denim jeans with elastic waist.",
        price: 28,
        image: "https://images.unsplash.com/photo-1602826347632-004353b30bd8?auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "Jeans",
        sizes: ["S", "M", "L"],
        stock: 45
    },
    {
        name: "Kids' Space Tee",
        description: "Galaxy print t-shirt.",
        price: 20,
        image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "T-shirt",
        sizes: ["S", "M", "L"],
        stock: 35
    },
    {
        name: "Kids' Puffer Jacket",
        description: "Warm puffer jacket for winter.",
        price: 55,
        image: "https://images.unsplash.com/photo-1530040578505-1a3b1d9bf5b8?auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "Jacket",
        sizes: ["S", "M", "L"],
        stock: 25
    },
    {
        name: "Kids' Zip-Up Hoodie",
        description: "Easy zip-up hoodie in blue.",
        price: 38,
        image: "https://images.unsplash.com/photo-1516082404098-92f7dc2a9df2?auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "Hoodie",
        sizes: ["S", "M", "L"],
        stock: 28
    },
    {
        name: "Kids' Overalls",
        description: "Cute denim overalls.",
        price: 35,
        image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80",
        category: "Kids",
        type: "Jeans",
        sizes: ["S", "M", "L"],
        stock: 22
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
