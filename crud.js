const readlineSync = require("readline-sync");
const fs = require("fs");

function displayWelcomeMessage() {
    console.log("<>----------------------Welcome-----------------------<>");
    console.log("You have an account-----");
    console.log("1. Login");
    console.log("2. Signup");
}

function getUserData() {
    const userData = fs.readFileSync("id_data.json");
    return JSON.parse(userData);
}

function login() {
    const user = getUserData();

    while (true) {
        var gmail = readlineSync.question("Enter your Gmail Id------> ");
        var password = readlineSync.question("Enter your password-------> ");

        if (user.password == password && user.gmail == gmail) {
            console.log(user);
            handleLoggedInUser();
            break;
        } else {
            console.log("Invalid login credentials. Please try again.");
        }
    }
}

function handleLoggedInUser() {
    console.log("1. Return bike ---");
    console.log("2. Add bike---");

    var option2 = readlineSync.question("Enter the option you want to choose----> ");

    if (option2 == 1) {
        returnBike();
    }else{
        addbike();
    }
}

function returnBike() {
    let bikeData = fs.readFileSync("bike_data.json");
    let bikeInfo = JSON.parse(bikeData);
    console.log(bikeInfo);

    console.log("1. You pay now---");
    console.log("2. Already paid---");

    var pay = readlineSync.question("Enter your option ----> ");

    if (pay == 1) {
        handlePayment(bikeInfo.payment);
    } else {
        console.log("----------Thank you-------");
    }
}

function addbike() {
    let userData = fs.readFileSync("bike_data.json");
    let data=JSON.parse(userData);
    console.log("-------Add Bike -------");
    let b=0;
    let c=0;
    var sum=0;
    const bikes={};
    while(true){
        console.log("We have four type of bikes in our bike rental - shop-->");
        console.log("1. KTM--");
        console.log("2. Royal Enfield--");
        console.log("3. Honda sp--");
        console.log("4. Yamaha MT--");
        console.log("5. Exit--");
        var bike=readlineSync.question("Enter the bike name what bike you need ------> ");
        if(bike==1){
        console.log("-------One bikes price $1000 per day --------")
        var co=readlineSync.question("How Many Bikes you Need----> ")
        bikes[c]=({"KTM":co});
        c+=1
        sum+=1000*co
        }
        else if(bike==2){
        console.log("-------One bikes price $2000 per day --------")
        var co=readlineSync.question("How Many Bikes you Need----> ")
        bikes[c]=({"Royal Enfield":co});
        sum+=2000*co
        c+=1
        }
        else if(bike==3){
         console.log("-------One bikes price $3000 per day --------")
        var co=readlineSync.question("How Many Bikes you Need----> ")
        bikes[c]=({"Honda sp":co});
        c+=1
        sum+=3000*co
        }
        else if(bike==4){
        console.log("-------One bikes price $4000 per day --------")
        var co=readlineSync.question("How Many Bikes you Need----> ")
        bikes[c]=({"Yamaha":co});
        c+=1
        sum+=4000*co
        }
        else{
            break
        }
        
        } 
        let pay=data.payment+sum;
        delete data.payment
        let addbikes={data,bikes,payment:pay};
        let f1=require("fs");   
        let g=f1.writeFileSync("bike_data.json",JSON.stringify(addbikes,null,3));
        handlePayment();
    }
    

function handlePayment() {
    const userData = fs.readFileSync("bike_data.json");
    let pay=JSON.parse(userData);
    console.log(`Your payment ${pay.payment}`);
    while (true) {
        var paynow = readlineSync.question("Enter your payment-----> ");
        if (pay.parent < paynow) {
            console.log(`Your remaining amount == ${paynow - totalAmount}`);
            console.log("___________Thank you_____________");
            break;
        } else if (pay.parent> paynow) {
            console.log("Enter a valid amount ");
        } else {
            console.log("___________Thank you_____________");
            break;
        }
    }
}

function signup() {
    let userDict = {};
    console.log("<>------Welcome to create your account--------<> ");

    var name = readlineSync.question("Enter your name --------> ");
    var phone = getValidPhoneNumber();
    var gmail = getValidGmail();
    var password = getValidPassword();

    userDict = { name, gmail, password, phone };
    fs.writeFileSync("id_data.json", JSON.stringify(userDict, null, 2));

    let bikeDict = selectBikes();
    let totalAmount = calculateTotalAmount(bikeDict);
    displayPaymentOptions(totalAmount);
}

function getValidPhoneNumber() {
    while (true) {
        var phone = readlineSync.question("Enter your Phone number -------> ");
        var len = phone.length;
        if (len == 10) {
            return phone;
        }
        console.log("Enter a valid phone number --");
    }
}

function getValidGmail() {
    while (true) {
        var gmail = readlineSync.question("Enter your Gmail Id------> ");
        if (gmail.includes(".") && gmail.includes("com") && gmail.includes("@")) {
            return gmail;
        }
        console.log("Enter a valid gmail id------");
    }
}

function getValidPassword() {
    while (true) {
        var password = readlineSync.question("Enter your password-------> ");
        if (password.toUpperCase() !== password && password.toLowerCase() !== password) {
            return password;
        }
        console.log("Enter a valid password -----");
    }
}

function selectBikes() {
    let bikeDict = {};
    let b = 0;
    let c = 0;
    var sum = 0;

    while (b == 0) {
        console.log("-------Your account is successfully created -------");
        console.log("We have four types of bikes in our bike rental shop-->");
        console.log("1. KTM--");
        console.log("2. Royal Enfield--");
        console.log("3. Honda sp--");
        console.log("4. Yamaha MT--");
        console.log("5. Exit--");

        var bike = readlineSync.question("Enter the bike name that you need ------> ");
        if (bike == 1) {
            console.log("-------One bike's price $1000 per day --------");
            var co = readlineSync.question("How Many Bikes you Need----> ");
            bikeDict[c] = { "KTM": co };
            c += 1;
            sum += 1000 * co;
        } else if (bike == 2) {
            console.log("-------One bike's price $2000 per day --------");
            var co = readlineSync.question("How Many Bikes you Need----> ");
            bikeDict[c] = { "Royal Enfield": co };
            sum += 2000 * co;
            c += 1;
        } else if (bike == 3) {
            console.log("-------One bike's price $3000 per day --------");
            var co = readlineSync.question("How Many Bikes you Need----> ");
            bikeDict[c] = { "Honda sp": co };
            c += 1;
            sum += 3000 * co;
        } else if (bike == 4) {
            console.log("-------One bike's price $4000 per day --------");
            var co = readlineSync.question("How Many Bikes you Need----> ");
            bikeDict[c] = { "Yamaha": co };
            c += 1;
            sum += 4000 * co;
        } else {
            b += 1;
        }
    }
    let biker={bike:bikeDict,parent:sum};
    fs.writeFileSync("bike_data.json", JSON.stringify(biker, null, 3));
    return bikeDict;
}


function calculateTotalAmount(bikeDict) {
    let sum = 0;
    for (let key in bikeDict) {
        let bikeName = Object.keys(bikeDict[key])[0];
        let quantity = bikeDict[key][bikeName];

        switch (bikeName) {
            case "KTM":
                sum += 1000 * quantity;
                break;
            case "Royal Enfield":
                sum += 2000 * quantity;
                break;
            case "Honda sp":
                sum += 3000 * quantity;
                break;
            case "Yamaha":
                sum += 4000 * quantity;
                break;
            default:
                break;
        }
    }
    return sum;
}

function displayPaymentOptions(totalAmount) {
    console.log(`Total Amount $${totalAmount}`);
    console.log("1. You have to pay now ");
    console.log("2. You have to pay later ");
    var pay = readlineSync.question("Enter your option---> ");

    if (pay == 1) {
        handlePayment(totalAmount);
    } else {
        console.log("-----Thank you-------");
    }
}

function main() {
    displayWelcomeMessage();
    const option = readlineSync.question("Enter the option you want to choose----> ");

    if (option == 1) {
        login();
    } else if (option == 2) {
        signup();
    } else {
        console.log("Invalid option. Please choose 1 or 2.");
    }
}

main();
