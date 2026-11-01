/* =========================================================
   Workroom — Messages, Notifications & Reviews (Week 6)
   ========================================================= */

"use strict";

/* ── Data ──────────────────────────────────────────────────── */
const contacts = {
  maya:   { name: "Maya Chen",    initials: "MC", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80", online: true  },
  oliver: { name: "Oliver Grant", initials: "OG", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", online: false },
  nina:   { name: "Nina Patel",   initials: "NP", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", online: true  },
  elliot: { name: "Elliot James", initials: "EJ", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80", online: false },
};

const conversations = [
  {
    id: "juniper", contact: "maya",
    project: "Juniper & Co. brand identity", company: "Juniper & Co.",
    status: "In Progress", progress: 68, budget: 2400, due: "Nov 18, 2026",
    category: "Brand identity", art: "art-olive", letter: "J",
    description: "A thoughtful visual identity for a neighborhood coffee company making space for slower mornings.",
    activity: "Maya shared feedback on the latest concepts.",
    preview: "The second direction is feeling just right.",
    time: "2:41 PM", unread: 2,
    messages: [
      { id: "m1", from: "them", text: "I've been looking through the first identity explorations. The second direction is feeling just right.", time: "2:32 PM", status: "read", reactions: ["❤️"] },
      { id: "m2", from: "me",   text: "Great to hear. I can refine the type and bring the color studies into that direction next.", time: "2:36 PM", status: "read", reactions: [] },
      { id: "m3", from: "them", text: "That warmer green feels very Juniper. Can we see it applied to the packaging too?", time: "2:41 PM", status: "delivered", reactions: [] },
    ],
  },
  {
    id: "sunday", contact: "oliver",
    project: "Sunday Rituals website", company: "Sunday Rituals",
    status: "Submitted", progress: 92, budget: 1800, due: "Nov 24, 2026",
    category: "Web design", art: "art-coral", letter: "S",
    description: "A calm, editorial storefront that gives a small-batch skincare line room to tell its story.",
    activity: "You submitted the final design for review.",
    preview: "Could we look at the mobile layout once more?",
    time: "11:18 AM", unread: 1,
    messages: [
      { id: "m4", from: "them", text: "Thanks for sending the final design through. The product pages are looking lovely.", time: "10:52 AM", status: "read", reactions: [] },
      { id: "m5", from: "me",   text: "Glad you like them. I'm here if anything needs a final adjustment.", time: "11:03 AM", status: "read", reactions: [] },
      { id: "m6", from: "them", text: "Could we look at the mobile layout once more before sign-off?", time: "11:18 AM", status: "delivered", reactions: ["👍"] },
    ],
  },
  {
    id: "fieldnotes", contact: "nina",
    project: "Fieldnotes editorial package", company: "Fieldnotes Journal",
    status: "Pending", progress: 12, budget: 950, due: "Dec 02, 2026",
    category: "Editorial design", art: "art-blue", letter: "F",
    description: "A flexible editorial toolkit for a new journal about the people, places, and ideas shaping the outdoors.",
    activity: "Project created. Add a note to kick things off.",
    preview: "I added a few references to the project folder.",
    time: "Yesterday", unread: 0,
    messages: [
      { id: "m7", from: "me",   text: "I've started collecting references for the editorial direction. Do you have a favorite publication you come back to?", time: "Yesterday, 3:10 PM", status: "read", reactions: [] },
      { id: "m8", from: "them", text: "I added a few references to the project folder. I love the restraint in Apartamento and the energy of old field guides.", time: "Yesterday, 3:24 PM", status: "read", reactions: [] },
    ],
  },
  {
    id: "morrow", contact: "elliot",
    project: "Morrow ceramics lookbook", company: "Morrow Studio",
    status: "Completed", progress: 100, budget: 1250, due: "Oct 28, 2026",
    category: "Art direction", art: "art-lilac", letter: "M",
    description: "A tactile, image-led lookbook introducing a collection of everyday ceramics shaped by hand and fired in small batches.",
    activity: "Elliot approved the final lookbook. Project complete!",
    preview: "The finished lookbook is beautiful. Thank you!",
    time: "Mon", unread: 0,
    messages: [
      { id: "m9",  from: "me",   text: "The final lookbook and print-ready files are in the project delivery. I've included the image credits in the notes.", time: "Monday, 9:17 AM", status: "read", reactions: [] },
      { id: "m10", from: "them", text: "The finished lookbook is beautiful. Thank you for taking such care with every detail.", time: "Monday, 9:31 AM", status: "read", reactions: ["❤️", "🙏"] },
    ],
  },
];

const notifications = [
  { id: "message-maya",     kind: "message",   title: "New message from Maya",     text: "The second direction is feeling just right.",           time: "2 min ago",  project: "juniper",    unread: true  },
  { id: "proposal-oliver",  kind: "proposal",  title: "Proposal accepted",          text: "Oliver accepted your proposal for Sunday Rituals.",      time: "Yesterday",  project: "sunday",     unread: true  },
  { id: "started-nina",     kind: "started",   title: "Project started",            text: "Fieldnotes editorial package is ready for kickoff.",     time: "Yesterday",  project: "fieldnotes", unread: false },
  { id: "completed-morrow", kind: "completed", title: "Project completed",          text: "Morrow ceramics lookbook is ready for your review.",     time: "Oct 28",     project: "morrow",     unread: true  },
  { id: "review-morrow",    kind: "review",    title: "New review received",        text: "Elliot left 5-star feedback on your collaboration.",     time: "Oct 29",     project: "morrow",     unread: false },
];

const EMOJI_LIST = [
  "😀","😊","😍","🤩","😂","🤔","😅","👍","👎","❤️",
  "🙏","🔥","✨","🎉","💯","👏","🙌","💪","✅","⭐",
  "🚀","💡","📌","📎","🖊","📅","💬","🔔","🎨","🏆",
];

/* ── State ─────────────────────────────────────────────────── */
const params = new URLSearchParams(window.location.search);
const requestedConversationId = params.get("project");
let activeConversationId = conversations.some(c => c.id === requestedConversationId) ? requestedConversationId : "juniper";
let activeFilter = "all";
let activeNotifFilter = "all";
let toastTimer;
let typingTimer;
let isTypingVisible = false;

/* ── Helpers ───────────────────────────────────────────────── */
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const esc = v => String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money = n => `$${Number(n).toLocaleString("en-US")}`;
const currentConversation = () => conversations.find(c => c.id === activeConversationId) ?? conversations[0];

function showToast(msg, duration = 2600) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("visible"), duration);
}

/* ── Render conversation list ──────────────────────────────── */
function renderConversations() {
  const query = $("#conversation-search").value.trim().toLowerCase();
  const visible = conversations.filter(conv => {
    const contact = contacts[conv.contact];
    const matchText = `${contact.name} ${conv.project} ${conv.preview}`.toLowerCase().includes(query);
    if (!matchText) return false;
    if (activeFilter === "unread") return conv.unread > 0;
    if (activeFilter === "active") return !["Completed", "Cancelled"].includes(conv.status);
    return true;
  });

  // Update counts
  const unreadCount = conversations.filter(c => c.unread > 0).length;
  $("#conversation-count").textContent = `${conversations.length} conversation${conversations.length !== 1 ? "s" : ""}`;
  $("#unread-count").textContent = unreadCount ? `(${unreadCount})` : "";

  // Sidebar unread dot
  const sidebarDot = $("#sidebar-unread-dot");
  if (sidebarDot) sidebarDot.hidden = !unreadCount;

  // Mobile badge
  const mobileBadge = $("#mobile-unread-badge");
  if (mobileBadge) mobileBadge.textContent = unreadCount || "";

  const list = $("#conversation-list");
  if (!visible.length) {
    list.innerHTML = '<p class="conversation-empty">No conversations match your search.<br>Try a different name or filter.</p>';
    return;
  }

  list.innerHTML = visible.map(conv => {
    const contact = contacts[conv.contact];
    const isActive = conv.id === activeConversationId;
    return `
      <button class="conversation-item${isActive ? " active" : ""}" type="button"
        data-project="${conv.id}"
        role="listitem"
        aria-label="Conversation with ${esc(contact.name)} — ${esc(conv.project)}${conv.unread ? `, ${conv.unread} unread` : ""}">
        <span class="contact-avatar-wrap">
          <img class="contact-photo" src="${contact.image}" alt="${esc(contact.name)}" loading="lazy" />
          ${contact.online ? '<i class="contact-online" aria-label="Online"></i>' : ""}
        </span>
        <span class="conversation-copy">
          <span class="conversation-name-line">
            <strong>${esc(contact.name)}</strong>
            <time datetime="">${esc(conv.time)}</time>
          </span>
          <span class="conversation-preview-line">
            <p>${esc(conv.preview)}</p>
            ${conv.unread ? `<span class="conversation-unread" aria-label="${conv.unread} unread">${conv.unread}</span>` : ""}
          </span>
        </span>
      </button>`;
  }).join("");

  list.querySelectorAll("[data-project]").forEach(btn =>
    btn.addEventListener("click", () => openConversation(btn.dataset.project))
  );
}

/* ── Render messages ───────────────────────────────────────── */
function renderMessages(conv) {
  const contact = contacts[conv.contact];
  const list = $("#message-list");

  if (!conv.messages.length) {
    list.innerHTML = `
      <div class="chat-empty">
        <span class="chat-empty-icon" aria-hidden="true">💬</span>
        Start the conversation with a note about the project, a question, or a quick hello.
      </div>`;
    return;
  }

  const today = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(new Date());
  list.innerHTML = `<div class="message-date">${today}</div>` + conv.messages.map(msg => {
    const isMine = msg.from === "me";
    const statusIcon = isMine
      ? `<span class="msg-status-icon ${msg.status === "read" ? "msg-status-read" : ""}">${msg.status === "read" ? "✓✓" : "✓"}</span>`
      : "";

    const reactionsHtml = (msg.reactions && msg.reactions.length)
      ? `<div class="chat-reactions">
          ${msg.reactions.map(r => `<button class="chat-reaction" type="button" data-msg="${msg.id}" data-emoji="${r}" aria-label="React ${r}">${r} <span>1</span></button>`).join("")}
         </div>`
      : "";

    return `
      <article class="chat-message${isMine ? " mine" : ""}" data-msg="${msg.id}">
        ${!isMine ? `<img class="contact-photo" src="${contact.image}" alt="${esc(contact.name)}" loading="lazy" />` : ""}
        <div class="chat-message-content">
          <div class="chat-bubble">${esc(msg.text).replace(/\n/g, "<br>")}</div>
          ${reactionsHtml}
          <time>${esc(msg.time)} ${statusIcon}</time>
        </div>
      </article>`;
  }).join("");

  // Bind reaction clicks
  list.querySelectorAll(".chat-reaction").forEach(btn => {
    btn.addEventListener("click", () => {
      const countEl = btn.querySelector("span");
      countEl.textContent = String(Number(countEl.textContent) + 1);
      btn.classList.add("reacted");
    });
  });

  // Scroll to bottom
  requestAnimationFrame(() => { list.scrollTop = list.scrollHeight; });
}

/* ── Render project details panel ──────────────────────────── */
function renderProjectDetails(conv) {
  const contact = contacts[conv.contact];
  const statusClass = conv.status.toLowerCase().replaceAll(" ", "-");

  // Linked-project banner in chat
  $("#linked-project").innerHTML = `
    <span class="linked-project-icon ${conv.art}">${esc(conv.letter)}</span>
    <span class="linked-project-copy">
      <strong>${esc(conv.project)}</strong>
      <small>${esc(conv.category)} · ${esc(conv.company)}</small>
    </span>
    <span class="linked-project-status">${esc(conv.status)}</span>`;

  // Side panel card
  $("#linked-project-card").innerHTML = `
    <div class="linked-project-art ${conv.art}"><span>${esc(conv.letter)}</span></div>
    <div class="linked-project-info">
      <h3>${esc(conv.project)}</h3>
      <p>${esc(conv.description)}</p>
      <span class="status-pill status-${statusClass}">${esc(conv.status)}</span>
      <div class="project-info-progress">
        <span>Progress</span>
        <strong>${conv.progress}%</strong>
      </div>
      <div class="project-info-track"><span style="width:${conv.progress}%"></span></div>
      <div class="project-info-facts">
        <div>Client<strong>${esc(contact.name)}</strong></div>
        <div>Budget<strong>${money(conv.budget)}</strong></div>
        <div>Due<strong>${esc(conv.due)}</strong></div>
      </div>
    </div>`;

  // Activity summary
  $("#activity-avatar").textContent = contact.initials;
  $("#activity-person-name").textContent = contact.name;
  $("#activity-copy").textContent = " — " + conv.activity;

  // Links
  $("#open-project").href = `index.html?project=${encodeURIComponent(conv.id)}#project-detail`;
  const reviewLink = $("#review-project-link");
  reviewLink.hidden = conv.status !== "Completed";
  reviewLink.href = `index.html?project=${encodeURIComponent(conv.id)}#project-review`;
}

/* ── Open a conversation ───────────────────────────────────── */
function openConversation(id, openOnMobile = true) {
  const conv = conversations.find(c => c.id === id);
  if (!conv) return;

  activeConversationId = id;
  conv.unread = 0;
  const contact = contacts[conv.contact];

  // Update chat header
  const photo = $("#contact-photo");
  photo.src = contact.image;
  photo.alt = contact.name;
  $("#contact-name").textContent = contact.name;
  $("#contact-status").textContent = contact.online ? "Online now" : "Usually replies within a day";

  // Online badge
  const badge = $("#contact-online-badge");
  badge.className = "contact-online-badge" + (contact.online ? "" : " offline");
  badge.title = contact.online ? "Online" : "Offline";

  // Clear typing indicator
  const typingEl = $("#chat-typing");
  typingEl.classList.remove("visible");
  clearTimeout(typingTimer);
  isTypingVisible = false;

  renderMessages(conv);
  renderProjectDetails(conv);
  renderConversations();
  renderNotifications();

  // Mobile: switch to chat view
  if (openOnMobile && window.matchMedia("(max-width: 800px)").matches) {
    $("#messages-page").classList.add("mobile-chat-open");
  }
}

/* ── Simulate typing indicator ─────────────────────────────── */
function simulateTypingResponse(conv) {
  const contact = contacts[conv.contact];
  const typingEl = $("#chat-typing");
  const typingName = $("#typing-contact");

  clearTimeout(typingTimer);

  const delay = 1400 + Math.random() * 1200;
  typingTimer = setTimeout(() => {
    typingName.textContent = contact.name + " is typing…";
    typingEl.classList.add("visible");
    isTypingVisible = true;

    const responses = [
      "Sounds great, I'll take a look!",
      "Thanks for the update 👍",
      "Perfect, let me know if you need anything.",
      "Got it! I'll review and get back to you shortly.",
      "That looks amazing, really appreciate the attention to detail.",
    ];

    typingTimer = setTimeout(() => {
      typingEl.classList.remove("visible");
      isTypingVisible = false;
      const text = responses[Math.floor(Math.random() * responses.length)];
      const time = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      conv.messages.push({ id: `auto-${Date.now()}`, from: "them", text, time, status: "delivered", reactions: [] });
      conv.preview = text;
      conv.time = time;
      renderMessages(conv);
      renderConversations();
    }, 2000 + Math.random() * 1000);
  }, delay);
}

/* ── Send a message ────────────────────────────────────────── */
$("#message-form").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("#message-input");
  const text = input.value.trim();
  if (!text) { input.focus(); return; }

  const conv = currentConversation();
  const time = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const msgId = `msg-${Date.now()}`;

  conv.messages.push({ id: msgId, from: "me", text, time, status: "delivered", reactions: [] });
  conv.preview = text;
  conv.time = time;

  renderMessages(conv);
  renderConversations();

  input.value = "";
  input.style.height = "29px";

  // Simulate read receipt
  setTimeout(() => {
    const sentMsg = conv.messages.find(m => m.id === msgId);
    if (sentMsg) { sentMsg.status = "read"; renderMessages(conv); }
  }, 1200 + Math.random() * 800);

  // Simulate typing + auto reply (only for active convs)
  if (!["Completed"].includes(conv.status)) {
    simulateTypingResponse(conv);
  }
});

/* ── Textarea auto-resize + Enter to send ──────────────────── */
const msgInput = $("#message-input");
msgInput.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    $("#message-form").requestSubmit();
  }
});

msgInput.addEventListener("input", event => {
  const el = event.target;
  el.style.height = "29px";
  el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
});

/* ── Emoji picker ──────────────────────────────────────────── */
(function initEmojiPicker() {
  const picker = $("#emoji-picker");
  const grid = $("#emoji-grid");

  grid.innerHTML = EMOJI_LIST.map(e =>
    `<button class="emoji-btn" type="button" data-emoji="${e}" aria-label="${e}">${e}</button>`
  ).join("");

  grid.querySelectorAll(".emoji-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = $("#message-input");
      const pos = input.selectionStart;
      const value = input.value;
      input.value = value.slice(0, pos) + btn.dataset.emoji + value.slice(pos);
      input.focus();
      input.selectionStart = input.selectionEnd = pos + btn.dataset.emoji.length;
      picker.hidden = true;
    });
  });

  $("#emoji-button").addEventListener("click", event => {
    event.stopPropagation();
    picker.hidden = !picker.hidden;
  });

  document.addEventListener("click", event => {
    if (!event.target.closest("#emoji-picker") && !event.target.closest("#emoji-button")) {
      picker.hidden = true;
    }
  });
})();

/* ── Toolbar buttons ───────────────────────────────────────── */
$("#attach-button").addEventListener("click", () => showToast("File attachment coming soon."));
$("#image-button").addEventListener("click",  () => showToast("Image sharing coming soon."));
$("#call-button").addEventListener("click",   () => {
  const conv = currentConversation();
  const contact = contacts[conv.contact];
  showToast(`Calling ${contact.name}… (feature preview)`);
});

/* ── Notification rendering ────────────────────────────────── */
function renderNotifications() {
  const unreadCount = notifications.filter(n => n.unread).length;
  const indicator = $("#notification-indicator");
  indicator.hidden = unreadCount === 0;
  $("#notification-summary").textContent = unreadCount ? `${unreadCount} unread` : "You're all caught up";

  // Mobile badge
  const mobileBadge = $("#mobile-notif-badge");
  if (mobileBadge) mobileBadge.textContent = unreadCount || "";

  // Filter notifications
  const filtered = notifications.filter(n => {
    if (activeNotifFilter === "all") return true;
    if (activeNotifFilter === "message") return n.kind === "message";
    if (activeNotifFilter === "project") return ["proposal", "started", "completed"].includes(n.kind);
    if (activeNotifFilter === "review") return n.kind === "review";
    return true;
  });

  const list = $("#notification-list");
  if (!filtered.length) {
    list.innerHTML = `
      <div class="notification-empty">
        <span class="notification-empty-icon" aria-hidden="true">🔕</span>
        Nothing here yet. New updates will appear as they come in.
      </div>`;
    return;
  }

  const iconMap = {
    message:   "✉",
    proposal:  "✓",
    started:   "↗",
    completed: "✓",
    review:    "★",
  };

  list.innerHTML = filtered.map(notif => `
    <button class="notification-item${notif.unread ? " unread" : ""}" type="button"
      data-notification="${notif.id}"
      role="listitem"
      aria-label="${esc(notif.title)}${notif.unread ? " (unread)" : ""}">
      <span class="notification-mark kind-${notif.kind}" aria-hidden="true">${iconMap[notif.kind] ?? "•"}</span>
      <span class="notification-copy">
        <strong>${esc(notif.title)}</strong>
        <p>${esc(notif.text)}</p>
        <time>${esc(notif.time)}</time>
      </span>
      ${notif.unread ? '<i class="notification-unread" aria-label="Unread"></i>' : ""}
    </button>`).join("");

  list.querySelectorAll("[data-notification]").forEach(btn =>
    btn.addEventListener("click", () => openNotification(btn.dataset.notification))
  );
}

/* ── Open a notification ───────────────────────────────────── */
function openNotification(id) {
  const notif = notifications.find(n => n.id === id);
  if (!notif) return;
  notif.unread = false;
  closeNotifications();
  renderNotifications();

  if (notif.kind === "completed" || notif.kind === "review") {
    window.location.href = `index.html?project=${encodeURIComponent(notif.project)}#project-review`;
    return;
  }
  openConversation(notif.project);
  showToast(`Opened: ${notif.title}`);
}

/* ── Notification panel open/close ────────────────────────── */
function closeNotifications() {
  $("#notification-popover").hidden = true;
  $("#notification-toggle").setAttribute("aria-expanded", "false");
}

function toggleNotifications() {
  const panel = $("#notification-popover");
  panel.hidden = !panel.hidden;
  $("#notification-toggle").setAttribute("aria-expanded", String(!panel.hidden));
  if (!panel.hidden) renderNotifications();
}

$("#notification-toggle").addEventListener("click", event => {
  event.stopPropagation();
  toggleNotifications();
});

$("#close-notifications").addEventListener("click", closeNotifications);

$("#mark-all-read").addEventListener("click", () => {
  notifications.forEach(n => { n.unread = false; });
  conversations.forEach(c => { c.unread = 0; });
  renderNotifications();
  renderConversations();
  showToast("All notifications marked as read.");
});

document.addEventListener("click", event => {
  if (!event.target.closest("#notification-popover") && !event.target.closest("#notification-toggle")) {
    closeNotifications();
  }
});

// Notification tabs
$$(".notification-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    activeNotifFilter = tab.dataset.notifFilter;
    $$(".notification-tab").forEach(t => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });
    renderNotifications();
  });
});

// Mobile notification button
const mobileNotifBtn = $("#mobile-notif-btn");
if (mobileNotifBtn) {
  mobileNotifBtn.addEventListener("click", event => {
    event.stopPropagation();
    toggleNotifications();
  });
}

/* ── Conversation filters ──────────────────────────────────── */
$$(".conversation-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.filter;
    $$(".conversation-filter").forEach(f => f.classList.toggle("active", f === btn));
    renderConversations();
  });
});

/* ── Conversation search ───────────────────────────────────── */
$("#conversation-search").addEventListener("input", renderConversations);
$("#global-message-search").addEventListener("input", event => {
  $("#conversation-search").value = event.target.value;
  renderConversations();
});

/* ── Chat controls ─────────────────────────────────────────── */
$("#chat-back").addEventListener("click", () => {
  $("#messages-page").classList.remove("mobile-chat-open");
  clearTimeout(typingTimer);
  isTypingVisible = false;
  $("#chat-typing").classList.remove("visible");
});

$("#chat-details-toggle").addEventListener("click", () => {
  $(".communication-workspace").classList.toggle("show-details");
});

$("#details-close").addEventListener("click", () => {
  $(".communication-workspace").classList.remove("show-details");
});

/* ── New message button ────────────────────────────────────── */
$("#new-message").addEventListener("click", () => {
  if (window.matchMedia("(max-width: 800px)").matches) {
    $("#messages-page").classList.remove("mobile-chat-open");
  }
  $("#conversation-search").focus();
  showToast("Select a conversation from your inbox to start messaging.");
});

$("#compose-button").addEventListener("click", () => {
  showToast("Compose a new message by selecting a conversation.");
  if (window.matchMedia("(max-width: 800px)").matches) {
    $("#messages-page").classList.remove("mobile-chat-open");
  }
  $("#conversation-search").focus();
});

/* ── Global keyboard shortcut ──────────────────────────────── */
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    $("#global-message-search").focus();
  }
  if (event.key === "Escape") {
    closeNotifications();
    $("#emoji-picker").hidden = true;
  }
});

/* ── Init ──────────────────────────────────────────────────── */
renderNotifications();
openConversation(activeConversationId, Boolean(requestedConversationId));

// Auto-open notification panel if URL has ?notifications=1
if (params.has("notifications")) {
  toggleNotifications();
}
