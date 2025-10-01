document.addEventListener('DOMContentLoaded', function(){
  // Simple slider
  const slidesEl = document.getElementById('slides');
  if(slidesEl){
    let idx = 0;
    setInterval(()=>{ idx = (idx+1)%3; slidesEl.style.transform = 'translateX(' + (-idx*100) + '%)'; }, 3000);
  }

  // Cart functionality
  let cart = JSON.parse(localStorage.getItem('velora_cart')||'[]');
  const cartList = document.getElementById('cart');
  const cartCountEls = [document.getElementById('cart-count'), document.getElementById('cart-count-2')];

  function updateCartUI(){
    if(cartList){
      cartList.innerHTML = '';
      cart.forEach((item, i)=>{
        const li = document.createElement('li');
        li.textContent = item.name + ' - $' + item.price.toFixed(2);
        cartList.appendChild(li);
      });
      const total = cart.reduce((s,it)=>s+it.price,0);
      const totalEl = document.getElementById('cart-total');
      if(totalEl) totalEl.textContent = 'Total: $' + total.toFixed(2);
      cartCountEls.forEach(el=>{ if(el) el.textContent = cart.length; });
      // store
      localStorage.setItem('velora_cart', JSON.stringify(cart));
    }
  }
  updateCartUI();

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', function(){
      const card = this.closest('.product-card');
      const name = card.querySelector('h3').textContent;
      const price = parseFloat(card.dataset.price || card.querySelector('.price').textContent.replace(/[^0-9.]/g,''));
      cart.push({name, price});
      updateCartUI();
      alert(name + ' added to cart');
    });
  });

  // Search products
  const search = document.getElementById('search');
  if(search){
    search.addEventListener('input', function(){
      const q = this.value.toLowerCase();
      document.querySelectorAll('#productGrid .product-card').forEach(card=>{
        const name = card.dataset.name.toLowerCase();
        card.style.display = name.includes(q) ? 'block' : 'none';
      });
    });
  }

  // Payments page: display cart amount
  const amountDisplay = document.getElementById('amount-display');
  if(amountDisplay){
    const total = cart.reduce((s,it)=>s+it.price,0);
    amountDisplay.textContent = 'Amount: $' + total.toFixed(2);
  }

  // Payment form submit
  const paymentForm = document.getElementById('paymentForm');
  if(paymentForm){
    paymentForm.addEventListener('submit', function(e){
      e.preventDefault();
      // simple validation
      alert('Payment simulated. Thank you for your purchase!');
      cart = [];
      localStorage.setItem('velora_cart', JSON.stringify(cart));
      updateCartUI();
      window.location.href = 'index.html';
    });
  }
});
