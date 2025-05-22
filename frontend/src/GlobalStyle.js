import React from 'react';

function GlobalStyle() {
  React.useEffect(() => {
    // Set style global pada html, body, dan #root
    document.documentElement.style.height = '100%'; // html
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';

    document.body.style.height = '100%'; // body
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#8B6F47'; // background yang kamu inginkan

    const root = document.getElementById('root'); // root React
    if (root) {
      root.style.height = '100%';
      root.style.margin = '0';
      root.style.padding = '0';
    }
  }, []);

  return null; // Tidak render apa-apa
}

export default GlobalStyle;
