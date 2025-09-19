// Use strict
"use strict";


// Main function

// Runtime installed event
((typeof chrome !== "undefined") ? chrome : browser).runtime.onInstalled.addListener(function() {

	// Inject content script
	injectContentScript();
});

// Management enabled event
((typeof chrome !== "undefined") ? chrome : browser).management.onEnabled.addListener(function() {

	// Inject content script
	injectContentScript();
});


// Supporting function implementation

// Inject content script
function injectContentScript() {

	// Get all windows
	((typeof chrome !== "undefined") ? chrome : browser).windows.getAll({
	
		// Populate
		populate: true
		
	}).then(function(windows) {
	
		// Go through all windows
		for(var i = 0; i < windows.length; ++i) {
		
			// Get window
			var window = windows[i];
			
			// Go through all window's tabs
			for(var j = 0; j < window.tabs.length; ++j) {
			
				// Get tab
				var tab = window.tabs[j];
				
				// Execute script
				((typeof chrome !== "undefined") ? chrome : browser).scripting.executeScript({
				
					// Target
					target: {
					
						// Tab ID
						tabId: tab.id
					},
					
					// Files
					files: [
					
						// Content script
						"./content_script.js"
					]
				
				// Catch errors
				}).catch(function(error) {
				
				});
			}
		}
		
	// Catch errors
	}).catch(function(error) {
	
	});
}
