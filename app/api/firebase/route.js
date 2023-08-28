
export const GET = async (req) => {
    try {
        let databaseURL = process.env.DATABASE_URL
        return new Response(JSON.stringify(databaseURL), { status: 200 })
    }
    catch (err) {
        console.log(err)
        return new Response("Failed to Intialize app", { status: 500 })
    }
}
