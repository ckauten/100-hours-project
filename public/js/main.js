// variables
const textarea = document.getElementById('autoresizing');

//text resizing func
textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Reset the height
  this.style.height = this.scrollHeight + 'px'; // Set the height to scroll height
});

//event listeners for text boxes and button
document.querySelector('#submit').addEventListener('click', generateText);

//submit key listener
const textInput = document.querySelector('textarea');
textInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    generateText();
    textarea.value = '';
    // Perform desired actions here
  }
});

async function generateText() {
  const prompt = document.querySelector('textarea').value;
  const response = await fetch('chatPage/sendAiReq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: prompt }),
  });

  if (response.ok) {
    const data = await response.json();
    const chat = data.text;
    document.querySelector('#output').textContent = chat;
    console.log(chat);
  } else {
    console.error(`"Error from server"`);
  }
}
