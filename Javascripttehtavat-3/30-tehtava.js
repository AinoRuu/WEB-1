function Oppilas(name, yearOfBirth, address, phone) {

    if (!(yearOfBirth instanceof Date)){
        throw new Error("Year of birth has to be a Date.")
    }
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.address = address;
        this.phone = phone;
    

    this.tulosta = function() {
        console.log("Name: " +this.name)
        console.log("Year of Birth: " + this.yearOfBirth)
        console.log("Address: " + this.address) 
        console.log("Phone number: " + this.phone)
    }

    this.laskeIka = function() {
        const yearToday = new Date().getFullYear();
        const yearOfBirth = this.yearOfBirth.getFullYear();
        return yearToday - yearOfBirth;
    }

}


try{
const oppilas1 = new Oppilas("Jaakko", new Date("1998-12-12"), "Microkatu 8", "044123452")

oppilas1.tulosta();
console.log("age: " + oppilas1.laskeIka())
} catch (error){
    console.error(error.message);
}
