// No libraries or build step needed. The form never sends or stores data.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.add('is-collapsed');
}
closeMenu();
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-collapsed', isOpen);
});
navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

// Paste the public Formspree endpoint into index.html, never an API key.
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const submitButton = form.querySelector('button[type="submit"]');
const endpoint = form.dataset.endpoint.trim();
const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);
let sending = false;

function showStatus(message, state) {
  status.textContent = message;
  status.dataset.state = state;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (sending) return;
  if (!configured) {
    showStatus('Online enquiries are temporarily unavailable. Please check back soon.', 'error');
    return;
  }
  for (const id of ['name', 'message']) {
    const field = form.elements.namedItem(id);
    const minimum = id === 'message' ? 10 : 1;
    field.setCustomValidity(field.value.trim().length < minimum
      ? `Please enter ${id === 'message' ? 'a message with at least 10 non-padding characters' : 'your name'}.`
      : '');
  }
  if (!form.reportValidity()) return;
  sending = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');
  showStatus('Sending your enquiry…', 'pending');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  // Capture entries before awaiting the service; retain them on failure.
  const data = new FormData(form);
  try {
    const response = await fetch(endpoint, {
      method: 'POST', body: data, headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) {
      showStatus('Your enquiry was not confirmed. Please check your details and try again later.', 'error');
      return;
    }
    showStatus('Thank you! We will contact you soon.', 'success');
    form.reset();
  } catch {
    // A lost response does not prove whether the service received the message.
    showStatus('We could not confirm receipt. Please check your connection before trying again. Your enquiry may already have reached us.', 'error');
  } finally {
    clearTimeout(timeout);
    sending = false;
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
    form.removeAttribute('aria-busy');
  }
});
form.addEventListener('input', (event) => {
  if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
  if (!sending && configured) showStatus('', '');
});
if (configured) {
  submitButton.disabled = false;
  showStatus('', '');
}
