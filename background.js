chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('mario.html', {
	minWidth: 1000, 
	minHeight: 700,
    bounds: {
         width: screen.width,
         height: screen.height,
         left:0,
	 top:0

    },
  });
// Define behavior when browser action icon is clicked
});
