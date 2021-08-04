var config = {
    redis: {
        host: "127.0.0.1",
        port: "6379",
        password: "",
        db: "local",
        socket: ""
    },
    stream: {
        STREAMS_KEY: "simpleMicroservice",
        APPLICATION_ID: "iot_application:node_1",
        CONSUMER_ID: "consumer:1"
    }
};

module.exports = config;