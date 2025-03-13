const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function calculations (list){

let smallest = numbers[0];
let largest = numbers[0];
let added = 0;
let  = 1;
    for (let i = 0; i< numbers.length; i++) {
        if (smallest > numbers[i]){
            smallest = numbers[i]
        }
        if (largest < numbers[i]){
            largest = numbers[i]
        }
        
        added += numbers[i];
    }

    average = added / numbers.length;

    console.log ("Smallest: " + smallest); 
    console.log ("Largest: " + largest); 
    console.log ("Sum: " + added);
    console.log ("Average: " + average);
}

calculations(numbers);
