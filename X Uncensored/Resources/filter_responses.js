// Use strict
"use strict";


// Main function
(function() {

	// Remove media visibility results
	function removeMediaVisibilityResults(object) {
	
		// Check if object is an object
		if(typeof object === "object" && object !== null) {
		
			// Check if object contains media visibility results
			if("mediaVisibilityResults" in object === true) {
			
				// Remove object's media visibility results
				delete object.mediaVisibilityResults;
			}
			
			// Go through all keys in the object
			for(var key in object) {
			
				if(object.hasOwnProperty(key) === true) {
				
					// Remove media visibility results from the object at the key
					removeMediaVisibilityResults(object[key]);
				}
			}
		}
	}
	
	// Try
	try {
		
		// Check if window fetch exists
		if(typeof window === "object" && window !== null && typeof window.fetch === "function") {
		
			// Replace window fetch
			var originalWindowFetch = window.fetch;
			window.fetch = function(resource, options) {
			
				// Return promise
				return new Promise(function(resolve, reject) {
				
					// Return performing original window fetch
					return originalWindowFetch(resource, options).then(function(response) {
					
						// Try
						try {
						
							// Check if request is to a GraphQL API
							if(resource.toString().indexOf("/api/graphql/") !== -1) {
							
								// Return parsing response as JSON
								return response.clone().json().then(function(json) {
								
									// Try
									try {
									
										// Remove media visibility results from the JSON
										removeMediaVisibilityResults(json);
										
										// Get string from the JSON
										var string = JSON.stringify(json);
										
										// Resolve response with the string
										resolve(new Response(string, {
										
											// Status
											status: response.status,
											
											// Status text
											statusText: response.statusText,
											
											// Headers
											headers: response.headers
										}));
									}
									
									// Catch errors
									catch(error) {
									
										// Resolve response
										resolve(response);
									}
									
								// Catch errors
								}).catch(function() {
								
									// Resolve response
									resolve(response);
								});
							}
						}
						
						// Catch errors
						catch(error) {
						
						}
						
						// Resolve response
						resolve(response);
						
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				});
			};
		}
		
		// Check if XML HTTP request and XML HTTP request open exist
		if(typeof window === "object" && window !== null && typeof window.XMLHttpRequest === "function" && typeof window.XMLHttpRequest.prototype === "object" && window.XMLHttpRequest.prototype !== null && typeof window.XMLHttpRequest.prototype.open === "function") {
		
			// Replace XML HTTP request
			var originalXMLHttpRequest = window.XMLHttpRequest;
			window.XMLHttpRequest = function(options) {
			
				// Perform original XML HTTP request
				var request = new originalXMLHttpRequest(options);
				
				// Try
				try {
				
					// Set request's remove media visibility results from response to false
					request._removeMediaVisibilityResultsFromResponse = false;
					
					// Add ready state change listener to the request
					request.addEventListener("readystatechange", function() {
					
						// Try
						try {
						
							// Check if request is complete and removing media visibility results from its response
							if(this.readyState === 4 && this._removeMediaVisibilityResultsFromResponse === true) {
							
								// Parse response as JSON
								var json = JSON.parse(this.responseText);
								
								// Remove media visibility results from the JSON
								removeMediaVisibilityResults(json);
								
								// Get string from the JSON
								var string = JSON.stringify(json);
								
								// Set response to the string
								Object.defineProperty(this, "response", {
								
									// Value
									value: string
								});
								
								// Set response text to the string
								Object.defineProperty(this, "responseText", {
								
									// Value
									value: string
								});
							}
						}
						
						// Catch errors
						catch(error) {
						
						}
						
					}, true);
				}
				
				// Catch errors
				catch(error) {
				
				}
				
				// Return request
				return request;
			};
			
			// Replace XML HTTP request open
			window.XMLHttpRequest.prototype = originalXMLHttpRequest.prototype;
			var originalXMLHttpRequestOpen = window.XMLHttpRequest.prototype.open;
			window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
			
				// Try
				try {
				
					// Set to remove the media visibility reesults from the request's response if the request is to a GraphQL API
					this._removeMediaVisibilityResultsFromResponse = url.toString().indexOf("/api/graphql/") !== -1;
				}
				
				// Catch errors
				catch(error) {
				
				}
				
				// Perform original XML HTTP request open
				originalXMLHttpRequestOpen.call(this, method, url, (typeof async !== "undefined") ? async : true, (typeof user !== "undefined") ? user : null, (typeof password !== "undefined") ? password : null);
			};
		}
	}
	
	// Catch errors
	catch(error) {
	
	}
})();
