var mode = 'dark';
const root = document.querySelector(':root');

// setup the mode change buttons (light and dark)
function setupModeButtons() {
  const lightModeButton = document.querySelector('.light-mode-border');
  const darkModeButton = document.querySelector('.dark-mode-border');
  const appTitle= document.querySelector('.app-title-text');
  if (!lightModeButton || !darkModeButton || !appTitle) return;

  console.log('All elements detected for mode button');

  lightModeButton.addEventListener('click', function() {
    if (mode !== 'light') {
      root.style.setProperty('--primarycolor', '#404040');
      root.style.setProperty('--textcolor', '#2c2c2c');
      root.style.setProperty('--bordercolor', '#c0c0c0');
      root.style.setProperty('--background1', '#dfdfdf');
      root.style.setProperty('--background2', '#e8e8e8');
      root.style.setProperty('--model-response-textcolor', '#494949');
      root.style.setProperty('--model-response-backgroundcolor', '#ACC9CD');
      appTitle.style.setProperty('color', '#434343');
      lightModeButton.style.setProperty('background', 'linear-gradient(-45deg, #00b2ff, #f36eff)');
      darkModeButton.style.setProperty('background', 'none');
      mode = 'light';
    }
  });

  darkModeButton.addEventListener('click', function() {
    if (mode !== 'dark') {
      root.style.setProperty('--primarycolor', '#dcdcdc');
      root.style.setProperty('--textcolor', '#eeeeee');
      root.style.setProperty('--bordercolor', '#515151');
      root.style.setProperty('--background1', '#2b2b2b');
      root.style.setProperty('--background2', '#343434');
      root.style.setProperty('--model-response-textcolor', '#e2e2e2');
      root.style.setProperty('--model-response-backgroundcolor', '#415C60');
      appTitle.style.setProperty('color', '#d2d2d2');
      lightModeButton.style.setProperty('background', 'none');
      darkModeButton.style.setProperty('background', 'linear-gradient(-45deg, #00b2ff, #f36eff)');
      mode = 'dark';
    }
  });
}

// setup the color picker function
// when the user inputs a color, reflect it to --textcolor variable in styles.css
function setupColorPicker() {
  const colorPicker = document.querySelector('.textcolor-picker');
  if (!colorPicker) return;

  console.log('All elements detected for color picker');

  colorPicker.addEventListener('input', function() {
    root.style.setProperty('--textcolor', this.value);
    console.log(`colour changed to ${this.value}`);
  });
}

// setup the textsize input function
// when the user inputs an integer, reflect it to --textsize variable in styles.css
function setupTextSizeInputter() {
  let textSizeInputter = document.querySelector('.textsize-input');
  if (!textSizeInputter) return;

  console.log('All elements detected for textsize inputter');

  textSizeInputter.addEventListener('input', function() {
    if (this.value > 300) this.value = 300; // the maximum value is 300
    root.style.setProperty('--textsize', `${this.value}px`);
    console.log(`textsize changed to ${this.value}`);
  });
}

function insertResponseBox(text) {
  const editor = document.querySelector('.editor');

  const response_container = document.createElement('div');
  response_container.className = 'model-response-container';
  response_container.contentEditable = false;

  const response_text = document.createElement('div');
  response_text.className = 'model-response';
  response_text.innerText = text;

  const next_user_input = document.createElement('div');
  next_user_input.className = 'user-input';
  next_user_input.contentEditable = true;

  const responseButton = document.querySelector('.dive-deeper-button');

  response_container.appendChild(response_text);
  editor.insertBefore(response_container, responseButton);
  editor.insertBefore(next_user_input, responseButton);
}

function setupResponseButton() {
  const responseButton = document.querySelector('.dive-deeper-button');
  const editor = document.querySelector('.editor');

  responseButton.addEventListener('click', function() {
    const user_inputs = editor.querySelectorAll('.user-input');
    if (!user_inputs) {
      console.error('No user input found');
      return;
    }
    const last_user_input = user_inputs[user_inputs.length-1];
    const text = last_user_input.textContent;
    if (text === '') {
      console.error('The user input is empty');
      return;
    }

    responseButton.innerHTML = '<div class="spinner"></div> Thinking...';
    responseButton.classList.add('loading');

    fetch('/get_response/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken()
      },
      body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
      insertResponseBox(data.result);
      responseButton.innerHTML = 'Dive Deeper 💭';
      responseButton.classList.remove('loading');
    })
    .catch((error) => {
      console.error('Error:', error);
      responseButton.innerHTML = 'Dive Deeper 💭';
      responseButton.classList.remove('loading');
    });
  });

  document.addEventListener('keydown', function(event) {
    // Keyboard shortcut for Command + Enter
    if ((event.metaKey || event.ctrlKey) && event.key == "Enter") {
      event.preventDefault();
      if (responseButton && !responseButton.classList.contains('loading')) {
        responseButton.click();
      }
    }
  });
}

function getCsrfToken() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === 'csrftoken') {
          return value;
      }
  }
  return '';
}

// send a random message to the bot
// because the first call is really slow
function initiateChat() {
  fetch('/get_response/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCsrfToken()
    },
    body: JSON.stringify({ text: "Help my self-reflection." })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Bot initiated');
  })
  .catch((error) => {
    console.error('Error:', error)
  });
}

// main function
function main() {
  console.log("main program ran");
  setupModeButtons();
  setupColorPicker();
  setupTextSizeInputter();
  setupResponseButton();
  initiateChat();
}

// run main() after all the DOM contents are loaded
document.addEventListener('DOMContentLoaded', function() {
  main();
});