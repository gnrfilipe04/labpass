import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  APP_ID,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID
} from '@env'

// Initialize Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  projectId: PROJECT_ID,
  authDomain: AUTH_DOMAIN,
  appId: APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
