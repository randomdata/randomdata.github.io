document.addEventListener("DOMContentLoaded", function(e) {
    let isIntialized = false;
    var calendarEl;

    const interval = setInterval(() => {
        const queriedElement = document.querySelector('#calendar');

        isIntialized = !!queriedElement;
        calendarEl = queriedElement;

        if(isIntialized) {
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                events: {
                    url: 'https://www.meetup.com/Randomdata/events/ical/',
                    format: 'ics'
                  }
              });
            calendar.render();
        }
    }, 500);

    if(isIntialized) {
        clearInterval(interval);
    }
});