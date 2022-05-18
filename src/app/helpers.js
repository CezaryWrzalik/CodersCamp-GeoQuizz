export const addOnClickListeners = (toExecute, className, context) => {
  let toObserve = Array.from(document.getElementsByClassName(className));
  toObserve.forEach((elem) => {
    elem.classList.add("lightOnHover")
    elem.onclick = (() => toExecute(elem, context));
  });
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function closeQuiz(){
  const done = Array.from(document.getElementsByClassName("done"));
  done.forEach((elem) => {elem.classList.remove("done")})
  let countries = Array.from(document.getElementsByClassName("country"));
  countries.forEach(elem => {elem.onclick=null; elem.classList.remove("lightOnHover")})
}