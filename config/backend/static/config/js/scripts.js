var mode = 'dark';
const root = document.querySelector(':root');

function setupResponseButton() {
  const button = document.querySelector('.dive-deeper-button');
  const userInput = document.querySelector('.user-input');
  
  // Remove any existing event listeners
  const newButton = button.cloneNode(true);
  button.parentNode.replaceChild(newButton, button);
  
  newButton.addEventListener('click', async () => {
    const text = userInput.textContent;
    if (!text.trim()) return;

    try {
      const response = await fetch('/get_response/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text })
      });

      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.result) {
        // Create a container for the conversation pair
        const conversationDiv = document.createElement('div');
        conversationDiv.className = 'conversation-pair';
        
        // Create and set up the user message
        const userDiv = document.createElement('div');
        userDiv.className = 'user-message';
        userDiv.textContent = text;
        
        // Create and set up the model response
        const responseDiv = document.createElement('div');
        responseDiv.className = 'model-response';
        responseDiv.textContent = data.result;
        
        // Add both messages to the conversation container
        conversationDiv.appendChild(userDiv);
        conversationDiv.appendChild(responseDiv);
        
        // Insert the conversation before the input area
        userInput.parentElement.insertBefore(conversationDiv, userInput);
        
        // Clear the input
        userInput.textContent = '';
      }
    } catch (error) {
      console.error('Error:', error);
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

// send a random message to the bot because the first call is really slow
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

const LOCAL_STORAGE_KEY = 'mirror_of_thought_data';

function loadPersistedData() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : { chats: {} };
}

function persistData(chats) {
  const dataToSave = {};
  chats.forEach((content, chatId) => {
    dataToSave[chatId] = {
      id: chatId,
      title: document.querySelector(`[data-chat-id="${chatId}"]`)?.textContent || 'Untitled Chat',
      content: content,
      timestamp: new Date().toISOString()
    };
  });
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
    chats: dataToSave
  }));
}

function setupSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const sidebarClose = document.querySelector('.sidebar-close');
  const sidebarShow = document.querySelector('.sidebar-show');
  const newChatButton = document.querySelector('.new-chat-button');
  const chatHistory = document.querySelector('.chat-history');
  const main = document.querySelector('main');
  
  // Load persisted data
  const persistedData = loadPersistedData();
  const chats = new Map();
  
  function createChatItem(chatId, title) {
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-history-item';
    chatItem.dataset.chatId = chatId;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'chat-title';
    titleSpan.textContent = title;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-chat-button';
    deleteButton.innerHTML = '×';
    deleteButton.title = 'Delete chat';
    
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent chat selection when clicking delete
      if (confirm('Are you sure you want to delete this chat?')) {
        chats.delete(chatId);
        chatItem.remove();
        persistData(chats);
        
        // If we deleted the active chat, create a new one
        if (chatItem.classList.contains('active')) {
          newChatButton.click();
        }
      }
    });

    chatItem.appendChild(titleSpan);
    chatItem.appendChild(deleteButton);
    return chatItem;
  }

  // Modify the code where we restore persisted chats
  Object.values(persistedData.chats).forEach(chat => {
    chats.set(chat.id, chat.content);
    const chatItem = createChatItem(chat.id, chat.title);
    chatHistory.appendChild(chatItem);
  });

  function isEmptyChat(content) {
    // Create a temporary div to parse the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content.trim();
    
    // Check if there are only two elements (input area and button)
    if (tempDiv.children.length !== 2) return false;
    
    // Check if first element is empty (no text content)
    const firstElement = tempDiv.children[0];
    if (firstElement.textContent.trim()) return false;
    
    // Check if second element is a button
    const secondElement = tempDiv.children[1];
    if (secondElement.tagName.toLowerCase() !== 'button') return false;
    
    return true;
  }

  function saveCurrentChat() {
    const activeChat = document.querySelector('.chat-history-item.active');
    if (activeChat) {
      const editor = document.querySelector('.editor');
      const content = editor.innerHTML;
      
      // Only save if the chat has actual content
      if (content.trim() && !isEmptyChat(content)) {
        chats.set(activeChat.dataset.chatId, content);
        persistData(chats);
      } else {
        // Remove empty chat from DOM and storage
        chats.delete(activeChat.dataset.chatId);
        activeChat.remove();
        persistData(chats);
      }
    }
  }

  // Add window event listener to save before closing
  window.addEventListener('beforeunload', () => {
    saveCurrentChat();
  });

  sidebarClose.addEventListener('click', () => {
    sidebar.classList.add('closed');
    main.classList.add('sidebar-closed');
  });

  sidebarShow.addEventListener('click', () => {
    sidebar.classList.remove('closed');
    main.classList.remove('sidebar-closed');
  });

  function loadChat(chatId) {
    const editor = document.querySelector('.editor');
    const savedContent = chats.get(chatId);
    if (savedContent) {
      editor.innerHTML = savedContent;
    } else {
      editor.innerHTML = `
        <div class="user-input" contenteditable="true"></div>
        <button class="dive-deeper-button">Dive Deeper 💭</button>
      `;
    }
    setupResponseButton(); // Make sure to attach new event listener
  }

  // Modify the newChatButton click handler
  newChatButton.addEventListener('click', () => {
    saveCurrentChat();
    
    const chatId = 'chat-' + Date.now();
    const chatItem = createChatItem(chatId, 'New Chat ' + (chatHistory.children.length + 1));
    
    document.querySelectorAll('.chat-history-item').forEach(item => {
      item.classList.remove('active');
    });
    chatItem.classList.add('active');
    
    chatHistory.appendChild(chatItem);
    loadChat(chatId);
  });

  chatHistory.addEventListener('click', (e) => {
    const chatItem = e.target.closest('.chat-history-item');
    if (chatItem) {
      saveCurrentChat();
      
      document.querySelectorAll('.chat-history-item').forEach(item => {
        item.classList.remove('active');
      });
      chatItem.classList.add('active');
      
      loadChat(chatItem.dataset.chatId);
    }
  });

  // Create initial chat if no chats exist or current page is empty
  if (chatHistory.children.length === 0) {
    newChatButton.click();
  } else {
    // Load the most recent chat
    const mostRecentChat = chatHistory.lastElementChild;
    mostRecentChat.classList.add('active');
    loadChat(mostRecentChat.dataset.chatId);
  }
}

function main() {
  console.log("main program ran");
  setupSidebar();
  setupResponseButton();
  initiateChat();
}

// run main() after all the DOM contents are loaded
document.addEventListener('DOMContentLoaded', function() {
  main();
});