document.addEventListener("DOMContentLoaded", function(e) {
    let isIntialized = false;
    const interval = setInterval(() => {
        const queriedElement = document.querySelector('#calendar');
        isIntialized = !!queriedElement;

        if(isIntialized) {
            // Use listWeek when mobile
            const headerConfig = {
                start: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                center: 'title',
                end: 'prev,next'
            };

            new FullCalendar.Calendar(queriedElement, {
                locale: 'en',
                firstDay: 1,
                headerToolbar: {
                    ...headerConfig,
                },
                initialView: 'listWeek',
                events: {
                    url: 'https://randomdata.sandervankasteel.nl/events.ical',
                    format: 'ics'
                },
                eventClick: function(info) {
                    info.jsEvent.preventDefault();
                    if(info.event.url) {
                        window.open(info.event.url, "_blank")
                    }
                },
                eventColor: '#378006',
                eventTimeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                }
              }).render();

            clearInterval(interval);
        }
    }, 500);
});