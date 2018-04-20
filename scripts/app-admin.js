firebase.initializeApp(config);
var db = firebase.firestore();
var users = db.collection("users").orderBy("timestamp");

window.onload = function () { retrieveData() }

function retrieveData() {
    users.onSnapshot(function (querySnapshot) {
        var users = [];

        querySnapshot.forEach(function (doc) {
            users.push(doc.data().name, doc.data().email);
            const usersData = `
                        <div class="col m6 s12">
                        <div class="card hoverable">
                            <div class="card-content">
                            <span class="card-title">${doc.data().name}</span>
                            <p>${doc.data().email}</p>
                            <small>User created account at <strong>${getDateTimeFromTimestamp(doc.data().timestamp)}<strong></small>
                            </div>
                        </div>
                        </div>
                    `;
            console.log();
            if(usersData){
                document.getElementById('list').innerHTML += usersData;
                document.getElementById("progress").classList.add('hide');
            }else{
                console.log('hi!');
                document.getElementById("progress").classList.add('hide');
            }
        });

    });
}

function getDateTimeFromTimestamp(unixTimeStamp) {
    var date = new Date(unixTimeStamp);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
}

function download_csv() {
    users.onSnapshot(function (querySnapshot) {
        var names = [];

        querySnapshot.forEach(function (doc) {
            names.push([`${doc.data().name} , ${doc.data().email}`]);
        });

        var csv = 'Name,Email\n';
        names.forEach(function (row) {
            csv += row.join(',');
            csv += "\n";
        });

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        var filename = prompt("What name would you love to save your file with?");
        hiddenElement.target = '_blank';
        hiddenElement.download = filename + '.csv';
        hiddenElement.click();

    });
}