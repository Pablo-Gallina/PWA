// if ('serviceWorker' in navigator) {
//     console.log('Es posible usar');
// }

if (navigator.serviceWorker) {
    console.log('sw');
    navigator.serviceWorker.register('/02-service-worker/sw.js')
}