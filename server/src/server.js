import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRoute from './routes/user.js'
import { sequelize } from './db/db.js';
import  adminAccess  from './routes/admin.js'
import validateToken from './middlewares/validate-token.js'

const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended: false}));
server.use(express.json());
server.use(cookieParser());

server.use('/api/user', userRoute)
server.use('/api/dashboard', validateToken, adminAccess)

server.get('/', (req,res)=>{
    res.json({
        estado: true,
        mensaje:"working"
    })
});

(async function seqSync(){
  try {
    sequelize
      .sync({force:false})
      .then(() => {
        console.log('Postgres sync has been established successfully.')
      })
  } catch (error) {
    console.error('Unable to sync to the database:', error)
  }
})();
  
export default server;