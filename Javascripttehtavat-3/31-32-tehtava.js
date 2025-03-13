class Arvosana {
    constructor(subject, grade, dateOfCompletion) {
        this.subject = subject;
        this.dateOfCompletion = dateOfCompletion;

        if (grade >= 0 && grade <= 10) {
            this.grade = grade;
        } else {
            throw new Error("Entered grade has to be on a scale of 0-10")
        }
    }
}

class Oppilas {
    constructor(name, yearOfBirth, address, phone) {
        if (!(yearOfBirth instanceof Date)) {
            throw new Error("Year of birth has to be a Date.")
        }

        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.address = address;
        this.phone = phone;
        this.grades = [];
    }

    tulosta() {
        console.log("Name: " + this.name)
        console.log("Year of Birth: " + this.yearOfBirth)
        console.log("Address: " + this.address)
        console.log("Phone number: " + this.phone)
    }

    laskeIka() {
        const yearToday = new Date().getFullYear();
        const yearOfBirth = this.yearOfBirth.getFullYear();
        return yearToday - yearOfBirth;
    }

    LisaaArvosana(subject, grade, dateOfCompletion) {
        try {
            const newGrade = new Arvosana(subject, grade, dateOfCompletion);
            this.grades.push(newGrade);
        } catch (error) {
            console.error(error.message);
        }

    }

    printArvosana() {
        console.log("Grades for the student " + this.name);
        this.grades.forEach((grade, index) => {
            console.log(`#${index + 1} Subject: ${grade.subject}, Grade: ${grade.grade}, Date of completion: ${grade.dateOfCompletion.toLocaleDateString()}`
      );
        })
    }
}




try {
    const oppilas1 = new Oppilas("Jaakko", new Date("1998-12-12"), "Microkatu 8", "044123452")
    oppilas1.LisaaArvosana("Maths", 8, new Date("2023-5-15"));
    oppilas1.LisaaArvosana("Physics", 9, new Date("2023-6-20"));
    oppilas1.LisaaArvosana("Chemistry", 7, new Date("2023-7-10"));


    oppilas1.tulosta();
    console.log("age: " + oppilas1.laskeIka())
    oppilas1.printArvosana();
    
} catch (error) {
    console.error(error.message);
}