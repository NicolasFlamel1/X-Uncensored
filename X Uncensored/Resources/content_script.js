// Use strict
"use strict";


// Main function

// Create filter responses
var filterResponses = document.createElement("script");

// Load filter responses
filterResponses.src = ((typeof chrome !== "undefined") ? chrome : browser).runtime.getURL("./filter_responses.js");

// Add filter responses to site
document.head.appendChild(filterResponses);
