let seatsAvailable = true;

let booking = new Promise(function (resolve, reject) {

    setTimeout(function () {

        if (seatsAvailable) {
            resolve("Seats are available.");
        } else {
            reject("No Seats Available.");
        }

    }, 2000);

});

booking
.then(function (result) {
    console.log(result);
    return "Payment Successful.";
})

.then(function (result) {
    console.log(result);
    return "Booking Confirmed.";
})

.then(function (result) {
    console.log(result);
    return "Ticket Generated.";
})

.then(function (result) {
    console.log(result);
})

.catch(function (error) {
    console.log(error);
});