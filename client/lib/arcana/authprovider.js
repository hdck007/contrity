
// const { AuthProvider, AppMode } = require('@arcana/auth');

// let auth

// export default async function getWalletInstance () {
//   if (!auth) {
//     auth = new AuthProvider("2277")
//     await auth.init({ appMode: AppMode.Full, position: 'right' })
//     await auth.loginWithSocial('github')
//     const isConnected = await auth.isLoggedIn()
//     if(isConnected){
//       const user = await auth.getUser()
//       console.log(user)
//     }
//   }
//   return auth.provider
// }