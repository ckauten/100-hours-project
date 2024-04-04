// variables
const textarea = document.getElementById('autoresizing');

//text resizing func
textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Reset the height
  this.style.height = this.scrollHeight + 'px'; // Set the height to scroll height
});

//event listeners for text boxes and button

document.querySelector('.user-area').addEventListener('click', async () => {
  event.preventDefault();
  const prompt = document.querySelector('textarea').value;
  const response = await fetch('/generate-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: prompt }),
  });

  if (response.ok) {
    const data = await response.json();
    document.getElementById('terminal').textContent = data.text;
    console.log(data.text);
  } else {
    console.error(`"Error from server"`);
  }
});
