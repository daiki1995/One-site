
const path = require('path');

/*
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
*/

const main={
    mode:"development",

    //メインとなるjavascriptファイル
    entry:"./src/index.js",


    //出力ファイル
    output: {
        //出力先ファイル
        path:path.resolve(__dirname,'public'),

        // 出力ファイル名
        filename: "index.js"
    },

    module:{
        rules: [
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },

            {
                test:/\.css$/,
                use: [{ loader: 'style-loader' },
                    {loader:'css-loader'}]
            }
        ],
    },

    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
    },

    
};

const marubatsu={
    mode:"development",

    //メインとなるjavascriptファイル
    entry:"./src/marubatsu.js",

    //出力ファイル
    output: {
        //出力先ファイル
        path:path.resolve(__dirname,'public'),

        // 出力ファイル名
        filename: "marubatsu.js"
    },

    module:{
        rules: [
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },

            {
                test:/\.css$/,
                use: [{ loader: 'style-loader' },
                    {loader:'css-loader'}]
            }
        ]
    },

};


const home={
    mode:"development",

    //メインとなるjavascriptファイル
    entry:"./src/home.js",

    //出力ファイル
    output: {
        //出力先ファイル
        path:path.resolve(__dirname,'public'),

        // 出力ファイル名
        filename: "home.js"
    },

    module:{
        rules: [
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },

            {
                test:/\.css$/,
                use: [{ loader: 'style-loader' },
                    {loader:'css-loader'}]
            }
        ]
    },

};



module.exports =[
    home,marubatsu,main
];
