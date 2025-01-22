{
    "openapi": "3.0.0",
    "info": {
      "title": "My Example API",
      "description": "This is a simple API example.",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "http://localhost:3000"
      }
    ],
    "paths": {
      "/greet": {
        "get": {
          "summary": "Get a greeting message",
          "responses": {
            "200": {
              "description": "A successful response",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Hello, world!"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  








  "paths": {
    "/": {
        "get": {
            "summary": "Get the landing page",
            "description": "Returns the HTML content of the landing page."
        },
        "post": {
            "summary": "Submit data to the landing page",
            "description": "Accepts form data submitted to the landing page."
        }
    },
    "/users": {
        "get": {
            "summary": "Get a list of users",
            "description": "Returns a list of all registered users."
        },
        "post": {
            "summary": "Create a new user",
            "description": "Creates a new user with the provided information."
        },
        "put": {
            "summary": "Update all users",
            "description": "Updates information for all users."
        },
        "delete": {
            "summary": "Delete all users",
            "description": "Deletes all user accounts."
        }
    }
}
