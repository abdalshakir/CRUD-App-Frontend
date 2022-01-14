function create_user() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    axios.post('https://crud-app-abdal.herokuapp.com/user', {
        username: username,
        email: email
    }).then((response) => {
        console.log(response);
        alert(response.data)
    }).catch((error) => {
        console.log(error)
    })
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
}

function getAll() {
    axios.get('https://crud-app-abdal.herokuapp.com/users')
        .then((response) => {
            users = response.data;
            document.getElementById("result").innerHTML = "";
            users.map((e, i) => {
                document.getElementById("result").innerHTML +=
                    `<tr id="${e._id}">
                        <td>${i+1}</td>
                        <td>${e.username}</td>
                        <td>${e.email}</td>
                        <td>
                            <button onclick="editUser('${e._id}', ${i})" class="btn border-shadow update text-gradient">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button onclick="delUser('${e._id}')" class="btn border-shadow delete text-gradient">
                                <i class="fas fa-times"></i>
                            </button>
                        </td>
                    </tr>`
            })

        }).catch((error) => {
            console.log(error);
        })
}
getAll();

function editUser(_id, i) {
    console.log(_id, i);
    const userObj = users[i]
    console.log("userObj: ", userObj);
    document.getElementById(_id).innerHTML = `
                <tr id="${_id}"> 
                    <th>${_id}</th>
                    <td><input type="text" id="${_id}-username" value="${userObj.username}" /></td>
                    <td><input type="text" id="${_id}-email" value="${userObj.email}" /></td>
                    <td>
                        <button onclick="updateUser('${_id}')" class="btn border-shadow update text-gradient">Update</button>
                    </td>
                </tr>`;
}

function updateUser(_id) {
    const username = document.getElementById(`${_id}-username`).value;
    const email = document.getElementById(`${_id}-email`).value;
    axios.put(`https://crud-app-abdal.herokuapp.com/user/${_id}`, {
        id: _id,
        username: username,
        email: email    
    }).then((response) => {
        alert(`${username} is Updated`);
        getAll();
    }).catch((error) => {
        console.log(error)
    })
}


function delUser(_id) {
    axios.delete(`https://crud-app-abdal.herokuapp.com/user/${_id}`)
        .then((response) => {
            console.log(response);
            getAll();
        })
}