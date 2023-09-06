import { getAge } from './getAge';

export const getCompatibility = (userA: any, userB: any): number => {
  let score = 0;
  const highScore = 10;
  const midScore = 5;
  const lowScore = 2;
  const lowPenalty = -0.5;
  const midPenalty = -20;
  const highPenalty = -1000;
  let currCateg: number;
  let currPin: number;
  let currSubc: number;
  let userASubc: string[];
  let userBSubc: string[];

  //FIRST ITERATION, on categories (I'm guessing categories will be setted by default in the same order)

  for (currCateg = 0; currCateg < 6; currCateg++) {
    //restart subcategories arrays
    userASubc = [];
    userBSubc = [];
    //compare same category rates
    score +=
      highScore -
      Math.abs(
        userA.categories[currCateg].rate - userB.categories[currCateg].rate
      ) *
        midScore;
    //compare same category amount of pins
    score +=
      Math.abs(
        userA.categories[currCateg].pins.length -
          userB.categories[currCateg].pins.length
      ) * lowPenalty;

    //SECOND ITERATION, on pins

    for (
      currPin = 0;
      currPin < userA.categories[currCateg].pins.length;
      currPin++
    ) {
      //compare if userB has the same pin as userA
      score += userB.categories[currCateg].pins.find(
        (pin: any) => pin.name == userA.categories[currCateg].pins[currPin]
      )
        ? highScore
        : 0;

      //THIRD ITERATION, on subcategories

      for (
        currSubc = 0;
        currSubc <
        userA.categories[currCateg].pins[currPin].subCategories.length;
        currSubc++
      ) {
        const ASubc =
          userA.categories[currCateg].pins[currPin].subCategories[currSubc];
        const BSubc =
          userB.categories[currCateg].pins[currPin].subCategories[currSubc];
        //store the subcategory if it's new
        userASubc.includes(ASubc) ? null : userASubc.push(ASubc);
        userBSubc.includes(BSubc) ? null : userBSubc.push(BSubc);
      }
    }
    //check the difference on amount of subcategories each has
    score += Math.abs(userASubc.length - userBSubc.length) * lowPenalty;
    //find if userB has the same subcategories as userA
    for (let i = 0; i < userASubc.length; i++) {
      score += userBSubc.includes(userASubc[i]) ? lowScore : 0;
    }
  }
  //check if both are looking for same kind of relationship
  score += userA.lookingFor == userB.lookingFor ? 0 : highPenalty;
  //check if userB has an age inside userA range
  const age = new Date().getFullYear() - userB.birthdate.getFullYear();
  score +=
    userA.ageRange[0] < getAge(userB.birthdate) &&
    getAge(userB.birthdate) < userA.ageRange[1]
      ? 0
      : highPenalty;
  //check if userB is inside userA target zone
  score += userA.zone == userB.address ? 0 : highPenalty;
  //check if userB is a gender that userA wants
  score += userA.wantsGenders.includes(userB.gender) ? 0 : highPenalty;
  //check if userA has already disliked userB and how many times
  for (let i = 0; i < userB.dislikedBy.length; i++) {
    if (userB.dislikedBy[i].id == userA.id) {
      score += userB.dislikedBy[i].times * midPenalty;
      break;
    }
  }
  return score;
};
