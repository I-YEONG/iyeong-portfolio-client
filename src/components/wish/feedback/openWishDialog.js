const openDialogs = [];
const focusableSelector = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

// show() keeps the dialog inside the transformed preview; this supplies modal interaction.
export function openWishDialog(dialog) {
  if (!dialog) return () => {};
  const previousFocus = document.activeElement;
  openDialogs.push(dialog);
  dialog.setAttribute('aria-modal', 'true');
  dialog.show();

  const isTop = () => openDialogs.at(-1) === dialog;
  const focusable = () => Array.from(dialog.querySelectorAll(focusableSelector)).filter((node) => node.getClientRects().length > 0 && !node.closest('[inert]'));
  const focusFirst = () => {
    const target = focusable()[0] ?? dialog;
    if (target === dialog) dialog.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };
  const onKeyDown = (event) => {
    if (!isTop()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      dialog.dispatchEvent(new Event('cancel', { bubbles: true, cancelable: true }));
    } else if (event.key === 'Tab') {
      const items = focusable();
      const index = items.indexOf(document.activeElement);
      if (!items.length) {
        event.preventDefault();
        focusFirst();
      } else if (event.shiftKey && index <= 0) {
        event.preventDefault();
        items.at(-1).focus();
      } else if (!event.shiftKey && (index === -1 || index === items.length - 1)) {
        event.preventDefault();
        items[0].focus();
      }
    }
  };
  const blockOutsidePointer = (event) => {
    if (isTop() && !dialog.contains(event.target)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  const containFocus = (event) => {
    if (isTop() && !dialog.contains(event.target)) focusFirst();
  };
  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('pointerdown', blockOutsidePointer, true);
  document.addEventListener('click', blockOutsidePointer, true);
  document.addEventListener('focusin', containFocus, true);

  return () => {
    document.removeEventListener('keydown', onKeyDown, true);
    document.removeEventListener('pointerdown', blockOutsidePointer, true);
    document.removeEventListener('click', blockOutsidePointer, true);
    document.removeEventListener('focusin', containFocus, true);
    const index = openDialogs.lastIndexOf(dialog);
    if (index !== -1) openDialogs.splice(index, 1);
    if (dialog.open) dialog.close();
    if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
  };
}
