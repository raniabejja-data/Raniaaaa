// Initialisation du panier
let cart = JSON.parse(localStorage.getItem('roselya_cart')) || [];

// Mettre à jour le compteur du panier
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.innerText = totalItems;
    }
}

// Ajouter au panier
function addToCart(name, price, image) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    localStorage.setItem('roselya_cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} a été ajouté à votre panier !`);
}

// Filtrer les huiles (Recherche)
function searchOils() {
    let input = document.getElementById('search-input').value.toLowerCase();
    let cards = document.getElementsByClassName('product-card');
    
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        if (title.includes(input)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// Logique pour la page "Votre Essence"
function createEssence() {
    let note1 = document.getElementById('note1').value;
    let note2 = document.getElementById('note2').value;
    
    if (note1 === "") {
        alert("Veuillez choisir au moins une senteur principale.");
        return;
    }
    
    let name = "Essence personnalisée : " + note1;
    if (note2 !== "") {
        name += " + " + note2;
    }
    
    addToCart(name, 120, 'IMG_7074.png'); // Image générique d'huile pour le pack personnalisé
}

// Afficher le panier (sur panier.html)
function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    
    if (!cartItemsDiv) return;

    cartItemsDiv.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Votre panier est vide.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong> (x${item.quantity})
                    </div>
                    <div>
                        ${item.price * item.quantity} DH
                        <button onclick="removeFromCart(${index})" style="margin-left:15px; background:transparent; border:none; color:red; cursor:pointer;"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
    }
    cartTotalSpan.innerText = total + " DH";
}

// Supprimer un article
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('roselya_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Valider la commande
function checkout(event) {
    event.preventDefault();
    if(cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }
    alert("Merci pour votre commande ! Elle sera expédiée avec la livraison gratuite.");
    cart = [];
    localStorage.setItem('roselya_cart', JSON.stringify(cart));
    window.location.href = "index.html";
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});
