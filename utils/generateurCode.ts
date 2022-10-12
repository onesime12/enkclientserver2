export function generateCode(length) {
  var text = "";
  var possible = "1234567890";

  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup == i ? "0" : possible.charAt(sup);
  }

  return Number(text);
}

export default generateCode;
