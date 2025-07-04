// sw.js

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      // Focus an open tab if one exists
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }

      // Otherwise, open a new tab
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
