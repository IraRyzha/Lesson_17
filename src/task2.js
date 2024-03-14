function UserService(url) {
    this.url = url;
}

UserService.prototype.getUsers = async function () {
    try {
        const response = await fetch(this.url);
        const users = await response.json();
        return users;
    } catch(error) {
        console.log(error);
        return [];
    }
}

UserService.prototype.createCityObject = async function () {
    try {
        const users = await this.getUsers();

        users.reduce((cityObject, user) => {
            const cityName = user.address.city;
            const { id, name, email, phone, company : { name: companyName }} = user;
            const userInfo = {
                id, 
                name, 
                email, 
                phone,
                companyName 
            }
            
            if (!cityObject.hasOwnProperty(cityName)) {
                cityObject[cityName] = [];
                cityObject[cityName].push(userInfo);
            } else {
                cityObject[cityName].push(userInfo);
            }
        
            console.log(cityObject);
            return cityObject;
        }, {});

    } catch(error) {
        console.log(error);
        return {};
    }
}

UserService.prototype.sortUsersAlphabetically = async function () {
    try {
        const users = await this.getUsers();

        const alphabeticalUsers = users.sort((nextUser, previousUser) => {
            return nextUser.name[0].localeCompare(previousUser.name[0]);
        });

        console.log(users)
        console.log(alphabeticalUsers);
    } catch(error) {
        console.log(error);
        return [];
    }
    
}

UserService.prototype.createShortUserInfo = async function () {
    try {
        const users = await this.getUsers();

        const updateUsers = users.map(user => {
            const { id, name, phone} = user;
            return { id, name, phone };
        });

        console.log(updateUsers)

        // Я не дуже зрозуміла як в цьому завданні правильно використати spread і rest оператори 

        // const [ {id, name, phone}, ...otherUsers ] = users;

        // const changeOtherUsers = otherUsers.map(otherUser => {
        //     const {id, name, phone} = otherUser;
        //     return {id, name, phone};
        // })

        // const shortenArray = [ {id, name, phone}, ...changeOtherUsers ];
        // console.log(shortenArray)
    } catch(error) {
        console.log(error);
        return [];
    }
}



const userService = new UserService('https://jsonplaceholder.typicode.com/users');
// userService.createCityObject();
// userService.sortUsersAlphabetically();
userService.createShortUserInfo()

// [
//     {
//       "id": 1,
//       "name": "Leanne Graham",
//       "username": "Bret",
//       "email": "Sincere@april.biz",
//       "address": {
//         "street": "Kulas Light",
//         "suite": "Apt. 556",
//         "city": "Gwenborough",
//         "zipcode": "92998-3874",
//         "geo": {
//           "lat": "-37.3159",
//           "lng": "81.1496"
//         }
//       },
//       "phone": "1-770-736-8031 x56442",
//       "website": "hildegard.org",
//       "company": {
//         "name": "Romaguera-Crona",
//         "catchPhrase": "Multi-layered client-server neural-net",
//         "bs": "harness real-time e-markets"
//       }
//     },
// ]

