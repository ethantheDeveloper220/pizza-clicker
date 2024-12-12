// Pizza Clicker Game

// Game variables
let pizzas = 0;
let pizzasPerClick = 1;
let pizzasPerSecond = 0;

// Upgrade costs and multipliers
const upgrades = {
    extraCheese: {
        cost: 10,
        multiplier: 2,
        owned: 0
    },
    betterOven: {
        cost: 50,
        multiplier: 5,
        owned: 0
    },
    pizzaChef: {
        cost: 100,
        autoClick: 1,
        owned: 0
    }
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Create game container
    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    document.body.appendChild(gameContainer);

    // Create pizza counter
    const counter = document.createElement('div');
    counter.id = 'pizza-counter';
    counter.textContent = `Pizzas: ${pizzas}`;
    gameContainer.appendChild(counter);

    // Create pizza button
    const pizzaButton = document.createElement('button');
    pizzaButton.id = 'pizza-button';
    pizzaButton.textContent = '🍕 Click to Make Pizza!';
    gameContainer.appendChild(pizzaButton);

    // Create upgrades container
    const upgradesContainer = document.createElement('div');
    upgradesContainer.id = 'upgrades-container';
    gameContainer.appendChild(upgradesContainer);

    // Create upgrade buttons
    for (const [key, upgrade] of Object.entries(upgrades)) {
        const upgradeButton = document.createElement('button');
        upgradeButton.className = 'upgrade-button';
        upgradeButton.textContent = `Buy ${key} (Cost: ${upgrade.cost} pizzas)`;
        upgradeButton.onclick = () => buyUpgrade(key);
        upgradesContainer.appendChild(upgradeButton);
    }

    // Add click event listener
    pizzaButton.addEventListener('click', clickPizza);

    // Start auto-clicker interval
    setInterval(autoPizzaMaker, 1000);
});

// Game functions
function clickPizza() {
    pizzas += pizzasPerClick;
    updateDisplay();
}

function buyUpgrade(upgradeName) {
    const upgrade = upgrades[upgradeName];
    if (pizzas >= upgrade.cost) {
        pizzas -= upgrade.cost;
        upgrade.owned++;
        upgrade.cost = Math.floor(upgrade.cost * 1.5);
        
        if (upgrade.multiplier) {
            pizzasPerClick = 1;
            for (const upg of Object.values(upgrades)) {
                if (upg.multiplier) {
                    pizzasPerClick *= (upg.multiplier * upg.owned) || 1;
                }
            }
        }
        
        if (upgrade.autoClick) {
            pizzasPerSecond = 0;
            for (const upg of Object.values(upgrades)) {
                if (upg.autoClick) {
                    pizzasPerSecond += upg.autoClick * upg.owned;
                }
            }
        }
        
        updateDisplay();
        updateUpgradeButtons();
    }
}

function autoPizzaMaker() {
    pizzas += pizzasPerSecond;
    updateDisplay();
}

function updateDisplay() {
    const counter = document.getElementById('pizza-counter');
    counter.textContent = `Pizzas: ${Math.floor(pizzas)} (${pizzasPerClick} per click, ${pizzasPerSecond} per second)`;
}

function updateUpgradeButtons() {
    const buttons = document.getElementsByClassName('upgrade-button');
    Array.from(buttons).forEach((button, index) => {
        const upgradeName = Object.keys(upgrades)[index];
        const upgrade = upgrades[upgradeName];
        button.textContent = `Buy ${upgradeName} (Cost: ${upgrade.cost} pizzas) [Owned: ${upgrade.owned}]`;
    });
}
