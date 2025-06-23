module.exports = {
    apps: [{
        name: 'ftd-auth-service',
        script: './dist/server.js',
        instances: 1,
        exec_mode: 'cluster',

        autorestart: true,
        watch: false,
        max_memory_restart: '1G',

        env:{
            NODE_ENV: 'production',
            PORT: 3000,
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000,
        },

        log_file: './logs/combined.log',
        out_file: './logs/out.log',
        error_file: './logs/error.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

        min_uptime: '10s',
        max_restarts: 10,
        restart_delay: 4000,

        health_check_grace_period: 3000,

        kill_temeout: 1600,
        listen_timeout: 3000,

        pmx: true,

        kill_retry_time: 100
    }]
}