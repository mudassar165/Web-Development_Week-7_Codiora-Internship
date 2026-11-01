const projects = [
  {
    id: "juniper", title: "Juniper & Co. brand identity", client: "Maya Chen", initials: "MC", clientCompany: "Juniper & Co.", freelancer: "Jamie Davis", freelancerInitials: "JD", budget: 2400, due: "Nov 18, 2026", dueDate: "2026-11-18", status: "In Progress", progress: 68, art: "art-olive", letter: "J", category: "Brand identity", description: "A thoughtful visual identity for a neighborhood coffee company making space for slower mornings and good conversation.", milestones: [{ title: "Discovery & creative direction", date: "Oct 24", done: true }, { title: "Logo exploration", date: "Nov 04", done: true }, { title: "Identity system & assets", date: "Nov 12", done: false }, { title: "Final brand guidelines", date: "Nov 18", done: false }], file: "Juniper-brand-concepts-v2.pdf", fileSize: "18.4 MB", activity: "Maya shared feedback on the latest concepts." },
  {
    id: "sunday", title: "Sunday Rituals website", client: "Oliver Grant", initials: "OG", clientCompany: "Sunday Rituals", freelancer: "Jamie Davis", freelancerInitials: "JD", budget: 1800, due: "Nov 24, 2026", dueDate: "2026-11-24", status: "Submitted", progress: 92, art: "art-coral", letter: "S", category: "Web design", description: "A calm, editorial storefront that gives a small-batch skincare line room to tell its story and find its people.", milestones: [{ title: "Site map & wireframes", date: "Nov 02", done: true }, { title: "Homepage & collection design", date: "Nov 09", done: true }, { title: "Mobile design pass", date: "Nov 14", done: true }, { title: "Final review & handoff", date: "Nov 19", done: false }], file: "Sunday-Rituals-final-design.fig", fileSize: "24.1 MB", activity: "You submitted the final design for review." },
  {
    id: "fieldnotes", title: "Fieldnotes editorial package", client: "Nina Patel", initials: "NP", clientCompany: "Fieldnotes Journal", freelancer: "Jamie Davis", freelancerInitials: "JD", budget: 950, due: "Dec 02, 2026", dueDate: "2026-12-02", status: "Pending", progress: 12, art: "art-blue", letter: "F", category: "Editorial design", description: "A flexible editorial toolkit for a new journal about the people, places, and ideas shaping the outdoors.", milestones: [{ title: "Project kickoff", date: "Nov 08", done: true }, { title: "Art direction & references", date: "Nov 15", done: false }, { title: "Editorial templates", date: "Nov 25", done: false }, { title: "Production files", date: "Dec 02", done: false }], file: "Fieldnotes-editorial-outline.pdf", fileSize: "6.2 MB", activity: "Project created. Add a note to kick things off." },
  {
    id: "morrow", title: "Morrow ceramics lookbook", client: "Elliot James", initials: "EJ", clientCompany: "Morrow Studio", freelancer: "Jamie Davis", freelancerInitials: "JD", budget: 1250, due: "Oct 28, 2026", status: "Completed", progress: 100, art: "art-lilac", letter: "M", category: "Art direction", description: "A tactile, image-led lookbook introducing a collection of everyday ceramics shaped by hand and fired in small batches.", milestones: [{ title: "Visual references", date: "Oct 08", done: true }, { title: "Shot list & styling", date: "Oct 16", done: true }, { title: "Lookbook design", date: "Oct 22", done: true }, { title: "Final delivery", date: "Oct 28", done: true }], file: "Morrow-lookbook-final.pdf", fileSize: "32.0 MB", activity: "Elliot approved the final lookbook. Project complete!" },
];

const requestedProjectId = new URLSearchParams(window.location.search).get("project");
let selectedProjectId = projects.some((project) => project.id === requestedProjectId) ? requestedProjectId : "juniper";
let activeFilter = "all";
let activeRole = "freelancer";
let toastTimer;
const projectList = document.querySelector("#project-list");
const projectDetail = document.querySelector("#project-detail");
const searchInput = document.querySelector("#project-search");

const formatMoney = (amount) => `$${Number(amount).toLocaleString("en-US")}`;
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character]);
const currentProject = () => projects.find((project) => project.id === selectedProjectId) ?? projects[0];

const reviewEntries = [
  { name: "Elliot James", initials: "EJ", rating: 5, text: "Jamie made the whole process feel thoughtful and easy. The final lookbook captured exactly what we hoped for.", date: "Oct 29, 2026" },
  { name: "Nina Patel", initials: "NP", rating: 5, text: "Clear communication, lovely attention to detail, and a delivery that made our launch feel real.", date: "Oct 20, 2026" }
];

function renderReviewSection(isClient) {
  return `
    <section class="review-flow" id="project-review" aria-label="Project review">
      <div class="section-heading">
        <h3>Rate your experience<span class="heading-period">.</span></h3>
        <span class="review-project-label">${isClient ? "Review your freelancer" : "Review your client"}</span>
      </div>
      <div class="review-flow-intro">
        <span class="review-flow-intro-icon" aria-hidden="true">🎉</span>
        <p><strong>Project complete!</strong> Share honest feedback to help the community and celebrate a great collaboration.</p>
      </div>
      <div class="review-grid">
        <form class="project-review-form" id="project-review-form" novalidate>
          <p class="review-intro">Your feedback helps the next great collaboration get started.</p>
          <div class="project-rating" role="radiogroup" aria-label="Rate this project from one to five stars">
            ${[1, 2, 3, 4, 5].map((rating) =>
              `<button class="project-rating-star" type="button" role="radio" aria-checked="false"
                aria-label="${rating} ${rating === 1 ? "star" : "stars"}" data-rating="${rating}">★</button>`
            ).join("")}
          </div>
          <p class="rating-caption" id="project-rating-caption">Select a rating</p>
          <label class="review-label" for="project-review-text">Your review</label>
          <textarea id="project-review-text" maxlength="500" placeholder="How did the collaboration go? What made it work?" required></textarea>
          <p class="review-char-count"><span id="review-char-remaining">500</span> characters remaining</p>
          <p class="review-error" id="project-review-error" aria-live="polite"></p>
          <button class="button button-primary" type="submit">Submit review <span aria-hidden="true">★</span></button>
        </form>
        <div class="existing-reviews">
          <div class="section-heading"><h3>Recent reviews <span>${reviewEntries.length}</span></h3></div>
          <div class="review-entry-list" id="review-entry-list">
            ${reviewEntries.length ? reviewEntries.map((review) =>
              `<article class="review-entry">
                <span class="avatar review-avatar">${escapeHTML(review.initials)}</span>
                <div class="review-entry-copy">
                  <div class="review-entry-meta">
                    <strong>${escapeHTML(review.name)}</strong>
                    <time>${escapeHTML(review.date)}</time>
                  </div>
                  <div class="review-entry-stars" aria-label="${review.rating} out of 5 stars">
                    ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
                    <span>${review.rating}.0</span>
                  </div>
                  <p>${escapeHTML(review.text)}</p>
                </div>
              </article>`
            ).join("") : '<p class="conversation-empty" style="padding:12px 0;">No reviews yet for this project.</p>'}
          </div>
        </div>
      </div>
    </section>`;
}

function renderProjectList() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleProjects = projects.filter((project) => {
    const matchesStatus = activeFilter === "all" || (activeFilter === "active" ? !["Completed", "Cancelled"].includes(project.status) : project.status === "Completed");
    const matchesQuery = `${project.title} ${project.client} ${project.clientCompany} ${project.category}`.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });
  document.querySelector("#visible-count").textContent = visibleProjects.length;
  document.querySelector("#empty-state").hidden = visibleProjects.length > 0;
  projectList.innerHTML = visibleProjects.map((project) => `
    <div role="listitem"><button class="project-card${project.id === selectedProjectId ? " selected" : ""}" type="button" data-project="${project.id}" aria-pressed="${project.id === selectedProjectId}">
      <span class="project-art ${project.art}" aria-hidden="true"><span>${escapeHTML(project.letter)}</span></span>
      <span class="project-card-copy"><strong>${escapeHTML(project.title)}</strong><span class="project-client">${escapeHTML(project.clientCompany)} · ${escapeHTML(project.category)}</span></span>
      <span class="project-card-meta"><span class="card-budget">${formatMoney(project.budget)}</span><span class="status-pill status-${project.status.toLowerCase().replaceAll(" ", "-")}">${project.status}</span></span>
    </button></div>`).join("");
  document.querySelectorAll(".project-card").forEach((card) => card.addEventListener("click", () => {
    selectedProjectId = card.dataset.project;
    renderProjectList();
    renderProjectDetail();
  }));
}

function renderProjectDetail() {
  const project = currentProject();
  const isClient = activeRole === "client";
  const milestonesDone = project.milestones.filter((milestone) => milestone.done).length;
  const isComplete = project.status === "Completed";
  projectDetail.innerHTML = `
    <div class="detail-header">
      <div class="detail-title-wrap">
        <span class="project-art detail-art ${project.art}" aria-hidden="true"><span>${escapeHTML(project.letter)}</span></span>
        <div class="detail-title-copy"><p class="detail-kicker">${escapeHTML(project.category)}<span aria-hidden="true">·</span><span class="status-pill status-${project.status.toLowerCase().replaceAll(" ", "-")}">${project.status}</span></p><h2>${escapeHTML(project.title)}</h2></div>
      </div>
      <div class="detail-actions">
        <button class="small-icon-button" type="button" id="share-project" aria-label="Share project" title="Share project"><span aria-hidden="true">↗</span></button>
        <button class="small-icon-button dots-icon" type="button" id="more-project" aria-label="More project options" title="More options">•••</button>
        <select class="detail-status-select" id="project-status" aria-label="Update project status">${["Pending", "In Progress", "Submitted", "Completed", "Cancelled"].map((status) => `<option${status === project.status ? " selected" : ""}>${status}</option>`).join("")}</select>
      </div>
    </div>
    <p class="detail-description">${escapeHTML(project.description)}</p>
    <div class="people-budget-row">
      <div class="meta-block"><span class="meta-label">${isClient ? "YOU" : "CLIENT"}</span><div class="person"><span class="avatar avatar-client">${isClient ? "JD" : escapeHTML(project.initials)}</span><span class="person-copy"><strong>${isClient ? "Jamie Davis" : escapeHTML(project.client)}</strong><small>${isClient ? "Freelancer" : escapeHTML(project.clientCompany)}</small></span></div></div>
      <div class="meta-block"><span class="meta-label">${isClient ? "FREELANCER" : "YOUR ROLE"}</span><div class="person"><span class="avatar avatar-freelancer">${isClient ? escapeHTML(project.freelancerInitials) : "JD"}</span><span class="person-copy"><strong>${isClient ? escapeHTML(project.freelancer) : "Brand designer"}</strong><small>${isClient ? "Brand designer" : "Project owner"}</small></span></div></div>
      <div class="meta-block"><span class="meta-label">PROJECT BUDGET</span><strong class="meta-value">${formatMoney(project.budget)}</strong><small class="meta-caption">Fixed price</small></div>
      <div class="meta-block"><span class="meta-label">DUE DATE</span><strong class="meta-value">${project.due}</strong><small class="meta-caption">${isComplete ? "Delivered on time" : "Deadline"}</small></div>
    </div>
    <section class="project-progress" aria-label="Project progress">
      <div class="section-title-row"><h3>Project progress</h3><span class="progress-value">${project.progress}%</span></div>
      <div class="progress-track" role="progressbar" aria-label="Project progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${project.progress}"><div class="progress-fill" style="width: ${project.progress}%"></div></div>
      <div class="progress-caption"><span>${milestonesDone} of ${project.milestones.length} milestones complete</span><span>${isComplete ? "All wrapped up" : `Due ${escapeHTML(project.due)}`}</span></div>
    </section>
    <div class="detail-columns">
      <section class="milestones-section" aria-label="Project milestones">
        <div class="section-heading"><h3>Milestones <span>${milestonesDone}/${project.milestones.length}</span></h3><button class="text-action" id="add-milestone" type="button">＋ Add task</button></div>
        <div class="milestone-list">${project.milestones.map((milestone, index) => `<div class="milestone${milestone.done ? " done" : ""}"><button class="milestone-check" type="button" data-milestone="${index}" aria-label="Mark ${escapeHTML(milestone.title)} ${milestone.done ? "incomplete" : "complete"}" aria-pressed="${milestone.done}">${milestone.done ? "✓" : ""}</button><span class="milestone-copy"><strong>${escapeHTML(milestone.title)}</strong><small>${milestone.done ? "Completed" : "Milestone"}</small></span><span class="milestone-date">${escapeHTML(milestone.date)}</span></div>`).join("")}</div>
      </section>
      <section class="delivery-section" id="delivery" aria-label="Delivery and submissions">
        <div class="section-heading"><h3>${isClient ? "Project files" : "Delivery & submission"}</h3><button class="text-action" id="upload-file" type="button">＋ Upload</button><input id="file-input" type="file" hidden /></div>
        <div class="delivery-card"><div class="delivery-top"><span class="file-icon" aria-hidden="true">↗</span><span><strong id="delivery-file-name">${escapeHTML(project.file)}</strong><small id="delivery-file-size">${escapeHTML(project.fileSize)} · ${project.status === "Submitted" || isComplete ? "Ready for review" : "Latest version"}</small></span></div><p class="delivery-note">${isClient ? "Your freelancer has shared the latest project files." : "Share work for review, or send final files when everything is ready."}</p><div class="delivery-actions"><button class="delivery-button" id="download-file" type="button">↓ Download</button><button class="delivery-button primary-small" id="submit-delivery" type="button"${isComplete ? " disabled" : ""}>${project.status === "Submitted" ? "Submitted for review" : isComplete ? "Project completed" : "Submit for review"}</button></div></div>
      </section>
    </div>
    <section class="activity-section" id="activity"><div class="section-heading activity-heading"><h3>Recent activity</h3><button class="text-action" id="message-client" type="button">Message ${isClient ? "freelancer" : "client"} ↗</button></div><div class="activity-feed"><span class="activity-mark" aria-hidden="true">✳</span><span class="activity-copy"><strong>${escapeHTML(isClient ? (project.status === "Submitted" ? project.freelancer : project.client) : project.client)}</strong> ${escapeHTML(project.activity)}</span><span class="activity-time">${project.status === "Completed" ? "Oct 28" : "2h ago"}</span></div></section>
    ${isComplete ? renderReviewSection(isClient) : ""}`;

  projectDetail.querySelector("#project-status").addEventListener("change", (event) => updateStatus(project, event.target.value));
  projectDetail.querySelectorAll(".milestone-check").forEach((button) => button.addEventListener("click", () => toggleMilestone(project, Number(button.dataset.milestone))));
  projectDetail.querySelector("#add-milestone").addEventListener("click", () => addMilestone(project));
  projectDetail.querySelector("#submit-delivery").addEventListener("click", () => submitDelivery(project));
  projectDetail.querySelector("#upload-file").addEventListener("click", () => projectDetail.querySelector("#file-input").click());
  projectDetail.querySelector("#file-input").addEventListener("change", (event) => updateFile(project, event.target.files[0]));
  projectDetail.querySelector("#download-file").addEventListener("click", () => showToast(`Ready to download ${project.file}`));
  projectDetail.querySelector("#share-project").addEventListener("click", shareProject);
  projectDetail.querySelector("#more-project").addEventListener("click", () => showToast("Project options are up to date."));
  projectDetail.querySelector("#message-client").addEventListener("click", () => {
    window.location.href = `messages.html?project=${encodeURIComponent(project.id)}`;
  });
  if (isComplete) bindProjectReviewForm();
}

function bindProjectReviewForm() {
  const form = projectDetail.querySelector("#project-review-form");
  if (!form) return;
  let selectedRating = 0;
  let hoveredRating = 0;
  const stars = [...form.querySelectorAll("[data-rating]")];
  const ratingLabels = ["", "Needs improvement", "Could be better", "Good experience", "Really great!", "Excellent! 🌟"];
  const textarea = form.querySelector("#project-review-text");
  const charCount = form.querySelector("#review-char-remaining");

  // Char counter
  if (textarea && charCount) {
    textarea.addEventListener("input", () => {
      const remaining = 500 - textarea.value.length;
      charCount.textContent = remaining;
      charCount.style.color = remaining < 50 ? "#d07050" : "";
    });
  }

  const updateStars = () => stars.forEach((star) => {
    const rating = Number(star.dataset.rating);
    const filled = rating <= (hoveredRating || selectedRating);
    star.classList.toggle("selected", rating <= selectedRating);
    star.classList.toggle("hovered", hoveredRating > 0 && rating <= hoveredRating && rating > selectedRating);
    star.setAttribute("aria-checked", String(rating === selectedRating));
  });

  stars.forEach((star) => {
    star.addEventListener("mouseenter", () => {
      hoveredRating = Number(star.dataset.rating);
      updateStars();
      form.querySelector("#project-rating-caption").textContent = ratingLabels[hoveredRating];
    });
    star.addEventListener("mouseleave", () => {
      hoveredRating = 0;
      updateStars();
      form.querySelector("#project-rating-caption").textContent = selectedRating ? ratingLabels[selectedRating] : "Select a rating";
    });
    star.addEventListener("click", () => {
      selectedRating = Number(star.dataset.rating);
      hoveredRating = 0;
      updateStars();
      form.querySelector("#project-rating-caption").textContent = ratingLabels[selectedRating];
      form.querySelector("#project-review-error").textContent = "";
      // Pop animation
      star.classList.add("pop");
      setTimeout(() => star.classList.remove("pop"), 300);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = textarea ? textarea.value.trim() : "";
    const error = form.querySelector("#project-review-error");
    if (!selectedRating) {
      error.textContent = "Please choose a star rating before submitting.";
      return;
    }
    if (text.length < 12) {
      error.textContent = "Please add a little more detail (at least 12 characters).";
      if (textarea) textarea.focus();
      return;
    }
    // Add to reviews
    reviewEntries.unshift({
      name: "Jamie Davis",
      initials: "JD",
      rating: selectedRating,
      text,
      date: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date())
    });
    // Show success state in the form area
    form.innerHTML = `
      <div class="review-submitted-state" role="status" aria-live="polite">
        <span class="review-submitted-icon" aria-hidden="true">🎉</span>
        <strong>Review submitted!</strong>
        <p>Thank you for your feedback. Your review will help others find great collaborations.</p>
        <div class="review-entry-stars" style="font-size:18px;margin-top:4px;">${"★".repeat(selectedRating)}${"☆".repeat(5 - selectedRating)}</div>
      </div>`;
    // Re-render reviews list
    const reviewList = projectDetail.querySelector("#review-entry-list");
    if (reviewList) {
      reviewList.innerHTML = reviewEntries.map((review) =>
        `<article class="review-entry">
          <span class="avatar review-avatar">${escapeHTML(review.initials)}</span>
          <div class="review-entry-copy">
            <div class="review-entry-meta"><strong>${escapeHTML(review.name)}</strong><time>${escapeHTML(review.date)}</time></div>
            <div class="review-entry-stars" aria-label="${review.rating} out of 5 stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}<span>${review.rating}.0</span></div>
            <p>${escapeHTML(review.text)}</p>
          </div>
        </article>`
      ).join("");
      projectDetail.querySelector(".existing-reviews .section-heading h3 span").textContent = reviewEntries.length;
    }
    showToast("Your review has been submitted. Thank you! ★");
  });
}

function updateStatus(project, status) {
  project.status = status;
  if (status === "Completed") {
    project.progress = 100;
    project.milestones.forEach((milestone) => { milestone.done = true; });
  }
  renderProjectList();
  renderProjectDetail();
  updateStats();
  showToast(`Project status changed to ${status}.`);
}

function toggleMilestone(project, index) {
  project.milestones[index].done = !project.milestones[index].done;
  const doneCount = project.milestones.filter((milestone) => milestone.done).length;
  project.progress = Math.round(doneCount / project.milestones.length * 100);
  if (project.status === "Pending" && doneCount > 0) project.status = "In Progress";
  if (project.status === "Completed" && doneCount < project.milestones.length) project.status = "In Progress";
  renderProjectList();
  renderProjectDetail();
  updateStats();
}

function addMilestone(project) {
  const title = window.prompt("What needs to get done?");
  if (!title?.trim()) return;
  project.milestones.push({ title: title.trim(), date: "New", done: false });
  project.progress = Math.round(project.milestones.filter((milestone) => milestone.done).length / project.milestones.length * 100);
  renderProjectDetail();
  showToast("Task added to your milestones.");
}

function submitDelivery(project) {
  project.status = "Submitted";
  project.progress = Math.max(project.progress, 92);
  project.activity = "You submitted the latest work for review.";
  renderProjectList();
  renderProjectDetail();
  updateStats();
  showToast("Your delivery is ready for client review.");
}

function updateFile(project, file) {
  if (!file) return;
  project.file = file.name;
  project.fileSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
  renderProjectDetail();
  showToast(`${file.name} added to project files.`);
}

function updateStats() {
  const active = projects.filter((project) => !["Completed", "Cancelled"].includes(project.status));
  document.querySelector("#active-count").textContent = String(active.length).padStart(2, "0");
  document.querySelector("#progress-count").textContent = String(active.filter((project) => project.status === "In Progress").length).padStart(2, "0");
  document.querySelector("#review-count").textContent = String(active.filter((project) => project.status === "Submitted").length).padStart(2, "0");
  document.querySelector('[data-filter="all"] span').textContent = projects.length;
  document.querySelector('[data-filter="active"] span').textContent = active.length;
  document.querySelector('[data-filter="completed"] span').textContent = projects.filter((project) => project.status === "Completed").length;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

async function shareProject() {
  const url = `${window.location.origin}${window.location.pathname}#${selectedProjectId}`;
  try {
    await navigator.clipboard.writeText(url);
    showToast("Project link copied to clipboard.");
  } catch {
    showToast("Project link is ready to share.");
  }
}

document.querySelectorAll(".project-tab").forEach((tab) => tab.addEventListener("click", () => {
  activeFilter = tab.dataset.filter;
  document.querySelectorAll(".project-tab").forEach((item) => {
    const active = item === tab;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
  renderProjectList();
}));

document.querySelectorAll(".role-option").forEach((button) => button.addEventListener("click", () => {
  activeRole = button.dataset.role;
  document.querySelectorAll(".role-option").forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  renderProjectDetail();
  showToast(`${activeRole === "client" ? "Client" : "Freelancer"} view enabled.`);
}));

searchInput.addEventListener("input", renderProjectList);
document.querySelector("#show-all-projects").addEventListener("click", () => {
  activeFilter = "all";
  document.querySelector('[data-filter="all"]').click();
});
document.querySelector("#filter-button").addEventListener("click", () => {
  const nextFilter = activeFilter === "active" ? "completed" : "active";
  document.querySelector(`[data-filter="${nextFilter}"]`).click();
  showToast(`Showing ${nextFilter} projects.`);
});

const projectDialog = document.querySelector("#new-project-dialog");
document.querySelector("#new-project-button").addEventListener("click", () => projectDialog.showModal());
document.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
document.querySelector(".dialog-cancel").addEventListener("click", () => projectDialog.close());
document.querySelector("#new-project-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const date = new Date(`${formData.get("deadline")}T12:00:00`);
  const newProject = {
    id: `project-${Date.now()}`, title: formData.get("name").trim(), client: formData.get("client").trim(), initials: formData.get("client").trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(), clientCompany: formData.get("client").trim(), freelancer: "Jamie Davis", freelancerInitials: "JD", budget: Number(formData.get("budget")), due: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), dueDate: formData.get("deadline"), status: "Pending", progress: 0, art: ["art-olive", "art-coral", "art-blue", "art-lilac"][projects.length % 4], letter: formData.get("name").trim()[0].toUpperCase(), category: "New project", description: "A new collaboration, ready to take shape.", milestones: [{ title: "Project kickoff", date: "New", done: false }], file: "No files uploaded yet", fileSize: "Add your first delivery", activity: "Project created. Add a note to kick things off."
  };
  projects.unshift(newProject);
  selectedProjectId = newProject.id;
  activeFilter = "all";
  document.querySelector('[data-filter="all"]').click();
  renderProjectDetail();
  updateStats();
  event.currentTarget.reset();
  projectDialog.close();
  showToast("Your new project is ready.");
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

renderProjectList();
renderProjectDetail();
updateStats();