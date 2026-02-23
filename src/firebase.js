import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyDq09dMPV9M6DaYI0KhEMdCtM58qncwH2o",
  authDomain: "zoe-secondhand.firebaseapp.com",
  projectId: "zoe-secondhand",
  storageBucket: "zoe-secondhand.firebasestorage.app",
  messagingSenderId: "886684952854",
  appId: "1:886684952854:web:625298176528f357f88837"
}

const app = initializeApp(firebaseConfig)

export const messaging = getMessaging(app)

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission()

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BISFdSGQw-oToiyd1lryo7Sp-G4X1-LHyeSE8MrRR7R65BMPxGBIjSarrTpxAwJKTQci5Yh3Uw9WV4pygm5EFkE"
    })

    console.log("TOKEN FCM:", token)
    return token
  } else {
    console.log("Permiso denegado")
  }
}

export const listenForegroundMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Mensaje recibido en foreground:", payload)
  })
}