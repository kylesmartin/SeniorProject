let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/getstores');
xhr.responseType = 'json';
xhr.send();

let i = 1;
let body = document.getElementsByTagName("body")[0];

for (i; i <= 20; i++) {
  let button = document.createElement("button");
  button.innerHTML = 'Button '+i;
  body.appendChild(button);
  button.addEventListener ("click", function() {
    alert(this.innerHTML);
  });
}