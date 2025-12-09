
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

circles.forEach(function(circle) {
    circle.x = 0;
    circle.y = 0;
});
const COLOR_ONE = '#DC703F'; 
const COLOR_TWO = '#357DE5'; 

function updateTrailColor() {
    const scrollPosition = window.scrollY; 
    const viewportHeight = window.innerHeight; 

    if (scrollPosition >= viewportHeight) {
      
        circles.forEach(circle => {
            circle.style.backgroundColor = COLOR_TWO;
        });
    } else {
       
        circles.forEach(circle => {
            circle.style.backgroundColor = COLOR_ONE;
        });
    }
}

window.addEventListener("scroll", updateTrailColor);
updateTrailColor();

window.addEventListener("mousemove", function(e) {
    coords.x = e.clientX + window.scrollX;
    coords.y = e.clientY + window.scrollY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function(circle, index) {
        circle.style.left = x +5  + "px";
        circle.style.top = y +10 + "px";
        circle.style.scale = (circles.length - index) / 10;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = circles[index + 1] || circles[0];
        
        const easingFactor = 0.2; 
        x += (nextCircle.x - x) * easingFactor;
        y += (nextCircle.y - y) * easingFactor;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log(entry.target);
            // This observer ADDS/REMOVES "show"
            entry.target.classList.add("show")
        }
        else{
            entry.target.classList.remove("show")
        }
    });
}, {}); 
const curreElements = document.querySelectorAll(".curre");
curreElements.forEach(el => observer.observe(el));





const observer1 = new IntersectionObserver((entrie) => {
    entrie.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log(entry.target);
            entry.target.classList.add("showe")
        }
        else{
            entry.target.classList.remove("showe")
        }
    });
}, {}); 
const toxtElements = document.querySelectorAll(".toxt");
toxtElements.forEach(el => observer1.observe(el));
 




const observer2 = new IntersectionObserver((entrio) => {
    entrio.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log(entry.target);
            entry.target.classList.add("hello")
        }
        else{
            entry.target.classList.remove("hello")
        }
    });
}, {}); 
const bg65Elements = document.querySelectorAll(".bg65");
bg65Elements.forEach(el => observer2.observe(el));





const button = document.getElementById('h2121');

const DURATION = 1500; 

button.addEventListener('click', function() {
    const startPosition = window.scrollY; 
    const startTime = performance.now(); 

    function animateScroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(1, elapsedTime / DURATION); 

        const ease = 0.5 * (1 - Math.cos(Math.PI * progress));

        const newPosition = startPosition * (1 - ease); 

        window.scrollTo(0, newPosition);

        if (elapsedTime < DURATION) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
});
document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('chat-toggle-button');
    const chatWindow = document.getElementById('chat-window');
    const closeButton = document.getElementById('close-chat');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    const API_KEY = '6b0c337e-81a5-48cb-82a8-62ce8da74a22';
    const SAMBACLOUD_ENDPOINT = 'https://api.sambanova.ai/v1/chat/completions';
    const MODEL_NAME = "Meta-Llama-3.1-8B-Instruct";

    chatButton.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        chatButton.textContent = chatWindow.classList.contains('hidden') ? ' Chat' : '✖';
        chatButton.style.backgroundColor = chatWindow.classList.contains('hidden') ? '#fff' : '#fff';
        if (!chatWindow.classList.contains('hidden')) {
            userInput.focus();
        }
    });
    closeButton.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        chatButton.textContent = ' Chat';
        chatButton.style.backgroundColor = '#fff';
    });

    const sendMessage = async () => {
        const message = userInput.value.trim();
        if (message === '') return;
        appendMessage(message, 'user-message');
        userInput.value = '';
        scrollToBottom();
        const thinkingMessage = appendMessage('...', 'bot-message thinking');
        scrollToBottom();

        try {
            const requestBody = {
                model: MODEL_NAME, 
                messages: [{ role: "user", content: message }],
                max_tokens: 500
            };

            const response = await fetch(SAMBACLOUD_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`, 
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error Details:', errorData);
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.error ? errorData.error.message : 'Unknown API Error'}`);
            }

            const data = await response.json();

            const botResponse = data.choices?.[0]?.message?.content || "Sorry, I received an empty or unreadable response from the chatbot.";

            thinkingMessage.textContent = botResponse;
        } catch (error) {
            console.error('Error fetching bot response:', error);
            thinkingMessage.textContent = `Error: ${error.message}`;
        }

        thinkingMessage.classList.remove('thinking');
        scrollToBottom();
    };

const appendMessage = (text, className) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`; 
    
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    return messageDiv;
};
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
  

