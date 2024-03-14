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
    },
    
    sortUsersAlphabetically: async function () {
        try {
            const users = await this.getUsers();
            console.log(users)

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
            
            // Я не дуже зрозуміла для чого і як правильно в цьому завданні використати spread і rest оператори 
    
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

}

const users = Object.create(usersProto);
console.log(users)
// users.createCityObject();
// users.sortUsersAlphabetically();
// users.createShortUserInfo();


