// renderer.js
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('overlay-button');
  let isGreen = true;

  button.addEventListener('click', (e) => {
    isGreen = !isGreen;
    const newColor = isGreen ? '#4CAF50' : '#f44336';
    button.style.backgroundColor = newColor;
    window.electron.log(`Button clicked! Changed color to ${newColor}`);
    e.stopPropagation();
  });

  // Listen for simulated clicks from the main process
  window.electron.onSimulateClick(({ x, y, button: mouseButton }) => {
    // Device pixel ratio is crucial for correct scaling
    const scale = window.devicePixelRatio || 1;
    
    // Convert screen coordinates to client coordinates
    const clientX = x / scale;
    const clientY = y / scale;
    
    window.electron.log(`Received screen click at (${x}, ${y})`);
    window.electron.log(`Converted to client coordinates (${clientX}, ${clientY})`);
    window.electron.log(`Device pixel ratio: ${scale}`);
    
    // Use elementFromPoint with scaled coordinates
    const element = document.elementFromPoint(clientX, clientY);
    
    if (element) {
      window.electron.log(`Found element: ${element.tagName}#${element.id}`);
      
      // Get button rectangle in client coordinates
      const buttonRect = button.getBoundingClientRect();
      window.electron.log(`Button area: left=${buttonRect.left}, top=${buttonRect.top}, right=${buttonRect.right}, bottom=${buttonRect.bottom}`);
      
      // Check if the click is within the button's bounds
      if (
        clientX >= buttonRect.left && 
        clientX <= buttonRect.right && 
        clientY >= buttonRect.top && 
        clientY <= buttonRect.bottom
      ) {
        // Create and dispatch click event
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: clientX,
          clientY: clientY,
          screenX: x,
          screenY: y,
          button: mouseButton - 1
        });
        
        button.dispatchEvent(clickEvent);
        window.electron.log('Click event dispatched on button');
      } else {
        window.electron.log('Click outside button area');
      }
    } else {
      window.electron.log('No element found at click position');
    }
  });

  // Log initial button position for debugging
  const buttonRect = button.getBoundingClientRect();
  window.electron.log(`Initial button area: left=${buttonRect.left}, top=${buttonRect.top}, right=${buttonRect.right}, bottom=${buttonRect.bottom}`);
});