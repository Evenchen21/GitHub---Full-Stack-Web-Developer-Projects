let score = 0;
let scoreElement = document.getElementById("score");

class Basket {
  constructor(element) {
    this.element = element;
    this.left = 250;
  }

  moveLeft() {
    this.left -= 20;
    this.updateScreen();
  }
  moveRight() {
    this.left += 20;
    this.updateScreen();
  }
  updateScreen() {
    if (this.left > 600) {
      this.left = 600; // Stop at 600px
    }
    this.element.style.left = this.left + "px";
  }
}

class Present {
  constructor(gameArea, basket) {
    this.y = 0;
    this.x = Math.floor(Math.random() * 570);
    this.gameArea = gameArea;
    this.basket = basket;

    //create the present
    this.element = document.createElement("div");
    //add style to the present element
    this.element.className = "present";
    this.element.style.left = this.x + "px";
    // display the present on the screen
    this.gameArea.appendChild(this.element);
  }

  fall() {
    this.y += 2;
    this.element.style.top = this.y + "px";

    if (this.y > 600) {
      this.element.remove();
      return false;
    }

    if (
      this.x >= this.basket.left &&
      this.x <= this.basket.left + 100 &&
      this.y >= 580
    ) {
      console.log("You got a point!!!");

      score++; // Increment the score
      scoreElement.textContent = `Score: ${score}`; // Update the score display

      this.element.remove();
      return false;
    }

    return true;
  }
}

let myBasket = document.getElementById("basket");
let b = new Basket(myBasket);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    b.moveLeft();
  }
  if (event.key === "ArrowRight") {
    b.moveRight();
  }
});

let gameArea = document.getElementById("gameArea");

let presents = [];

setInterval(() => {
  let p = new Present(gameArea, b);
  presents.push(p);
}, 1500);

setInterval(() => {
  presents = presents.filter((p) => p.fall());
}, 40);
