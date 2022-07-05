import { DateTime } from '../node_modules/luxon/src/luxon.js';

// export get current datetime using arrow functions
export default class getDate {
  static displayLuxon() {
    setInterval(() => {
      const now = DateTime.now();
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const formatTime = (time) => (time < 10 ? `0${time}` : time);
      const dateText = `${months[now.month - 1]} ${now.day}th ${
        now.year
      }, ${formatTime(now.hour)}:${formatTime(now.minute)}:${formatTime(
        now.second,
      )}`;
      const spanForDate = document.querySelector('#current_date');
      spanForDate.textContent = dateText;
    }, 1000);
  }
}
