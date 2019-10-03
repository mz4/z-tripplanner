export default function getAPIUrl() {
    const host = process.env.NODE_ENV;
    if(host === "production") {
        return "/"
    } else {
        return "http://localhost:8080/"
    }
}