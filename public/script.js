async function fetchMessages() {
  const res = await fetch("/messages");
  const data = await res.json();

  // Optional: Still render messages in fixed container
  // const msgContainer = document.getElementById("messages");
  // msgContainer.innerHTML = data.map(m => `
  //   <div><strong>${m.name}</strong>: ${m.message}</div>
  // `).join("");

  // 👉 Make each message float randomly
  data.forEach(m => {
    showFloatingMessage(m.name, m.message);
  });
}


async function submitMessage() {

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  if(name == "" || message == ""){
    alert("You still didnt write anything");
  }else{
    // showFloatingMessage(name, message);
  await fetch("/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message })
  });

  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
  fetchMessages(); // Refresh list
      // alert("committt");
}
}
function showFloatingMessage(name, message) {
  const el = document.createElement("div");
  el.className = "floating-message";
  el.innerHTML = `<strong>${name}</strong>: ${message}`;

  // หลีกเลี่ยงตรงกลาง (.container)
  const avoidArea = {
    x: window.innerWidth / 2 - 150, // container width ~300px
    y: window.innerHeight / 2 - 150,
    width: 300,
    height: 300
  };

  let x, y;
  let tries = 0;

  do {
    x = Math.random() * (window.innerWidth - 200);
    y = Math.random() * (window.innerHeight - 100);
    tries++;
    if (tries > 100) break; // ป้องกัน loop ไม่มีที่วาง
  } while (
    x > avoidArea.x &&
    x < avoidArea.x + avoidArea.width &&
    y > avoidArea.y &&
    y < avoidArea.y + avoidArea.height
  );

  el.style.left = x + "px";
  el.style.top = y + "px";

  document.body.appendChild(el);
}


fetchMessages();
