async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
}

async function showUserInfo() {
    const users = await getUsers();

    users.forEach(user => {
        const { id, name, email, address: { city }} = user;
        const userMainInfo = {
            id, 
            name, 
            email, 
            city 
        }
        console.log(userMainInfo);
    });
}

showUserInfo();