const ENV = {
    LOCAL: {
        HOST_API: "http://localhost:5000/api"
    },
    PROD: {
        HOST_API: "http://java-sample.ap-southeast-2.elasticbeanstalk.com/api"
    }
}

const config = ENV['LOCAL', 'PROD'];

const getEnv = (name, defaultName) => config[name] || defaultName;

export { getEnv };