document.addEventListener("DOMContentLoaded", () => {
    createShop();

    document.getElementById('click-item').addEventListener('click', function() {
        let clickItem = this;
        clickItem.classList.add('clicked');
        
        // Wait for the animation to finish before removing the class
        setTimeout(function() {
          clickItem.classList.remove('clicked');
        }, 200); // This should match the duration of the animation

        score += 1n; // Increment score by 1 BigInt
        updateScore();
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('buy-button')) {
            let itemKey = event.target.getAttribute('data-item');
            let item = shopItems[itemKey];
            if (score >= BigInt(item.cost)) { // Ensure comparison with BigInt
                score -= BigInt(item.cost);
                item.owned += 1n; // Increment owned by 1 BigInt
                item.cost = BigInt(Math.floor(BigInt(item.cost) * 1.15)); // Increase the cost for the next purchase
                updateScore();
            }
        }
    });
    
    setInterval(function() {
        for (let key in shopItems) {
            shopItems[key].increment();
        }
    }, 1000); // Every second, update the score based on owned items
    
});

let score = BigInt(0); // Initialize score as BigInt
let shopItems = {
    deposit: {
        name: "Depozīta čeks",
        description: "Vērtīgs tikai daudzumā",
        cost: 100n,
        owned: 0n,
        scorePerSecond: 1n,
        increment: function() {
            score += this.owned * this.scorePerSecond;
            updateScore();
            updateShop();
        }
    },
    sushi: {
        name: "Suši",
        description: "Ir labs, bet ne no šī veikala",
        cost: 250n,
        owned: 0n,
        scorePerSecond: 15n,
        increment: function() {
            score += this.owned * this.scorePerSecond;
            updateScore();
            updateShop();
        }
    },
    hektors: {
        name: "Hektors",
        description: "Īsta un garšīga manta",
        cost: 1000n,
        owned: 0n,
        scorePerSecond: 50n,
        increment: function() {
            score += this.owned * this.scorePerSecond;
            updateScore();
            updateShop();
        }
    },
    mops: {
        name: "Mopsis",
        description: "Labākais draugs",
        cost: 15000n,
        owned: 0n,
        scorePerSecond: 200n,
        increment: function() {
            score += this.owned * this.scorePerSecond;
            updateScore();
            updateShop();
        }
    },
    kemer: {
        name: "Ķemeru māja",
        description: "Visiem vajag ģenerālštābu",
        cost: 50000n,
        owned: 0n,
        scorePerSecond: 1000n,
        increment: function() {
            score += this.owned * this.scorePerSecond;
            updateScore();
            updateShop();
        }
    },
    chiron: {
        name: "Bugatti Chiron",
        description: "Stilīgākā un labākā mašīna",
        cost: 1_000_000n,
        owned: 0n,
        scorePerSecond: 25_000n,
        increment: function() {
            score += this.owned * this.scorePerSecond;
            updateScore();
            updateShop();
        }
    },
    lego: {
        name: "Lētākais Lego sets",
        description: "Komplektā veselas 6 detaļas",
        cost: 1_000_000_000n,
        owned: 0n,
        scorePerSecond: 100_000n,
        increment: function() {
            score += this.owned * this.scorePerSecond;
            updateScore();
            updateShop();
        }
    },
    r6: {
        name: "R6S kompānijas akcijas ",
        description: "War profiteering ir morāli labs lēmums",
        cost: 250_000_000_000n,
        owned: 0n,
        scorePerSecond: 1_000_000n,
        increment: function() {
            score += this.owned * this.scorePerSecond;
            updateScore();
            updateShop();
        }
    }
    ,
    cat: {
        name: "Kaķu bildītes",
        description: "silly",
        cost: 1_000_000_000_000n,
        owned: 0n,
        scorePerSecond: 50_000_000n,
        increment: function() {
            score += this.owned * this.scorePerSecond;
            updateScore();
            updateShop();
        }
    },
    Edgars: {
        name: "Edgars",
        description: "Viens un vienīgais",
        cost: 1_000_000_000_000_000n,
        owned: 0n,
        scorePerSecond: 999_000_000_000_000_000n,
        increment: function() {
            score += this.owned * this.scorePerSecond;
            updateScore();
            updateShop();
        }
    }
    // Add additional items with their own scorePerSecond value here
};

// Update the createShop function to include the score per second
function createShop() {
    let shopContainer = document.getElementById('shop-container');
    for (let key in shopItems) {
        let item = shopItems[key];
        let shopItemElement = document.createElement('div');
        shopItemElement.id = `shop-item-${key}`;
        shopItemElement.className = 'shop-item';
        shopItemElement.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description}</div>
            </div>
            <div class="item-stats">
                <div class="item-owned-count">Pieder: ${item.owned}</div>
                <div class="item-score-per-second">+${formatNumber(item.scorePerSecond)}/s</div>
            </div>
            <div class="item-cost">
                <span class="cost-value">${item.cost}</span>
                <button class="buy-button" data-item="${key}">Pirkt</button>
            </div>
        `;
        shopContainer.appendChild(shopItemElement);
    }
}

function updateScore() {
    document.getElementById('score').innerText = formatNumber(score);
    updateShop();
}

function updateShop() {
    for (let key in shopItems) {
        let item = shopItems[key];
        let shopItemElement = document.getElementById(`shop-item-${key}`);
        if (shopItemElement) { // Ensure the element exists
            shopItemElement.querySelector('.item-name').innerText = item.name;
            shopItemElement.querySelector('.item-description').innerText = item.description;
            shopItemElement.querySelector('.cost-value').innerText = formatNumber(item.cost);
            let totalScorePerSecond = item.owned * item.scorePerSecond;
            shopItemElement.querySelector('.item-owned-count').innerText = `Pieder: ${item.owned} (+${formatNumber(totalScorePerSecond)}/s)`;
            let button = shopItemElement.querySelector('.buy-button');
            
            button.disabled = score < item.cost;
        }
    }

    updateTotalScorePerSecond();
}

function updateTotalScorePerSecond() {
    let totalScorePerSecond = 0;
    for (let key in shopItems) {
        totalScorePerSecond += shopItems[key].owned * shopItems[key].scorePerSecond;
    }
    document.getElementById('total-score-per-second').innerText = `Pasīvie ienākumi: +${formatNumber( totalScorePerSecond)}/s`;
}

function formatNumber(num) {
    if (typeof num !== 'bigint' && num < 1000) {
        return num; // Less than a thousand
    }

    const suffixes = ["", "K", "M", "B", "T", "Edgars", "Qu", "Sx", "Sp", "O", "N", "D"];
    let suffixIndex = 0;
    let number = BigInt(num);

    while (number >= 1000n && suffixIndex < suffixes.length) {
        number /= 1000n;
        suffixIndex++;
    }

    return number.toString() + suffixes[suffixIndex];
}
