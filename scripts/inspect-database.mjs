// Schema metadata only: never print connection strings or application records.
import {createDatabasePool} from '../lib/database.js';
const pool=createDatabasePool(process.env,{migration:true});
try{
 const result=await pool.query("SELECT table_name,column_name,data_type,is_nullable FROM information_schema.columns WHERE table_schema='public' AND table_name LIKE 'lunar_%' ORDER BY table_name,ordinal_position");
 console.log('Existing Lunar schema:',JSON.stringify(result.rows));
}catch(error){console.error('Schema inspection failed:',error.code||error.name);process.exitCode=1;}
finally{await pool.end();}
