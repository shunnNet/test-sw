// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw-test/sw.js', { scope: '/sw-test/' }).then(function(reg) {

//     if(reg.installing) {
//       console.log('Service worker installing');
//     } else if(reg.waiting) {
//       console.log('Service worker installed');
//     } else if(reg.active) {
//       console.log('Service worker active');
//     }

//   }).catch(function(error) {
//     // registration failed
//     console.log('Registration failed with ' + error);
//   });
// }

if ('serviceWorker' in navigator) {
  ;(async function () {
    try {
      console.log('new 4')
      // navigator.serviceWorker.getRegistrations().then((regs) => {
      //   regs.forEach((reg) => {
      //     reg.unregister()
      //   })
      // })
      const reg = await navigator.serviceWorker.register('sw2.js', {
        scope: '/test-sw',
      })
    } catch (e) {
      console.error(e)
    }
  })()
}
