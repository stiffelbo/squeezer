export const listenCookieChange = (callback, interval = 1000) => {
    let lastCookie = document.cookie;
    setInterval(()=> {
      let cookie = document.cookie;
      if (cookie !== lastCookie) {
        try {
          callback({oldValue: lastCookie, newValue: cookie});
        } finally {
          lastCookie = cookie;
        }
      }
    }, interval);
  }