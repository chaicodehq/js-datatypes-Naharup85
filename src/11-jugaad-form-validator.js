/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Your code here
  const errors={}
  let isNameCorrect=true
  if(typeof formData?.name!=="string" ||formData?.name.trim()==="")isNameCorrect=false;
  if(isNameCorrect){
    const nameArray=formData.name.trim().split(" ")
    const firstName=nameArray[0].toLowerCase().split("");
    if(!firstName.every((e)=>e>='a' && e<='z'))isNameCorrect=false;
    let SecondName=""
    if(nameArray[1] && isNameCorrect){
       SecondName=nameArray[1].toLowerCase().split("");
      if(!SecondName.every((e)=>e>='a' && e<='z'))isNameCorrect=false;
    }
    const totalLenth=firstName.length+SecondName.length
    if(totalLenth<2 || totalLenth>50)isNameCorrect=false
  }
  if(!isNameCorrect)errors.name="Name must be 2-50 characters"

  let isEmailCorrect=true;
  const email=formData?.email?.trim()
  if(typeof email!== "string" || email==="")isEmailCorrect=false;
  if(!isEmailCorrect || !email.includes('@') || !email.includes(('.')))isEmailCorrect=false
  if(isEmailCorrect){
    const indexOfat=email.lastIndexOf('@')
    const firstIndexOfat=email.indexOf('@')
    const indexOfDot=email.lastIndexOf('.');
    if(indexOfDot<indexOfat)isEmailCorrect=false;
    if(firstIndexOfat!==indexOfat)isEmailCorrect=false;
  }
  if(!isEmailCorrect)errors.email="Invalid email format"

  const phone=Number(formData?.phone?.trim())
  let isPhoneCorrect=true
  if(!Number.isInteger(phone))isPhoneCorrect=false;
  if(isPhoneCorrect &&  formData.phone.length!==10)isPhoneCorrect=false;
  if(isPhoneCorrect && !(formData.phone[0]==='6' || formData.phone[0]==='7' || formData.phone[0]==='8' ||
    formData.phone[0]==='9'
  ) )isPhoneCorrect=false
  if(!isPhoneCorrect)errors.phone="Invalid Indian phone number"

  const age=Number(formData?.age)
  let isAgeCorrect=true
  if(!Number.isInteger(age)  || age<16 || age>100) isAgeCorrect=false;
  if(!isAgeCorrect)errors.age="Age must be an integer between 16 and 100"

const pincode=formData?.pincode?.trim()
let isPincodeCorrect=true
if(typeof pincode!=="string" || pincode.length!==6)isPincodeCorrect=false
if(!isPincodeCorrect || !Number.isInteger(Number(pincode)) || pincode[0]==='0')isPincodeCorrect=false
if(!isPincodeCorrect)errors.pincode="Invalid Indian pincode"

const state=formData.state ?? ""
let isStateCorrect=true;
if(state==="")isStateCorrect=false
if(!isStateCorrect)errors.state="State is required"

const isAgreeCorrect=Boolean(formData.agreeTerms)
if(!isAgreeCorrect)errors.agreeTerms="Must agree to terms"

let isValid=true
if(!isAgeCorrect || !isAgreeCorrect || !isEmailCorrect || !isNameCorrect || !isPhoneCorrect ||
  !isPincodeCorrect || !isStateCorrect)isValid=false
return{ 
  isValid: isValid, errors: errors
}
}
