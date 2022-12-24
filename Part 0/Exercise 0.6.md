```mermaid
sequenceDiagram
  Participant browser
  Participant server
  note over browser: Write a note in note form and click submit
  note over browser: event handler creates a new note and adds it to the notes list
  note over browser: event handler rerenders updated notes list on the page
  browser ->> server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
```
