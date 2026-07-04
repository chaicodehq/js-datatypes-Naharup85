/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {
  // Your code here
  if(typeof title !== 'string'|| title==="")return "";
  const temp=title.trim()
  const smallWordArray=["ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"]
  const arr=temp.split(" ");
  const tempArr=arr.filter((e)=>e!=="")
  if(tempArr.length==0)return ""
  const newArr=tempArr.map((e)=>{
    let str=e.toLowerCase()
    if(smallWordArray.includes(str))return str;
    const firstLetter=str.charAt(0).toUpperCase()
    const remWord=str.slice(1,str.length);
    return firstLetter+remWord;
  })
  if(smallWordArray.includes(newArr[0])){
    const firstLetter=newArr[0].charAt(0).toUpperCase()
    const remWord=newArr[0].slice(1,newArr[0].length);
    newArr[0]=firstLetter+remWord;
  }
  const ans=newArr.join(" ");
  return ans;
}
