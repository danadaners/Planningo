// import request from 'superagent'

// const CALENDAR_ID = 'kbpjvlhli4hvhd60pdenlhq5rs@group.calendar.google.com'
// const API_KEY = 'AIzaSyDQSdtzLvF07ZLtrTkIW2GudIypxJrfq5U'
// let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

// export function getEvents (callback) {
//   request
//     .get(url)
//     .end((err, resp) => {
//       if (!err) {
//         const events = []
//         JSON.parse(resp.text).items.map((event) => {
//           events.push({
//             start: event.start.date || event.start.dateTime,
//             end: event.end.date || event.end.dateTime,
//             title: event.summary,
//           })
//         })
//         callback(events)
//       }
//     })
// }
