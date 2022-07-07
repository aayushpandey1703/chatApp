const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

$("#sendMessage").on("submit", (e) => {
  e.preventDefault();
  var msg = $("#message").val();
  if (msg) {
    socket.emit("message", msg, (response) => {
      console.log(response);
    });
  }
});

socket.on("increment", (count) => {
  document.getElementById("count").innerHTML =
    "<b style='color:red'>" + count + "</b> users online";
});

$("#send-location").on("click", () => {
  if (!navigator.geolocation) return alert("Your doesnt support");
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("Location shared!");
      }
    );
  });
});
