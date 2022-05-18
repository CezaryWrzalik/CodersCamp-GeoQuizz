export const ModalWindow = (parent, onClose, id) => {
  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modalWindow');
  modalWindow.id = id;

  const closingButton = document.createElement('div')
  closingButton.classList.add('modal__close')
  closingButton.addEventListener('click',() => modalWindow.close() )
  modalWindow.appendChild(closingButton)


  parent.appendChild(modalWindow);

  function ModalOverlay() {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modalWindow__overlay');
    modalOverlay.id = 'overlay';
    return modalOverlay;
  }

  modalWindow.show = (content) => {
    if (content) {
      content.id = 'modalContent';
      modalWindow.appendChild(content);
      modalWindow.style.display = 'block';
    }
  };

  modalWindow.close = () => {
    onClose()
    modalWindow.style.display = 'none';
    const contentToRemove = document.getElementById('modalContent');
    if (contentToRemove) {
      contentToRemove.remove();
    }
  };

  modalWindow.replaceContent = (content) => {
    const contentToRemove = document.getElementById('modalContent');
    if (contentToRemove) {
      contentToRemove.remove();
    }
    modalWindow.show(content);
  };

  return modalWindow;
};
