module.exports = {
    imap: {
        accounts: {
            snoopPrueba: {
                setting: {
                    user: 'maxilopez2223@gmail.com',
                    password: '123456asd',
                    host: 'imap.gmail.com',
                    port: 993,
                    tls: true
                }
            }
        }

    },
    facebook: {
        url: "https://graph.facebook.com/",
        token: "?access_token=DQVJ2VFBQTzZAER3JuZA1JtcTZAiamJYem5ZAZAGQwTGpSWDFxbkR5VExnNlc5S0NwUzRQcDVfRUpramJ6WlhmUktzUjZAyeWNkWGwtVGJRaHhkRzNaOGljNHkwV1hvNUdWb3FIM2ljT3pZAS21DVHpVS3lTZAF91OUJFdktOcnFLRWJYcjJMLTVDU09FeTM3d2ZAaVzBUZA2dVNy15RXRna0lkZADB0QjMxbE13Qm5yTUd3ZAE9kS2RPazhsY0VmRjFyb09TOVBaTXV6Nm1ocUdKOFd3b0ZAUUwZDZD",
    },
    path: {
        public: {
            video: 'public/video/',
            photo: 'public/imagen/',
        }
    },
    google: {
        configuration: {
            client_id: "713347869040-7jjjismmphmnp3rgfgibvgofqob3ao7c.apps.googleusercontent.com",
            project_id: "heroic-light-172718",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://accounts.google.com/o/oauth2/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_secret: "mHwqC7FthBoA_cAaFnORXxlZ",
            redirect_uris: [
                "http://localhost:6004/api/callback"
            ],
            javascript_origins: [
                "http://localhost:6004"
            ]
        },
        drive: {
            folders:{
                imagen: "0B5GMXmDIkPM6TlE3OGQ0YmxSTDQ"
            }
        }
    },
    postMailGroupId:{
        // mailGoogle : grupoIDWorkPlace
        "gdp-auto@snoopconsulting.com" : 287544715050657,
        "ventas-auto@snoopconsulting.com" : 287544715050657,
        "backend-auto@snoopconsulting.com" : 287544715050657,
        "maxilopez2223@gmail.com": 287544715050657
    }

};