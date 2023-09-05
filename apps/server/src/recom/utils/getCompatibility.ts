import { getAge } from './getAge';

export const getCompatibility = (userA: any, userB: any): number => {

    let score = 0;
    let currCateg: number;
    let currPin: number;
    let currSubc: number;

    //first iteratation, on categories

    for(currCateg = 0; currCateg < 6; currCateg++) {

        score += (10 - (Math.abs(userA.categories[currCateg].rate - userB.categories[currCateg].rate) * 5));
        score += Math.abs(userA.categories[currCateg].pins.length - userB.categories[currCateg].pins.length) * -0.5;

        //second iteration, on pins

        for(currPin = 0; currPin < userA.categories[currCateg].pins.length; currPin++) {

            score += userA.categories[currCateg].pins[currPin] == userB.categories[currCateg].pins[currPin] ? 10 : 0; //esto hay que mejorarlo, porque no van a encontrarse por índice
            score += Math.abs(userA.categories[currCateg].pins[currPin].subCategory.length - userB.categories[currCateg].pins[currPin].subCategory.length) * -0.5;

            //third iteration, on subcategories

            for(currSubc = 0; currSubc < userA.categories[currCateg].pins[currPin].subCategory.length; currSubc++) {

                score += userA.categories[currCateg].pins[currPin].subCategory[currSubc] == userB.categories[currCateg].pins[currPin].subCategory[currSubc] ? 2 : 0; //esto hay que mejorarlo, porque no van a encontrarse por índice

            }
        }
    }

    score += userA.lookingFor == userB.lookingFor ? 0 : -1000;
    let age = new Date().getFullYear() - userB.birthdate.getFullYear();
    score += userA.ageRange[0] < getAge(userB.birthdate) && getAge(userB.birthdate) < userA.ageRange[1] ? 0 : -1000;
    score += userA.zone == userB.address ? 0 : -1000;
    score += userA.wantsGenders.includes(userB.gender) ? 0 : -1000;
    for(let i = 0; i < userB.dislikedBy.length; i++) {
        if(userB.dislikedBy[i].id == userA.id) {
            score += userB.dislikedBy[i].times * -20;
            break;
        }
    }
    return score;
}