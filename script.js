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

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
// Enable the demo only after its submission handler has been registered.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  for (const id of ['name', 'message']) {
    const field = form.elements.namedItem(id);
    const minimum = id === 'message' ? 10 : 1;
    field.setCustomValidity(field.value.trim().length < minimum
      ? `Please enter ${id === 'message' ? 'a message with at least 10 non-padding characters' : 'your name'}.`
      : '');
  }
  if (!form.reportValidity()) return;
  status.textContent = 'Demo complete — your entries passed validation. Nothing was sent or saved.';
});
form.addEventListener('input', (event) => {
  event.target.setCustomValidity('');
  status.textContent = '';
});

form.querySelector('button[type="submit"]').disabled = false;
