const express=require("express");
const path=require("path");
const app=express();
const PORT=process.env.PORT||3000;

const products=[
 {id:1,name:"Smart Watch",price:2499,category:"Electronics",emoji:"⌚",description:"Fitness tracking, notifications and long battery life."},
 {id:2,name:"Wireless Headphones",price:1799,category:"Electronics",emoji:"🎧",description:"Comfortable over-ear headphones with clear sound."},
 {id:3,name:"Laptop Backpack",price:1299,category:"Accessories",emoji:"🎒",description:"Water-resistant backpack with a padded laptop section."},
 {id:4,name:"Running Shoes",price:2199,category:"Fashion",emoji:"👟",description:"Lightweight everyday running and walking shoes."},
 {id:5,name:"Coffee Mug",price:499,category:"Home",emoji:"☕",description:"Minimal ceramic mug for home or office."},
 {id:6,name:"Desk Lamp",price:899,category:"Home",emoji:"💡",description:"Compact LED desk lamp with adjustable brightness."}
];

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.get("/api/products",(req,res)=>{
  const q=(req.query.q||"").toLowerCase();
  const category=(req.query.category||"").toLowerCase();
  const result=products.filter(p=>
    (!q || `${p.name} ${p.description}`.toLowerCase().includes(q)) &&
    (!category || p.category.toLowerCase()===category)
  );
  res.json(result);
});

app.get("/api/products/:id",(req,res)=>{
  const product=products.find(p=>p.id===Number(req.params.id));
  product ? res.json(product) : res.status(404).json({error:"Product not found"});
});

app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`Shop running on port ${PORT}`));
