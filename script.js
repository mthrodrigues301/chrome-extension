const form = document.querySelector("form");
const input = document.querySelector(".input");

let lastKnownScrollPosition = 0;
let ticking = false;

const randomImages = [
  "https://media.istockphoto.com/id/1368722560/vector/drawing-cute-sun-cartoon-vector-illustration-in-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=9l8in5FloGz0TGRahE-Zeu67qrQtysa7FvlO6oc2MQ0=",
];

const randomPosition = (array) => {
  const randomIdx = Math.floor(Math.random() * array.length);
  return array[randomIdx];
};

const replaceImages = (url) => {
  const images = document.querySelectorAll("img");
  images.forEach((image) => (image.src = url));
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const imageUrl = input.value ? input.value : randomPosition(randomImages);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: replaceImages,
    args: [imageUrl],
  });
});
