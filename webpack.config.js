module.exports = {
    // other configurations...

    module: {
        rules: [
            // other rules...
            {
                test: /\.svg$/,
                use: ['@svg/webpack'],
            },
        ],
    },
    resolve: 'gatsby-plugin-react-svg',
    options: {
        rule: {
            include: /svg/
        }
    }
};
