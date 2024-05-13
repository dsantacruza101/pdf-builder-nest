
export const EnvCofiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    port: +process.env.PORT || 3000,

})