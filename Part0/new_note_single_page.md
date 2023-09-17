:::mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server    

    Note right of browser: The browser executes the callback function that renders the notes 

    browser->>user: read rendered webpage
    activate user
    user->>browser: enter [new_note] in text box, activate SAVE button
    deactivate user

    activate browser
    browser->>browser: EventHandler renders new note on page
    Note right of browser: The EventHandler creates new note, adds to notes list with notes.push(note), and rerenders note list

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa [{"content": "new_note", "date": "timestamp"}]
    deactivate browser

    
 

:::mermaid