const fs = require('fs').promises
const path = require('path')

class Database {
    constructor(name, dirname) {
        this.name = name
        __dirname = dirname
        this.#initialMethod(name)
    }

    async #initialMethod(name) {
        let file = await this.#checkFile(name)
        if(!file) {
            await this.#createFile(name)
        }
    }

    async #checkFile(name) {
        try {
            let filePath = path.join(__dirname, "db", name + ".json")
            let response = await fs.readFile(filePath)
            return true
        }
        catch (e) {
            return false
        }
    }

    async #createFile(name) {
        try {
            let filePath = path.join(__dirname, "db", name + ".json")
            let response = await fs.writeFile(filePath, JSON.stringify([]))
        }
        catch (e) {
            await this.#createDbFolder()
        }
    }

    async #createDbFolder(name) {
        try {
            let dirPath = path.join(__dirname, "db")
            await fs.mkdir(dirPath)
            await this.#createFile(name)
        }
        catch (e) {
            console.log(e)
        }
    }

    async #readDbFile() {
        try {
            let filePath = path.join(__dirname, "db", this.name + ".json")
            let res = await fs.readFile(filePath, {
                encoding: "utf-8"
            })
            return await JSON.parse(res)
        }
        catch (e) {
            console.log(e)
        }
    }

    async getUsers() {
        let users = await this.#readDbFile()
        return users
    }

    async createUser(name, age, lang) {
        let users = await this.#readDbFile()
        users.push({
            id: users.length + 1,
            name: name,
            age: age,
            lang: lang
        })

        await this.#saveDate(users)
    }

    async #saveDate(users) {
        try {
            users = JSON.stringify(users)
            let filePath = path.join(__dirname, "db", this.name + ".json")
            await fs.writeFile(filePath, users)
        }
        catch (e) {
            console.log(e)
        }
    }

    async filter(val, key) {
        let users = await this.#readDbFile()

        if ( key === "id" ) {
            users = users.filter ( user => user.id == val )
        } else if ( key === "lang" ) {
            users = users.filter ( user => user.lang.map ( el => el.toLowerCase () ).includes ( val.toLowerCase () ) )
        } else if ( key === "name" ) {
            users = users.filter ( user => user.name.toLowerCase ().includes ( val.toLowerCase () ) )
        } else if ( key === "age" ) {
            users = users.filter (user => user.age == val)
        }
        else {
            return "Unexpected error"
        }

        return users
    }
}
