// Hook to use Intercom functionality
export const useIntercom = () => {
  const show = () => {
    if (window.Intercom) {
      window.Intercom('show');
    }
  };

  const hide = () => {
    if (window.Intercom) {
      window.Intercom('hide');
    }
  };

  const showMessages = () => {
    if (window.Intercom) {
      window.Intercom('showMessages');
    }
  };

  const showNewMessage = (message: string) => {
    if (window.Intercom) {
      window.Intercom('showNewMessage', { body: message });
    }
  };

  const update = (data: Record<string, unknown>) => {
    if (window.Intercom) {
      window.Intercom('update', data);
    }
  };

  const trackEvent = (eventName: string) => {
    if (window.Intercom) {
      window.Intercom('trackEvent', { name: eventName });
    }
  };

  return {
    show,
    hide,
    showMessages,
    showNewMessage,
    update,
    trackEvent,
  };
};
