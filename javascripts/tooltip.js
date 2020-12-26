tippy.delegate('.file-list', {
        target: ".copy-btn",
        content: 'Copied!',
        trigger: 'click',
        hideOnClick: false,
        onShow(instance) {
            setTimeout(() => {
                instance.hide();
            }, 1500);
        }
      });
