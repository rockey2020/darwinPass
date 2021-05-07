export default async (text = "") => {
  const oInput = document.createElement("input");
  oInput.style.opacity = 0;
  oInput.style.position = "fixed";
  oInput.style.zIndex = "-1";
  oInput.setAttribute("readonly", "readonly");
  oInput.setAttribute("value", text);
  document.body.appendChild(oInput);
  oInput.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
  } else {
    throw new Error("复制失败");
  }
  setTimeout(async () => {
    document.body.removeChild(oInput);
  }, 50);
};
