// Portfolio demo: no network requests, message delivery or persistent storage.
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

// The button is not a submit button. The form also blocks Enter-key submission.
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const demoButton = form.querySelector('button');

function validateDemo(event) {
  event.preventDefault();
  status.textContent = '';
  status.dataset.state = '';
  for (const id of ['name', 'message']) {
    const field = form.elements.namedItem(id);
    const minimum = id === 'message' ? 10 : 1;
    field.setCustomValidity(field.value.trim().length < minimum
      ? `Please enter ${id === 'message' ? 'a sample message with at least 10 non-padding characters' : 'a sample name'}.`
      : '');
  }
  if (!form.reportValidity()) return;
  status.dataset.state = 'success';
  status.textContent = 'Demo complete — your sample entries passed validation. Nothing was sent or saved.';
}
form.addEventListener('submit', validateDemo);
demoButton.addEventListener('click', validateDemo);
form.addEventListener('input', (event) => {
  if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
  status.textContent = '';
  status.dataset.state = '';
});
// Without JavaScript, all fields and the button remain disabled.
form.querySelector('fieldset').disabled = false;
demoButton.disabled = false;
status.textContent = 'Demo only — use sample details. Nothing will be sent or saved.';
