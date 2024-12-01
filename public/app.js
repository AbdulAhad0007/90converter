function convertWebsite() {
    const url = document.getElementById('websiteUrl').value;
    const websiteFrame = document.getElementById('websiteFrame');

    fetch(`/fetch?url=${encodeURIComponent(url)}`)
        .then(response => response.text())
        .then(data => {
            const iframeDocument = websiteFrame.contentDocument || websiteFrame.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(data);
            iframeDocument.close();

            // Rewrite resource URLs to go through the proxy
            const baseUrl = new URL(url);
            iframeDocument.querySelectorAll('img, script, link, svg').forEach(element => {
                const srcAttr = element.tagName.toLowerCase() === 'link' ? 'href' : 'src';
                if (element[srcAttr]) {
                    const absoluteUrl = new URL(element[srcAttr], baseUrl);
                    element[srcAttr] = `/fetch/resource?url=${encodeURIComponent(absoluteUrl.href)}`;
                }
            });

            // 90s Style CSS
            const styles = `
                body {
                    font-family:'Press Start 2P', 'Comic Sans MS', 'Brush Script MT', cursive !important;
                    background: linear-gradient(135deg, #FF69B4, #FFFF66) !important;
                    animation: gradient-shift 5s infinite alternate !important;
                    color: #000080 !important;
                    margin: 0;
                    padding: 0;
                    overflow-x: hidden;
                }
                @keyframes gradient-shift {
                    0% { background: linear-gradient(135deg, #FF69B4, #FFFF66); }
                    100% { background: linear-gradient(135deg, #9400D3, #00FFFF); }
                }
                * {
                    border-radius: 0 !important;
                    text-shadow: 2px 2px 3px #000000 !important;
                }
                a {
                    color: #8B4513 !important;
                    text-decoration: none !important;
                    transition: all 0.3s ease-in-out;
                }
                li{
                color:#039c99;
                font-size:18px;
                }
                a:hover {
                    color: lightbrown !important;
                }
                h1, h2, h3 {
                    font-size: clamp(1.5rem, 5vw, 3rem) !important;
                    color: #9400D3 !important;
                    background: linear-gradient(to right, #FF69B4, #00FFFF) !important;
                    -webkit-background-clip: text !important;
                    -webkit-text-fill-color: transparent !important;
                }
                h4, h5,h6{
                font-size: clamp(0.9rem, 5vw, 2rem) !important;
                    color: #9400D3 !important;
                    background: linear-gradient(to right, #FF69B4, #00FFFF) !important;
                    -webkit-background-clip: text !important;
                    -webkit-text-fill-color: transparent !important;
                }
                p{
                    font-size: clamp(1rem, 2.5vw, 1.5rem) !important;
                    color: #000080 !important;
                }
                div{
                font-size: clamp(1rem, 2.5vw, 1.5rem) !important;
                    color: #008080!important;
                }
                .card{
                    background: linear-gradient(to right, #D3D3D3, #8B4513, #2F4F4F);
                }
                span{
                font-size: clamp(1rem, 2.5vw, 1.5rem) !important;
                    color:#4B0082 !important;
                }
                img {
                    width:50px;
                    height:50px;
                    border: 4px solid #FFD700 !important;
                    box-shadow: 0 0 15px #32CD32 !important;
                    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                }
                img:hover {
                    box-shadow: 0 0 25px #00FFFF !important;
                }
                button, input, select, textarea {
                    font-family: 'Comic Sans MS', cursive !important;
                    background: linear-gradient(to bottom, #FF69B4, #9400D3) !important;
                    color: #FFFFFF !important;
                    border: 3px solid #FFD700 !important;
                    text-shadow: 0 0 5px #FFD700 !important;
                    cursor: url('https://example.com/retro-cursor.png'), auto !important;
                }
                button:hover, input:hover, select:hover, textarea:hover {
                    background: linear-gradient(to bottom, #9400D3, #FF69B4) !important;
                    box-shadow: 0 0 10px #FFD700 !important;
                }
                @media (max-width: 768px) {
                    body {
                        font-size: 14px !important;
                    }
                    img {
                        width: 100% !important;
                        height: auto !important;
                    }
                }
            `;

            let styleSheet = iframeDocument.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = styles;
            iframeDocument.head.appendChild(styleSheet);
        })
        .catch(error => {
            console.error('Error:', error);
            websiteFrame.srcdoc = '<p style="color: red; font-family: Arial, sans-serif;">Failed to load the website. Please check the URL and try again.</p>';
        });
}
