const ENV = {
    LOCAL: {
        HOST_API: "http://localhost:5000/api"
    }
}

const config = ENV['LOCAL'];

const getEnv = (name, defaultName) => config[name] || defaultName;

export { getEnv };