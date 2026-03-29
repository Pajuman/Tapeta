const toggleBtn = document.getElementById("toggleHelp");
const overlay = document.getElementById("helpOverlay");
const closeBtn = document.getElementById("closeHelp");

toggleBtn.addEventListener("click", () => {
  overlay.style.display = "flex"; // zobrazí overlay
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none"; // skryje overlay
});

// klik mimo obsah overlay skryje nápovědu
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.style.display = "none";
});