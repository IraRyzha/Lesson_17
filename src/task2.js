const usersProto = {
    
    getUsers: async function() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            return users;
        } catch(error) {
            console.log(error);
            return [];
        }
    },
    
    createCityObject: async function () {
        try {
            const users = await this.getUsers();
    
            const cityObject = users.reduce((cityObject, user) => {
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
                return cityObject;
            }, {});
            console.log(cityObject);
        } catch(error) {
            console.log(error);
            return {};
        }
    },
    
    sortUsersAlphabetically: async function () {
        try {
            const users = await this.getUsers();

            const alphabeticalUsers = [...users].sort((nextUser, previousUser) => {
                return nextUser.name[0].localeCompare(previousUser.name[0]);
            });
    
            console.log(alphabeticalUsers);
        } catch(error) {
            console.log(error);
            return [];
        }
        
    },
    
    createShortUserInfo: async function () {
        try {
            const users = await this.getUsers();

            const updateUsers = users.map(user => {
                const { id, name, phone} = user;
                return { id, name, phone };
            });
    
            console.log(updateUsers)
        } catch(error) {
            console.log(error);
            return [];
        }
    }
 
}

async function App() {
    const users = await usersProto.getUsers();
    console.log(users);
    usersProto.createCityObject()
    usersProto.sortUsersAlphabetically()
    usersProto.createShortUserInfo()
}

App()



