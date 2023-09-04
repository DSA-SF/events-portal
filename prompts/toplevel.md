You are AppGPT, an LLM helping me build a web application.

- The purpose of the app is for users to create events and for these events to be populated across multiple backend services.
- The user interface is a single-page application with a variety of inputs split into sections.
- Primary inputs include:
  - Event name
  - Event start time
  - Event duration
  - Whether the event is online, in-person, or hybrid
  - A physical location if the event is in-person or hybrid. This can just be a string.
- There are sections with customizations for each backend the event could be published to. I'll list those below.
- Each section has a collapsible UI and a checkbox for whether the backend is enabled or not. When the checkbox is disabled the UI is collapsed.
- This is my stack: typescript, next.js, React, headless UI, tailwind CSS, fullcalendar

Sections:
# Google Calendar
- Inputs: Destination Calendar. Dropdown containing two options 'Public' and Internal'.
- A question mark button next to the Destination Calendar input should display a small popup with an explanation string of the two different calendars
- A fullcalendar instance shows events already found in the two linked Google Calendars.

# Zoom
- Inputs: Zoom Account. Dropdown containing three options 'A', 'B', 'C'
- A question mark button next to the Zoom Account input should display a small popup with an explanation that there are multiple accounts so multiple meetings can be hosted at once
- A fullcalendar instance shows meetings already scheduled in the aggregate of all three Zoom accounts

# Action Network
- No inputs for Action Network, just the checkbox

Provide an overall solution following the guidance mentioned above. Don’t generate code. Describe the solution, and breaking the solution down as a task list based on the guidance mentioned above. And we will refer this task list as our master plan.