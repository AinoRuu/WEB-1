class Oppilas {
    constructor(name, yearOfBirth, address, phone) {
        this._name = name;
        this._yearOfBirth = yearOfBirth;
        this._address = address;
        this._phone = phone;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get yearOfBirth() {
        return this._yearOfBirth;
    }

    set yearOfBirth(value) {
        if (value instanceof Date){
            this._yearOfBirth = value;
        }
        else{
            console.error("Year of birth has to be a Date.")
        }
        
    }

    get address(){
        return this._address;
    }

    set address(value){
        this._address = value;
    }

    get phone(){
        return this._phone;
    }

    set phone(value){
        this._phone = value;
    }

    tulosta() {
        console.log("Name: " +this.name)
        console.log("Year of Birth: " + this.yearOfBirth)
        console.log("Address: " + this.address) 
        console.log("Phone number: " + this.phone)
    }

    laskeIka() {
        const yearToday = new Date().getFullYear();
        const yearOfBirth = this.yearOfBirth.getFullYear();
        return yearToday - yearOfBirth;
    }

}

const oppilas1 = new Oppilas("Jaakko", new Date("1998-12-12"), "Microkatu 8", "044123452")

oppilas1.tulosta();
console.log("age: " + oppilas1.laskeIka())