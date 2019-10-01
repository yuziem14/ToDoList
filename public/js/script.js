const checkboxes = document.querySelectorAll('.check-task');

const taskConcluded = id => {
  window.location.href = `/tasks/${id}/concluded`;
};

checkboxes.forEach(c => {
  c.addEventListener('change', e => {
    const target = e.target;
    const id = target.dataset.task;
    taskConcluded(id);
  });
});
