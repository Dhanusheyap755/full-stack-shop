const grid=document.getElementById("productsGrid");
const search=document.getElementById("search");
const category=document.getElementById("category");

async function loadProducts(){
  const params=new URLSearchParams();
  if(search.value.trim())params.set("q",search.value.trim());
  if(category.value)params.set("category",category.value);
  grid.innerHTML="<p>Loading products...</p>";
  try{
    const res=await fetch("/api/products?"+params);
    if(!res.ok)throw new Error("Request failed");
    const products=await res.json();
    grid.innerHTML=products.length?products.map(p=>`
      <article class="product">
        <div class="emoji">${p.emoji}</div>
        <span class="category">${p.category}</span>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">₹${p.price.toLocaleString("en-IN")}</div>
      </article>`).join(""):"<p>No products found.</p>";
  }catch(e){grid.innerHTML="<p>Unable to load products.</p>";}
}
let timer;
search.addEventListener("input",()=>{clearTimeout(timer);timer=setTimeout(loadProducts,250)});
category.addEventListener("change",loadProducts);
loadProducts();
