import "/src/css/style.scss";
import html2canvas from "html2canvas";

function readFileAndProcess(readfile, number) {
  if (readfile.type === "image/jpeg" || readfile.type === "image/png" || readfile.type === "image/jpg") {
    var reader = new FileReader();
    reader.onload = function (event) {
      var image = new Image();
      var column = document.getElementById("col-" + number);
      column.classList.add("have-picture");
      image.src = event.target.result;
      image.width = 200;
      column.innerHTML = "";
      column.appendChild(image);
    };
    reader.readAsDataURL(readfile);
  }
}

window.newFiles = function (ev, number) {
  for (var i = 0; i < ev.files.length; i++) {
    readFileAndProcess(ev.files[i], number);
  }
};

window.dropHandler = function (ev, number) {
  ev.preventDefault();
  if (ev.dataTransfer.items) {
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === "file") {
        var file = ev.dataTransfer.items[i].getAsFile();
        readFileAndProcess(file, number);
      }
    }
  }
};

window.dragOver = function (ev, number) {
  document.getElementById("col-" + number).classList.add("col-hover");
  ev.preventDefault();
};

window.dragOut = function (number) {
  document.getElementById("col-" + number).classList.remove("col-hover");
};

window.download = function () {
  var column = document.getElementById("right-grid-column");
  html2canvas(column).then(function (canvas) {
    var a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    a.download = "9-grid-picture.jpg";
    a.click();
  });
};
