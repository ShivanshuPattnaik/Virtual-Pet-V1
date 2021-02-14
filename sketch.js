// MAIN VARIABLES
var database;
var form;

// DOG
var dog, sadDog, happyDog;

// FOOD
var foodObj;
var foodStock = 0;
var tempMilk;
var milkImage;

// FEED TIME AND LAST FED {TO KEEP TRACK ON THE FEED TIME}
var feedTime;
var lastFed;

function preload(){
  
  sadDog = loadImage("images/Dog.png");

  happyDog = loadImage("images/happy dog.png");

  milkImage = loadImage("images/Milk.png");

}

function setup() {
  
  var canvas = createCanvas(1000,400);
  
  database = firebase.database();

  foodObj = new Food();
  foodObj.display();
  
  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feedTime = database.ref("feedTime");
  feedTime.on("value", function(data) {

    lastFed = data.val();

  })

  // BUTTONS
  var addFood;
  var feedYourPet;
  var displayPetName;

  var heading = createElement("h1");
  heading.html("WELCOME TO VIRTUAL PET");
  heading.position(470, 100);

  var petHeading = createElement("h3");
  petHeading.html("ENTER YOUR PET NAME");
  petHeading.position(890, 340); 

  var petName = createInput("NAME");
  petName.position(920, 400);

  var submit = createButton("SUBMIT");
  submit.position(970, 440);

  submit.mousePressed(function() {

    heading.hide();
    petName.hide();
    submit.hide();
    petHeading.hide();

    var name = petName.value();
  
    database.ref("pet").set({

      name : name

    });

    displayPetName = createElement("h3");
    displayPetName.html(name);
    displayPetName.position(973, 330);

    addFood = createButton("ADD FOOD");
    addFood.position(650, 100);
    addFood.mousePressed(function() {

      foodObj.foodStock += 1;
      foodObj.update(foodObj.foodStock);

    });

    feedYourPet = createButton("FEED YOUR PET");
    feedYourPet.position(633, 130);
    feedYourPet.mousePressed(function() {

      dog.addImage(happyDog);

      foodObj.deductFood();
      foodObj.foodStock -= 0.1;
      foodObj.update(foodObj.foodStock);

      tempMilk = createSprite(700, 210, 70, 70);
      tempMilk.addImage(milkImage);
      tempMilk.scale = 0.1;

      database.ref("/").update({

        feedTime : hour()

      });

    });

  });

}

function draw() {

  background(46,139,87);

  foodObj.display();

  textSize(23);
  textFont("Jetbrains Mono")
  fill("black");

  if(lastFed > 12) {

    text("LAST FEED TIME : " + lastFed % 12 + " PM", 340, 380);

  }
  else if(lastFed === 12) {

    text("LAST FEED TIME : " + lastFed + " PM", 340, 380);

  }
  else if(lastFed > 0) {

    text("LAST FEED TIME : " + lastFed + " AM", 340, 380);

  }
  else if(lastFed === 0) {

    text("LAST FEED TIME : 12 AM", 340, 380);

  }
  else if(lastFed <= 0){

    text("LAST FEED TIME : " + lastFed + " AM", 340, 380)

  }

  drawSprites();

}

// function to read food Stock

// function to update food stock and last fed time

// function to add food in stock
