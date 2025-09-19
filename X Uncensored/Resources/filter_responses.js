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
							
								// Return getting response as text
								return response.clone().text().then(function(responseText) {
								
									// Try
									try {
									
										// Check if the response contains media visibility results
										if(responseText.indexOf("mediaVisibilityResults") !== -1) {
										
											// Parse response as JSON
											var json = JSON.parse(responseText);
											
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
										
										// Otherwise
										else {
										
											// Resolve response
											resolve(response);
										}
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
		
			// Replace window XML HTTP request
			var originalWindowXMLHttpRequest = window.XMLHttpRequest;
			var filterResponse = new Set();
			window.XMLHttpRequest = function(options) {
			
				// Perform original window XML HTTP request
				var request = new originalWindowXMLHttpRequest(options);
				
				// Try
				try {
				
					// Add ready state change listener to the request
					request.addEventListener("readystatechange", function() {
					
						// Try
						try {
						
							// Check if request is complete and its response should be filtered
							if(this.readyState === 4 && filterResponse.has(this) === true) {
							
								// Remove request from filter response
								filterResponse.delete(this);
								
								// Check if the response contains media visibility results
								if(this.responseText.indexOf("mediaVisibilityResults") !== -1) {
								
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
			
			// Replace window XML HTTP request open
			window.XMLHttpRequest.prototype = originalWindowXMLHttpRequest.prototype;
			var originalWindowXMLHttpRequestOpen = window.XMLHttpRequest.prototype.open;
			window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
			
				// Try
				try {
				
					// Check if request is to a GraphQL API
					if(url.toString().indexOf("/api/graphql/") !== -1) {
					
						// Set that the request's response should be filtered
						filterResponse.add(this);
					}
					
					// Otherwise
					else {
					
						// Remove request from filter response
						filterResponse.delete(this);
					}
				}
				
				// Catch errors
				catch(error) {
				
				}
				
				// Perform original window XML HTTP request open
				originalWindowXMLHttpRequestOpen.call(this, method, url, (typeof async !== "undefined") ? async : true, (typeof user !== "undefined") ? user : null, (typeof password !== "undefined") ? password : null);
			};
		}
	}
	
	// Catch errors
	catch(error) {
	
	}
})();
