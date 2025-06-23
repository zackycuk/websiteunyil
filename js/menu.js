// Menu items data
const menuItems = [
  {
    name: "Spaghetti",
    image:
      "https://images.unsplash.com/photo-1506919638378-07c16afcd6f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    description: "Spaghetti dengan saus bolognese dan keju parmesan",
    price: 30000,
    category: "makanan",
    bestSeller: true,
  },
  {
    name: "Mie Ayam",
    image:
      "https://cove-blog-id.sgp1.cdn.digitaloceanspaces.com/cove-blog-id/2024/07/mie-ayam-bandung.jpg",
    description:
      "Mie ayam spesial dengan topping ayam cincang dan pangsit goreng",
    price: 15000,
    category: "makanan",
    bestSeller: false,
  },
  {
    name: "Dimsum",
    image:
      "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/255/2024/11/14/IMG_4814-81774369.jpeg",
    description: "Dimsum isi ayam dan udang dengan saus spesial",
    price: 20000,
    category: "makanan",
    bestSeller: false,
  },
  {
    name: "Chicken Burger",
    image:
      "https://simplehomeedit.com/wp-content/uploads/2022/09/Southern-Fried-Chicken-Burger-1.webp",
    description: "Burger ayam crispy dengan saus spesial dan sayuran segar",
    price: 20000,
    category: "makanan",
    bestSeller: false,
  },
  {
    name: "French Fries",
    image:
      "https://images.themodernproper.com/production/posts/2022/Homemade-French-Fries_8.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1662474181&s=15046582e76b761a200998df2dcad0fd",
    description: "Kentang goreng renyah dengan taburan garam dan bumbu",
    price: 20000,
    category: "makanan",
    bestSeller: false,
  },
  {
    name: "Jus Stoberi",
    image:
      "https://images.unsplash.com/photo-1542116021-0ff087fb0a41?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80",
    description: "Jus stoberi segar dengan tambahan madu",
    price: 14000,
    category: "minuman",
    bestSeller: false,
  },
  {
    name: "Es Buah",
    image:
      "https://www.astronauts.id/blog/wp-content/uploads/2023/03/Daftar-Resep-Es-Buah-yang-Mudah-dan-Enak-1024x683.jpg",
    description: "Es buah dengan aneka potongan buah segar dan sirup spesial",
    price: 15000,
    category: "minuman",
    bestSeller: false,
  },
  {
    name: "Caffe Latte",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR8Q_RrELDLpBSuhHF9CEAWgSBo9mRQtSy-g&s",
    description: "Kopi dengan susu steamed dan sedikit foam di atasnya",
    price: 25000,
    category: "minuman",
    bestSeller: true,
  },
];

// Function to create a menu card
function createMenuCard(item) {
  const card = document.createElement("div");
  card.className = "col-12 col-sm-8 col-md-6 col-lg-4 wow fadeIn";

  const cardHTML = `
        <div class="card h-100 shadow-sm">
          <div class="position-relative">
            <img class="card-img-top" src="${item.image}" alt="${
    item.name
  }" style="height: 200px; object-fit: cover">
            ${
              item.bestSeller
                ? '<span class="badge bg-warning position-absolute top-0 end-0 m-2">Best Seller</span>'
                : ""
            }
          </div>
          <div class="card-body">
            <h4 class="card-title">${item.name}</h4>
            <p class="card-text text-muted">${item.description}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <h5 class="text-danger mb-0">Rp ${item.price.toLocaleString()}</h5>
              <button class="btn btn-success btn-sm add-to-cart"
                data-name="${item.name}"
                data-price="${item.price}"
                data-category="${item.category}"
                onclick="addToCart('${item.name}', ${item.price}, '${
    item.category
  }')">
                <i class="fa fa-shopping-cart me-1"></i> Tambah
              </button>
            </div>
          </div>
        </div>
      `;

  card.innerHTML = cardHTML;
  return card;
}

// Function to populate menu tabs
function populateMenus() {
  const allItemsContainer = document.getElementById("all-items");
  const foodItemsContainer = document.getElementById("food-items");
  const drinkItemsContainer = document.getElementById("drink-items");

  // Clear containers
  allItemsContainer.innerHTML = "";
  foodItemsContainer.innerHTML = "";
  drinkItemsContainer.innerHTML = "";

  // Populate menus
  menuItems.forEach((item) => {
    // Add to all items tab
    allItemsContainer.appendChild(createMenuCard(item));

    // Add to category-specific tab
    if (item.category === "makanan") {
      foodItemsContainer.appendChild(createMenuCard(item));
    } else if (item.category === "minuman") {
      drinkItemsContainer.appendChild(createMenuCard(item));
    }
  });
}

// Initialize menus when the page loads
document.addEventListener("DOMContentLoaded", populateMenus);
