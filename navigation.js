const copyEmailButton = document.querySelector('.copy-email');
if (copyEmailButton) {
  copyEmailButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('yjang03@risd.edu');
      status.textContent = 'Email copied';
      copyEmailButton.classList.add('is-copied');
      copyEmailButton.querySelector('img').src = 'images/interface/copy-filled.svg';
      copyEmailButton.setAttribute('aria-label', 'Email copied. Copy again');
    } catch {
      status.textContent = 'Unable to copy. Please select the email address below.';
    }
  });
}
