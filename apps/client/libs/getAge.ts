export const getAge = (userBirthdate: Date): number => {
  const currentDate = new Date()
  let userAge = 0
  const UserDate = new Date(userBirthdate)
  userAge = currentDate.getFullYear() - UserDate.getFullYear()

  if (
    currentDate.getMonth() < UserDate.getMonth() ||
    (currentDate.getMonth() === UserDate.getMonth() &&
      currentDate.getDate() < UserDate.getDate())
  ) {
    userAge--
  }

  return userAge
}
