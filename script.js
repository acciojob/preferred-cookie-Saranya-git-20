// Set a cookie with given name, value and expiration days
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

// Get the value of a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

// Apply font preferences from cookies to CSS variables and input values
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize !== null && !isNaN(savedFontSize)) {
    const fontSize = Math.min(72, Math.max(8, parseInt(savedFontSize)));
    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.getElementById("fontsize").value = fontSize;
  }

  if (savedFontColor !== null) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    document.getElementById("fontcolor").value = savedFontColor;
  }
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  let fontSize = parseInt(document.getElementById("fontsize").value);
  if (isNaN(fontSize) || fontSize < 8) fontSize = 8;
  if (fontSize > 72) fontSize = 72;

  const fontColor = document.getElementById("fontcolor").value;

  // Save preferences as cookies for 365 days
  setCookie("fontsize", fontSize, 365);
  setCookie("fontcolor", fontColor, 365);

  // Apply preferences immediately
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);
});

// Apply preferences on page load
window.addEventListener("DOMContentLoaded", applyPreferences);
