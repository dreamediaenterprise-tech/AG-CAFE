/* AG Café Collective — Premium Upgrade (no backend)
   - Fixes + premium UX polish
   - Cart overlay on mobile
   - Reveal animations
   - Dark/Light toggle (default dark)
   - Success screen (AJAX Formspree)
   - GCash proof upload (optional, shows only on GCash)
*/

document.addEventListener("DOMContentLoaded", () => {
  // ====== Images (EXACT from user) ======
  const HERO_IMAGES = [
    "https://i.pinimg.com/736x/14/6b/82/146b821aa9caf8fafb194a6c8fd5ae38.jpg",
    "https://i.pinimg.com/1200x/b3/5d/c9/b35dc9742470345f6725a8ea29c15d93.jpg",
    "https://i.pinimg.com/736x/8c/c7/6f/8cc76fefd96c8c85066e8e3803cc38d8.jpg",
    "https://i.pinimg.com/736x/46/04/66/460466f639a3ec8e1b8e970c7b58c8e6.jpg"
  ];

  const IMAGES = {
    best: [
      "https://i.pinimg.com/736x/a1/83/9c/a1839c27e580d823e6bdbb6884c092c7.jpg",
      "https://i.pinimg.com/736x/fb/6a/4a/fb6a4a46405318a1e0b82641277fd513.jpg",
      "https://i.pinimg.com/736x/26/a7/7c/26a77c9bae4ed69107d6c5ee4999fb1e.jpg",
      "https://i.pinimg.com/736x/04/35/69/04356920bacc4a4c3fd97a8168110012.jpg"
    ],
    espresso: [
      "https://i.pinimg.com/736x/86/24/03/8624036039b6ed8b1b3e4534b760d07e.jpg",
      "https://i.pinimg.com/736x/80/93/50/809350ac4aee142c5732f6b8c76188b6.jpg",
      "https://i.pinimg.com/1200x/f8/56/d2/f856d2d30045e34f7a3d7438d81c5141.jpg",
      "https://i.pinimg.com/736x/93/80/6b/93806b4e411c8cd9d36e753f69cdd930.jpg"
    ],
    iced: [
      "https://i.pinimg.com/1200x/1a/28/89/1a2889cece2677912762380f7a70b660.jpg",
      "https://i.pinimg.com/736x/40/76/c4/4076c43c5c501fa89830b44301eaeef9.jpg",
      "https://i.pinimg.com/1200x/dc/73/01/dc7301d3ba38297f266e97eb5c139bc3.jpg",
      "https://i.pinimg.com/736x/35/32/ca/3532ca198f8a6b74e9d11a1890bdf0fe.jpg"
    ],
    optional: [
      "https://i.pinimg.com/736x/49/af/cf/49afcf830171ca4e092df7d355b23ffe.jpg",
      "https://i.pinimg.com/736x/51/56/76/515676b734cf7760ce1456248fbf07a5.jpg",
      "https://i.pinimg.com/736x/16/1e/d2/161ed265a86a7e1e9af24da1ad560026.jpg"
    ]
  };

  // ====== Menu ======
  const MENU = [
    // Best Sellers
    { id:"b1", name:"Caramel Cloud Latte", cat:"best", catLabel:"Best Sellers", price: 189, img: IMAGES.best[0], ribbon:true },
    { id:"b2", name:"Mocha Noir", cat:"best", catLabel:"Best Sellers", price: 199, img: IMAGES.best[1], ribbon:true },
    { id:"b3", name:"Hazelnut Night Brew", cat:"best", catLabel:"Best Sellers", price: 209, img: IMAGES.best[2], ribbon:true },
    { id:"b4", name:"Signature Dark Espresso", cat:"best", catLabel:"Best Sellers", price: 179, img: IMAGES.best[3], ribbon:true },

    // Espresso & Hot
    { id:"e1", name:"Espresso", cat:"espresso", catLabel:"Espresso & Hot", price: 159, img: IMAGES.espresso[0] },
    { id:"e2", name:"Americano", cat:"espresso", catLabel:"Espresso & Hot", price: 169, img: IMAGES.espresso[1] },
    { id:"e3", name:"Latte", cat:"espresso", catLabel:"Espresso & Hot", price: 189, img: IMAGES.espresso[2] },
    { id:"e4", name:"Cappuccino", cat:"espresso", catLabel:"Espresso & Hot", price: 199, img: IMAGES.espresso[3] },
    { id:"e5", name:"Flat White", cat:"espresso", catLabel:"Espresso & Hot", price: 209, img: IMAGES.espresso[2] },

    // Iced / Signature
    { id:"i1", name:"Iced Latte", cat:"iced", catLabel:"Iced / Signature", price: 199, img: IMAGES.iced[0] },
    { id:"i2", name:"Iced Caramel Latte", cat:"iced", catLabel:"Iced / Signature", price: 219, img: IMAGES.iced[1] },
    { id:"i3", name:"Iced Mocha", cat:"iced", catLabel:"Iced / Signature", price: 229, img: IMAGES.iced[2] },
    { id:"i4", name:"Signature Iced Coffee", cat:"iced", catLabel:"Iced / Signature", price: 209, img: IMAGES.iced[3] },

    // Optional (food)
    { id:"o1", name:"Croissant", cat:"optional", catLabel:"Optional", price: 129, img: IMAGES.optional[0] },
    { id:"o2", name:"Cake Slice", cat:"optional", catLabel:"Optional", price: 149, img: IMAGES.optional[1] },
    { id:"o3", name:"Chocolate Dessert", cat:"optional", catLabel:"Optional", price: 159, img: IMAGES.optional[2] }
  ];

  // ====== Delivery ======
  const DELIVERY = { NEAR: 79, MID: 129, FAR: 189 };

  // ====== State ======
  const menuQty = {};      // qty per item in menu (default 0)
  const cart = {};         // qty per item in cart
  let deliveryZone = "NEAR";
  let paymentMethod = "COD";

  // ====== Elements ======
  const heroImg = document.getElementById("heroImg");
  const menuGrid = document.getElementById("menuGrid");

  const cartDrawer = document.getElementById("cartDrawer");
  const toggleCartBtn = document.getElementById("toggleCartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartCount = document.getElementById("cartCount");

  const overlay = document.getElementById("overlay");

  const cartEmpty = document.getElementById("cartEmpty");
  const cartList = document.getElementById("cartList");

  const addonShot = document.getElementById("addonShot");
  const addonOat = document.getElementById("addonOat");
  const addonDrizzle = document.getElementById("addonDrizzle");

  const deliveryFeeText = document.getElementById("deliveryFeeText");
  const subtotalText = document.getElementById("subtotalText");
  const addonsText = document.getElementById("addonsText");
  const deliveryText = document.getElementById("deliveryText");
  const totalText = document.getElementById("totalText");
  const quickTotal = document.getElementById("quickTotal");

  const checkoutBtn = document.getElementById("checkoutBtn");
  const toast = document.getElementById("toast");
  const toastInner = document.getElementById("toastInner");

  const payBtns = Array.from(document.querySelectorAll(".segBtn"));
  const gcashBox = document.getElementById("gcashBox");

  const orderForm = document.getElementById("orderForm");
  const order_items = document.getElementById("order_items");
  const order_subtotal = document.getElementById("order_subtotal");
  const order_addons = document.getElementById("order_addons");
  const order_delivery_zone = document.getElementById("order_delivery_zone");
  const order_delivery_fee = document.getElementById("order_delivery_fee");
  const order_total = document.getElementById("order_total");
  const payment_method = document.getElementById("payment_method");

  const submitBtn = document.getElementById("submitBtn");

  // Mobile bar
  const mobileBar = document.getElementById("mobileBar");
  const mobileCartBtn = document.getElementById("mobileCartBtn");
  const mobileCheckoutBtn = document.getElementById("mobileCheckoutBtn");
  const mobileTotalValue = document.getElementById("mobileTotalValue");
  const mobileCount = document.getElementById("mobileCount");
  const openCartFromSummary = document.getElementById("openCartFromSummary");

  // Success
  const successScreen = document.getElementById("successScreen");
  const successPay = document.getElementById("successPay");
  const successTotal = document.getElementById("successTotal");
  const newOrderBtn = document.getElementById("newOrderBtn");

  // Theme
  const themeBtn = document.getElementById("themeBtn");

  // ====== Theme init (default DARK) ======
  (function initTheme(){
    const saved = localStorage.getItem("ag_theme");
    if (saved === "light") document.body.classList.add("light");
    updateThemeIcon();
  })();

  function updateThemeIcon(){
    const isLight = document.body.classList.contains("light");
    themeBtn.querySelector(".icon").textContent = isLight ? "☀" : "☾";
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("ag_theme", document.body.classList.contains("light") ? "light" : "dark");
    updateThemeIcon();
  });

  // ====== Hero random image ======
  heroImg.src = HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)];

  // ====== Helpers ======
  const peso = (n) => `₱${Number(n).toLocaleString("en-PH")}`;

  function cartHasItems(){
    return Object.keys(cart).length > 0;
  }
  function getAddonsCount(){
    return [addonShot, addonOat, addonDrizzle].filter(x => x.checked).length;
  }
  function getAddonsTotal(){
    return getAddonsCount() * 20;
  }
  function getDeliveryFee(){
    return DELIVERY[deliveryZone] ?? DELIVERY.NEAR;
  }
  function getSubtotal(){
    let s = 0;
    for (const id of Object.keys(cart)){
      const qty = cart[id];
      const item = MENU.find(m => m.id === id);
      if (!item) continue;
      s += item.price * qty;
    }
    return s;
  }
  function getTotal(){
    if (!cartHasItems()) return 0;
    return getSubtotal() + getAddonsTotal() + getDeliveryFee();
  }

  function showToast(msg){
    toastInner.textContent = msg;
    toast.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("show"), 1200);
  }

  function setOverlay(show){
    if (!overlay) return;
    overlay.classList.toggle("show", !!show);
    overlay.setAttribute("aria-hidden", show ? "false" : "true");
  }

  // ====== Drawer open/close ======
  function openCart(){
    cartDrawer.classList.remove("closed");
    if (window.matchMedia("(max-width: 620px)").matches) setOverlay(true);
  }
  function closeCart(){
    cartDrawer.classList.add("closed");
    setOverlay(false);
  }
  function isCartOpen(){
    return !cartDrawer.classList.contains("closed");
  }

  toggleCartBtn.addEventListener("click", () => {
    if (isCartOpen()) closeCart();
    else openCart();
  });
  closeCartBtn.addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  // default: closed on small screens
  if (window.matchMedia("(max-width: 620px)").matches) {
    cartDrawer.classList.add("closed");
  } else {
    cartDrawer.classList.remove("closed");
  }

  // ====== Render Menu ======
  function renderMenu(filter="all"){
    const filtered = MENU.filter(item => (filter === "all" ? true : item.cat === filter));

    menuGrid.innerHTML = filtered.map(item => {
      const q = menuQty[item.id] ?? 0;
      return `
        <article class="card revealCard" data-id="${item.id}" data-cat="${item.cat}">
          ${item.ribbon ? `<div class="ribbon">Best Seller</div>` : ``}
          <img class="cardMedia" src="${item.img}" alt="${item.name}" loading="lazy"/>
          <div class="cardBody">
            <div class="cardTop">
              <div>
                <div class="cardTitle">${item.name}</div>
                <div class="cardCat">${item.catLabel}</div>
              </div>
              <div class="price">${peso(item.price)}</div>
            </div>

            <div class="cardActions">
              <div class="qty">
                <button class="qBtn" type="button" data-act="minus" aria-label="Decrease quantity">−</button>
                <div class="qVal" data-role="qtyVal">${q}</div>
                <button class="qBtn" type="button" data-act="plus" aria-label="Increase quantity">+</button>
              </div>
              <button class="addBtn" type="button" data-act="add">Add to Cart</button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Bind per-card events
    Array.from(menuGrid.querySelectorAll(".card")).forEach(card => {
      const id = card.getAttribute("data-id");
      const minus = card.querySelector('[data-act="minus"]');
      const plus  = card.querySelector('[data-act="plus"]');
      const add   = card.querySelector('[data-act="add"]');
      const qtyVal= card.querySelector('[data-role="qtyVal"]');

      function setMenuQty(val){
        const v = Math.max(0, Number(val) || 0);
        menuQty[id] = v;
        qtyVal.textContent = String(v);
      }

      minus.addEventListener("click", () => setMenuQty((menuQty[id] ?? 0) - 1));
      plus.addEventListener("click",  () => setMenuQty((menuQty[id] ?? 0) + 1));

      add.addEventListener("click", () => {
        const q = (menuQty[id] ?? 0);
        const addQty = q > 0 ? q : 1;

        cart[id] = (cart[id] ?? 0) + addQty;

        setMenuQty(0);
        updateCartUI();
        showToast(`Added ${addQty} to cart`);
        openCart();
      });
    });

    // reveal cards after render
    revealNow();
  }

  // ====== Render Cart ======
  function updateCartUI(){
    const ids = Object.keys(cart);
    const count = ids.reduce((acc, id) => acc + (cart[id] || 0), 0);
    cartCount.textContent = String(count);
    mobileCount.textContent = String(count);

    cartEmpty.style.display = ids.length === 0 ? "block" : "none";
    cartList.innerHTML = "";

    if (ids.length > 0){
      const rows = ids.map(id => {
        const item = MENU.find(m => m.id === id);
        if (!item) return "";
        const qty = cart[id];
        const line = item.price * qty;

        return `
          <div class="cartItem" data-id="${id}">
            <div class="cartItemTop">
              <div>
                <div class="cartItemName">${item.name}</div>
                <div class="cartItemMeta">${item.catLabel}</div>
              </div>
              <div class="cartItemRight">
                <div class="cartItemPrice">${peso(line)}</div>
                <div class="cartItemMeta">${peso(item.price)} each</div>
              </div>
            </div>

            <div class="cartItemControls">
              <div class="qty">
                <button class="qBtn" type="button" data-cart="minus" aria-label="Decrease quantity">−</button>
                <div class="qVal">${qty}</div>
                <button class="qBtn" type="button" data-cart="plus" aria-label="Increase quantity">+</button>
              </div>
              <button class="smallBtn removeBtn" type="button" data-cart="remove">Remove</button>
            </div>
          </div>
        `;
      }).join("");

      cartList.innerHTML = rows;

      // bind cart row buttons
      Array.from(cartList.querySelectorAll(".cartItem")).forEach(row => {
        const id = row.getAttribute("data-id");
        row.querySelector('[data-cart="minus"]').addEventListener("click", () => {
          cart[id] = (cart[id] ?? 0) - 1;
          if (cart[id] <= 0) delete cart[id];
          updateCartUI();
        });
        row.querySelector('[data-cart="plus"]').addEventListener("click", () => {
          cart[id] = (cart[id] ?? 0) + 1;
          updateCartUI();
        });
        row.querySelector('[data-cart="remove"]').addEventListener("click", () => {
          delete cart[id];
          updateCartUI();
        });
      });
    }

    // totals
    const subtotal = getSubtotal();
    const addons = cartHasItems() ? getAddonsTotal() : 0;
    const delivery = cartHasItems() ? getDeliveryFee() : 0;
    const total = getTotal();

    deliveryFeeText.textContent = peso(delivery);
    subtotalText.textContent = peso(subtotal);
    addonsText.textContent = peso(addons);
    deliveryText.textContent = peso(delivery);
    totalText.textContent = peso(total);
    quickTotal.textContent = peso(total);

    mobileTotalValue.textContent = peso(total);

    // update hidden fields
    fillHiddenFields();
  }

  function fillHiddenFields(){
    const ids = Object.keys(cart);

    const itemsText = ids.length
      ? ids.map(id => {
          const item = MENU.find(m => m.id === id);
          const qty = cart[id];
          return `${item?.name ?? id} x${qty} (${peso((item?.price ?? 0) * qty)})`;
        }).join(" | ")
      : "No items";

    const subtotal = getSubtotal();
    const addons = cartHasItems() ? getAddonsTotal() : 0;
    const delivery = cartHasItems() ? getDeliveryFee() : 0;
    const total = getTotal();

    order_items.value = itemsText;
    order_subtotal.value = peso(subtotal);
    order_addons.value = peso(addons);
    order_delivery_zone.value = deliveryZone;
    order_delivery_fee.value = peso(delivery);
    order_total.value = peso(total);
    payment_method.value = paymentMethod;
  }

  // ====== Filters ======
  const filterBtns = Array.from(document.querySelectorAll(".filterBtn"));
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMenu(btn.dataset.filter);
    });
  });

  // ====== Add-ons change ======
  [addonShot, addonOat, addonDrizzle].forEach(el => {
    el.addEventListener("change", updateCartUI);
  });

  // ====== Delivery zone ======
  const zoneBtns = Array.from(document.querySelectorAll(".zoneBtn"));
  zoneBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      zoneBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      deliveryZone = btn.dataset.zone;
      updateCartUI();
    });
  });

  // ====== Payment ======
  payBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      payBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      paymentMethod = btn.dataset.pay;
      payment_method.value = paymentMethod;

      if (paymentMethod === "GCASH") gcashBox.classList.remove("hidden");
      else gcashBox.classList.add("hidden");
    });
  });

  // ====== Checkout scroll ======
  checkoutBtn.addEventListener("click", () => {
    closeCart();
    document.querySelector("#checkout")?.scrollIntoView({ behavior:"smooth" });
  });

  // ====== Mobile bar actions ======
  mobileCartBtn.addEventListener("click", openCart);
  mobileCheckoutBtn.addEventListener("click", () => {
    closeCart();
    document.querySelector("#checkout")?.scrollIntoView({ behavior:"smooth" });
  });
  openCartFromSummary.addEventListener("click", openCart);

  // ====== Success helpers ======
  function showSuccess(){
    successPay.textContent = paymentMethod;
    successTotal.textContent = order_total.value || "₱0";
    successScreen.classList.add("show");
  }
  function hideSuccess(){
    successScreen.classList.remove("show");
  }
  newOrderBtn.addEventListener("click", () => {
    hideSuccess();
    document.querySelector("#menu")?.scrollIntoView({ behavior:"smooth" });
  });

  // ====== Form submit (AJAX Formspree + success screen) ======
  function setSubmitting(isSubmitting){
    if (!submitBtn) return;
    submitBtn.classList.toggle("loading", !!isSubmitting);
    submitBtn.disabled = !!isSubmitting;
  }

  function resetOrderState(){
    // clear cart
    Object.keys(cart).forEach(k => delete cart[k]);
    // reset add-ons
    addonShot.checked = false;
    addonOat.checked = false;
    addonDrizzle.checked = false;
    // reset delivery
    deliveryZone = "NEAR";
    zoneBtns.forEach(b => b.classList.toggle("active", b.dataset.zone === "NEAR"));
    // reset payment to COD
    paymentMethod = "COD";
    payBtns.forEach(b => b.classList.toggle("active", b.dataset.pay === "COD"));
    gcashBox.classList.add("hidden");
    payment_method.value = "COD";

    updateCartUI();
    renderMenu(document.querySelector(".filterBtn.active")?.dataset.filter || "all");
  }

  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!cartHasItems()){
      openCart();
      showToast("Add at least 1 item to cart");
      return;
    }

    fillHiddenFields();

    // Build FormData (supports file upload)
    const formData = new FormData(orderForm);

    try{
      setSubmitting(true);

      const res = await fetch(orderForm.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (!res.ok) throw new Error("Form submission failed");

      // reset UI
      orderForm.reset();
      resetOrderState();
      closeCart();
      showSuccess();
    }catch(err){
      console.error(err);
      showToast("Submit failed. Try again.");
    }finally{
      setSubmitting(false);
    }
  });

  // ====== Reveal animations ======
  function revealNow(){
    const targets = [
      ...document.querySelectorAll(".reveal"),
      ...document.querySelectorAll(".revealCard")
    ];

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(el => io.observe(el));
  }

  // ====== Init ======
  renderMenu("all");
  updateCartUI();
  revealNow();
});
