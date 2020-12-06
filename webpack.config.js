var path = require('path');
 
module.exports = {
   entry: "./frontend/app.jsx", // входная точка - исходный файл
   output:{
       path: path.resolve(__dirname, './public'),     // путь к каталогу выходных файлов - папка public
       publicPath: '/public/',
       filename: "bundle.js"       // название создаваемого файла
   },
   devServer: {
     historyApiFallback: true,
   },
   module:{
       rules:[   //загрузчик для jsx
           {
               test: /\.(js||jsx)?$/, // определяем тип файлов
               exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
               loader: "babel-loader",   // определяем загрузчик
               options:{
                   presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
               }
           },
           {
             
                test: /\.css$/,
                use:
                [
                    'style-loader',
                    'css-loader',
                ]
           }
       ]
   }
}