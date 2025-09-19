// Use strict
"use strict";


// Main function

// Try
try {

	// Check if filter responses doesn't already exist
	if(typeof filterResponses === "undefined") {
	
		// Create filter responses
		var filterResponses = document.createElement("script");
		
		// Load filter responses
		filterResponses.src = ((typeof chrome !== "undefined") ? chrome : browser).runtime.getURL("./filter_responses.js");
		
		// Filter responses load event
		filterResponses.addEventListener("load", function(event) {
		
			// Prevent default and stop propagation
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			
			// Remove Filter responses
			filterResponses.remove();
			
		}, true);
		
		// Add filter responses to site
		document.head.appendChild(filterResponses);
	}
}

// Catch errors
catch(error) {

}
