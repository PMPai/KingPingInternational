// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            alert('感謝您的諮詢！我們會盡快與您聯繫。');
            
            // Reset form
            this.reset();
        });
    }

    // Initialize chatbot
    initializeChatbot();
});

// Chatbot functionality
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    if (chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '') {
        chatbotWindow.style.display = 'flex';
        // Focus on input when opened
        setTimeout(() => {
            document.getElementById('chatbotInput').focus();
        }, 100);
    } else {
        chatbotWindow.style.display = 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate bot response
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateBotResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
}

function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = message;
    
    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<div class="message-content">小暢正在輸入中... ⌨️</div>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Service-related responses
    if (message.includes('服務') || message.includes('項目') || message.includes('業務')) {
        return `我們提供全方位的媒體行銷服務呢！✨<br><br>
        🎯 <strong>核心服務包括：</strong><br>
        📊 市場諮詢 - 深度市場分析<br>
        🎯 媒體策略 - 精準投放規劃<br>
        📅 媒體規劃 - 時程預算配置<br>
        ✍️ 稿件完成 - 專業內容撰寫<br>
        🤝 媒體購買 - 優惠價格談判<br>
        🚀 媒體投放 - 精準執行監控<br>
        📈 曝光報告 - 詳細效果分析<br><br>
        🌟 <strong>進階服務：</strong><br>
        🧩 行銷策略整合<br>
        📱 廣告投放服務<br>
        👥 Social Media & KOL 合作<br><br>
        想了解哪個服務的詳細內容呢？😊`;
    }
    
    // Media resources
    if (message.includes('媒體') || message.includes('資源') || message.includes('合作')) {
        return `我們與台灣所有主流媒體都有深度合作關係！📰<br><br>
        🏢 <strong>傳統媒體：</strong><br>
        中國時報、工商時報、經濟日報、聯合報<br><br>
        📖 <strong>雜誌媒體：</strong><br>
        天下雜誌、商業周刊、遠見雜誌、ELLE、Harper's Bazaar、ARCH雅趣<br><br>
        💻 <strong>數位媒體：</strong><br>
        ETtoday、關鍵評論網、Yahoo新聞、LINE TODAY、妞新聞、Beauty美人圈、DIGITIMES、iThome、科技新報、INSIDE、新電子、Mobile01<br><br>
        ✅ <strong>我們承諾：</strong><br>
        您的新聞稿將在選定的媒體平台上成功刊登！<br><br>
        需要特定媒體的合作資訊嗎？🤔`;
    }
    
    // Global services
    if (message.includes('海外') || message.includes('國際') || message.includes('全球')) {
        return `我們的海外發稿服務覆蓋全球呢！🌍<br><br>
        📊 <strong>服務規模：</strong><br>
        🌐 100,000+ 媒體網站<br>
        🗺️ 覆蓋全球五大洲<br><br>
        🤝 <strong>合作通訊社：</strong><br>
        美聯社、中央社、法新社、路透社、韓聯社、馬新社(BERNAMA)、安塔拉通訊社(ANTARA)<br><br>
        🎯 <strong>服務特色：</strong><br>
        ✨ 專業翻譯服務<br>
        📈 全球媒體網絡<br>
        🎪 文化適應性調整<br>
        📊 多語言報告<br><br>
        想了解特定地區的發稿服務嗎？😊`;
    }
    
    // Company information
    if (message.includes('公司') || message.includes('關於') || message.includes('介紹')) {
        return `很高興為您介紹暢品國際！🏢<br><br>
        🌟 <strong>公司簡介：</strong><br>
        我們是台灣領先的媒體購買與整合行銷服務公司，專注於媒體投放、公關策略與品牌行銷規劃。<br><br>
        💼 <strong>服務對象：</strong><br>
        🏢 各大公關公司<br>
        🏪 中小型企業<br>
        🌟 品牌推廣需求者<br><br>
        📍 <strong>聯絡資訊：</strong><br>
        📧 kingpinginternational@gmail.com<br>
        🏢 台北市信義路4段181號9樓<br><br>
        🎯 <strong>我們的使命：</strong><br>
        為客戶爭取最具競爭力的價格與版位，協助企業在台灣及海外市場提升知名度與影響力！✨`;
    }
    
    // Pricing and consultation
    if (message.includes('價格') || message.includes('費用') || message.includes('報價') || message.includes('諮詢')) {
        return `關於價格諮詢，我很樂意為您說明！💰<br><br>
        🎯 <strong>我們的優勢：</strong><br>
        💡 透過深度媒體合作關係<br>
        🤝 為您爭取最具競爭力的價格<br>
        📊 量身打造最佳方案<br><br>
        📋 <strong>報價方式：</strong><br>
        每個專案都會根據您的具體需求來制定，包括：<br>
        🎪 媒體選擇<br>
        📅 投放時程<br>
        📈 預期效果<br>
        🎯 目標受眾<br><br>
        💬 <strong>建議：</strong><br>
        請透過聯絡表單或直接來電，我們的專業顧問會為您提供詳細的客製化報價！<br><br>
        需要我協助您填寫諮詢表單嗎？😊`;
    }
    
    // Contact information
    if (message.includes('聯絡') || message.includes('電話') || message.includes('地址') || message.includes('email')) {
        return `當然！以下是我們的聯絡資訊：📞<br><br>
        🏢 <strong>暢品國際有限公司</strong><br>
        (KINGPING INTERNATIONAL)<br><br>
        📧 <strong>Email：</strong><br>
        kingpinginternational@gmail.com<br><br>
        📍 <strong>地址：</strong><br>
        台北市信義路4段181號9樓<br><br>
        ⏰ <strong>服務時間：</strong><br>
        週一至週五 9:00-18:00<br><br>
        💬 <strong>聯絡方式：</strong><br>
        您可以透過網站的聯絡表單，或直接發送郵件給我們。我們會在24小時內回覆您！<br><br>
        有任何問題都歡迎隨時聯繫我們喔！😊`;
    }
    
    // Greetings
    if (message.includes('你好') || message.includes('哈囉') || message.includes('嗨')) {
        return `您好！很高興見到您！😊<br><br>
        我是小暢助手，暢品國際的專屬AI客服！✨<br><br>
        🎯 <strong>我可以協助您了解：</strong><br>
        📋 我們的服務項目<br>
        📰 媒體資源介紹<br>
        🌍 海外發稿服務<br>
        💼 公司相關資訊<br>
        💰 價格諮詢指引<br><br>
        請問今天有什麼可以為您服務的嗎？🤔`;
    }
    
    // Thank you
    if (message.includes('謝謝') || message.includes('感謝')) {
        return `不客氣！很高興能為您服務！😊<br><br>
        如果您還有任何其他問題，隨時都可以問我喔！<br><br>
        🌟 別忘了，我們提供：<br>
        📞 24小時內回覆保證<br>
        💼 專業顧問諮詢<br>
        📊 客製化解決方案<br><br>
        期待與您的合作！✨`;
    }
    
    // Default response
    const defaultResponses = [
        `感謝您的提問！😊<br><br>
        我是小暢助手，專門協助您了解暢品國際的服務。<br><br>
        🎯 <strong>您可以詢問：</strong><br>
        📋 "服務項目有哪些？"<br>
        📰 "有哪些媒體資源？"<br>
        🌍 "海外發稿服務如何？"<br>
        💰 "如何取得報價？"<br>
        📞 "聯絡方式是什麼？"<br><br>
        或者您也可以直接告訴我您的需求，我會盡力為您解答！✨`,
        
        `很抱歉，我可能沒有完全理解您的問題 🤔<br><br>
        不過別擔心！我可以為您介紹：<br><br>
        🎪 <strong>暢品國際的專業服務：</strong><br>
        📊 媒體策略規劃<br>
        📰 新聞稿撰寫發佈<br>
        🌍 海外媒體發稿<br>
        📈 效果追蹤報告<br><br>
        您想了解哪個部分呢？或者可以換個方式問我！😊`,
        
        `我正在努力學習中！🤖✨<br><br>
        目前我最擅長回答關於：<br><br>
        🏢 暢品國際公司介紹<br>
        📋 服務項目說明<br>
        📰 媒體合作資源<br>
        🌍 國際發稿服務<br>
        💼 聯絡諮詢方式<br><br>
        如果您有這些方面的問題，我會很樂意為您詳細解答！<br><br>
        或者您也可以直接透過聯絡表單與我們的專業顧問聯繫喔！😊`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function initializeChatbot() {
    // Allow Enter key to send message
    const chatbotInput = document.getElementById('chatbotInput');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .media-logo-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for animated elements
    const elements = document.querySelectorAll('.service-card, .media-logo-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger animation on load
    animateOnScroll();
});

// Media filter functionality (if needed in the future)
function filterMedia(category) {
    const mediaItems = document.querySelectorAll('.media-logo-item');
    
    mediaItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Smooth reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .media-logo-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

