firebase.initializeApp(config);
var db = firebase.firestore();
var users = db.collection("users");

document.getElementById("submit").addEventListener("click", function (event) {
    if (document.getElementById('name').value != "" && document.getElementById('email').value != "") {
        event.preventDefault(); addUser();
    } else { /* allow the required fields to alert user */ }
});

function addUser() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var timestamp = Date.now();
    var emails = [];
    var success = false;

    users.onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            emails.push(doc.data().email);
        });
        console.log(emails);
        console.log(email);
        console.log(emails.includes(email));

        if (emails.includes(email)) {
            document.getElementById('error').innerHTML = 'your email has been registered!';
        } else {
            console.log("Your name is: " + name + " and your email address is: " + email);
            users.add({ name: name, email: email, timestamp: timestamp })
                .then(function (docRef) { console.log("Document written with ID: ", docRef.id); displaySuccessMsg(); clearFields(); })
                .catch(function (error) { console.error("Error adding document: ", error); });
            document.getElementById('error').style.display = 'none';
        }
    });
}

function clearFields() { document.getElementById('name').value = ""; document.getElementById('email').value = "" }

function displaySuccessMsg() {
    success = true;
    document.getElementById("successmessage").classList.remove("hide");
    setTimeout(function () { document.getElementById("successmessage").classList.add("hide") }, 8000);
}