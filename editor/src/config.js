const dev = {
    runnerEndPoint: "http://localhost:8080"
}

const prod = {
    runnerEndPoint: "https://runner.pearcode.it"
}

const common = {
    "languages": {
        "javascript": {
            "runnable": true,
            "options": [{
                "name": "Environment",
                "values": ["Browser", "Node.JS"]
            }]
        },
        "csharp": {
            "runnable": true
        },
        "python": {
            "runnable": true,
            "options": [{
                "name": "Version",
                "values": ["2", "3"]
            }]
        },
        "java": {
            "runnable": true
        }
    }
}


export default {
    ...common,
    ...(process.env.NODE_ENV==='development'?dev:prod)
}
