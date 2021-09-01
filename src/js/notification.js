import { error, defaults, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

defaults.width = '400px';

export const notificationStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  push: 'bottom',
  maxOpen: 1,
  maxStrategy: 'close',
});

export function notificationNotFound() {
  return error({
    title:
      'Sorry, but nothing matched your search terms. Please try again with some different keywords.',
    icon: 'brighttheme-icon-error',
    hide: true,
    closer: true,
    sticker: false,
    destroy: true,
    stack: notificationStack,
  });
}
