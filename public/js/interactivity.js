// Save artwork button handler
document.addEventListener('DOMContentLoaded', () => {
    const saveButtons = document.querySelectorAll('.save-art-btn');
    saveButtons.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const artId = btn.dataset.artId;
        const title = btn.dataset.title;
        
        try {
          const response = await fetch('/user/save-art', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ artId, title })
          });
          if (response.ok) window.location.reload();
        } catch (err) {
          alert('Failed to save artwork');
        }
      });
    });
  });