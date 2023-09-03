
export const GET = async (req) => {
    try {
        let apiKey = process.env.API_KEY
        let authDomain = process.env.AUTH_DOMAIN
        let databaseURL = process.env.DATABASE_URL
        let projectId = process.env.PROJECT_ID
        let storageBucket = process.env.STORAGE_BUCKET
        let messagingSenderId = process.env.MESSAGING_SENDER_ID
        let appId = process.env.APP_ID
        let measurementId = process.env.MEASUREMENT_ID
        const firebaseConfig = {
            apiKey,
            authDomain,
            databaseURL: databaseURL,
            projectId,
            storageBucket,
            messagingSenderId,
            appId,
            measurementId
        };
        return new Response(JSON.stringify(firebaseConfig), { status: 200 })
    }
    catch (err) {
        console.log(err)
        return new Response("Failed to Intialize app", { status: 500 })
    }
}
