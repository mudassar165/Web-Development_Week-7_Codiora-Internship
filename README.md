# Workroom Project Dashboard

Workroom is a responsive project-management dashboard for freelance work after a proposal has been accepted. It brings a project list and selected-project details together in one screen, with client and freelancer perspectives, milestone tracking, status updates, and delivery controls.

## Run Locally

This is a static HTML, CSS, and JavaScript project. It has no package manager, build step, or required dependencies.

1. Open `index.html` in a modern browser, or open the folder in VS Code and use an extension such as Live Server.
2. Keep `styles.css` and `app.js` in the same folder as `index.html` so the page can load its stylesheet and script.

The interface uses DM Sans and Manrope from Google Fonts when an internet connection is available. System font fallbacks are used when those fonts cannot be loaded.

## Features

- **Project list:** View seeded active and completed projects, select a project, and see its detail panel.
- **Project search:** Search project names, client names, companies, and categories. Press `Ctrl+K` on Windows/Linux or `Cmd+K` on macOS to focus the search field.
- **Status filters:** Filter the list to all projects, active projects, or completed projects. Active includes Pending, In Progress, and Submitted projects. Cancelled projects remain available under All.
- **Client and freelancer perspectives:** Switch the selected project's labels and delivery context between client and freelancer views. This is a presentation switch, not account authentication or access control.
- **Project overview:** Review project status, progress, client and freelancer details, fixed budget, deadline, and recent activity.
- **Messaging:** Open project-linked conversations, search and filter the inbox, send messages, and follow unread indicators.
- **Notifications:** Review new messages, accepted proposals, project starts and completions, and received reviews. Notification links open the related conversation or project.
- **Project reviews:** Completed projects show a 1–5 star review form, basic validation, and recent reviews. Submissions appear immediately in the page.
- **Milestones:** Mark tasks complete or incomplete, add a task, and track the completion count. Toggling a task recalculates progress from the milestone completion ratio. Starting a task on a Pending project changes its status to In Progress.
- **Status updates:** Set a project to Pending, In Progress, Submitted, Completed, or Cancelled. Setting a project to Completed marks all of its milestones complete and sets progress to 100%.
- **Delivery controls:** Choose a file to display its name and size in the project, submit the project for review, or use the download control.
- **Create a project:** Add a project with a name, client, budget, and deadline. New projects start in Pending status with a kickoff milestone.
- **Responsive layout:** The navigation, project list, summary, and detail panel adapt for desktop, tablet, and mobile screens. Reduced-motion preferences are respected.

## Project Statuses

| Status | Meaning in this prototype |
| --- | --- |
| Pending | The project is created and work has not started. |
| In Progress | Work is underway. |
| Submitted | Work has been sent for client review. |
| Completed | The project is finished; all milestones are marked complete. |
| Cancelled | The project is cancelled and excluded from the Active filter. |

## Project Data

The sample projects are defined in the `projects` array near the top of `app.js`. Each record includes a title, client and freelancer details, budget, deadline, status, progress, description, milestones, delivery filename, and recent activity.

To adjust the demo, edit those records or change the initial values in the summary markup in `index.html`. The earned-this-month figure and its percentage comparison are static sample values.

## Prototype Limitations

- Project records and all changes exist only in browser memory. Reloading the page restores the original sample projects.
- There is no backend, login, database, payment processing, or multi-user synchronization.
- Choosing a file updates only the displayed filename and size; it does not upload or store file contents.
- The download control displays a confirmation message but does not download a file.
- Submitting a delivery updates the local project status and activity only.
- Messages, notification read state, and review submissions are demo data held in browser memory; they are not saved across reloads or shared with another user.
- Payments and some project actions remain visual placeholders.
- Sharing attempts to copy the current project URL to the clipboard; browser permissions may prevent copying when opened as a local file.
- The client/freelancer switch changes the presentation only and does not enforce different permissions.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Dashboard structure, navigation, project list and detail containers, and new-project dialog. |
| `styles.css` | Shared visual system, dashboard layout, project review styles, responsive breakpoints, and reduced-motion behavior. |
| `app.js` | Project data and interactions, project-linked review workflow, search and filters, milestone and status controls, delivery, and project creation. |
| `messages.html` | Workroom messaging page with inbox, chat, project context, and notification center. |
| `messages.css` | Messaging layout, notification panel, and responsive chat/inbox states. |
| `messages.js` | Project-linked conversation data, message sending, inbox filters, unread state, and notification routing. |