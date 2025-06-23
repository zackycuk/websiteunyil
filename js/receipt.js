// Function to handle checkout and display receipt
function checkout() {
    const outputStruk = document.getElementById("outputStruk");
    const btnDownload = document.getElementById("btn-download");
  
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cart.length === 0) {
      outputStruk.textContent = "Keranjang kosong!";
      outputStruk.style.display = "block";
      btnDownload.style.display = "none";
      return;
    }
  
    let struk = "====== STRUK BELANJA ======\n";
    let totalBayar = 0;
  
    cart.forEach(item => {
      const nama = item.name;
      const harga = item.price;
      const jumlah = item.qty;
      const total = harga * jumlah;
  
      struk += `${nama} x${jumlah} = Rp ${total.toLocaleString("id-ID")}\n`;
      totalBayar += total;
    });
  
    struk += "----------------------------\n";
    struk += `Total Bayar: Rp ${totalBayar.toLocaleString("id-ID")}\n`;
    struk += "Terima kasih!\n";
  
    // Display the receipt on screen
    outputStruk.textContent = struk;
    outputStruk.style.display = "block";
  
    // Display the download button
    btnDownload.style.display = "inline-block";
  
    // Clear the cart after checkout
    // Clear localStorage
    localStorage.removeItem("cart"); 
    // If the global 'cart' variable from cart.js exists, clear it
    if (typeof window.cart !== 'undefined') { 
      window.cart = []; 
    }
    // Call renderCart and updateCartCount from cart.js to refresh UI
    if (typeof renderCart === 'function') renderCart(); 
    if (typeof updateCartCount === 'function') updateCartCount(); 
  
    // Show a success message
    outputStruk.textContent += "\n\nPesanan Anda telah diproses!";
  }
  
  // Function to download the receipt as a text file
  function downloadStruk() {
    const isiStruk = document.getElementById("outputStruk").textContent;
    const blob = new Blob([isiStruk], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "struk_belanja.txt";
    link.click();
    URL.revokeObjectURL(url);
  }
  