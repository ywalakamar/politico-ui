window.onload = function getParties() {
    fetch('https://barno-politico-api.herokuapp.com/api/v2/parties', {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + localStorage.token
        })
    })
        .then(response => response.json())
        .then((result) => {
            let parties = result['data'];
            let parties_table = document.getElementById('parties_table');
            th =
                `<tr>
                    <th>Party ID</th>
                    <th>Party Name</th>
                    <th>Party HeadQuarters</th>
                    <th>Party Logo</th>
                    <th>Date Created</th>
                    <th>Action</th>
                 </tr> `
            parties_table.innerHTML = th
            parties.forEach(party => {
                parties_table.innerHTML += '<tr>' +
                    '<td>' + party.id + '</td>' +
                    '<td>' + party.name + '</td>' +
                    '<td>' + party.hqaddress + '</td>' +
                    '<td><img src=' + party.logourl + '></td>' +
                    '<td>' + party.dateCreated + '</td>' +
                    '<td><button id="' + party.id + '" onclick="getParty(this.id)">Edit</button><button id="' + party.id + '" onclick="deleteParty(this.id)">Delete</button></td>' +
                    '</tr>';
            })
        })
}

function getParty(id) {
    fetch('https://barno-politico-api.herokuapp.com/api/v2/parties/' + id, {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + localStorage.token
        })
    })
        .then((result) => {
            return result.json()
        })
        .then((party) => {
            localStorage.name = party['data']['name']
            localStorage.hqaddress = party['data']['hqAddress']
            localStorage.logourl = party['data']['logourl']
            localStorage.id = party['data']['id']
            window.location = "edit-party.html"
        })
}

function deleteParty(id) {
    answer = confirm('Are you sure you want to delete party?')
    if (answer) {
        console.log('confirmed')
        fetch('https://barno-politico-api.herokuapp.com/api/v2/parties/' + id, {
            method: 'DELETE',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.token
            })
        })
            .then((result) => {
                return result.json()
            })
            .then(function (party) {
                if (party['status'] == 200) {
                    alert(party['message'])
                    window.location.reload();
                }
            })

    }
}