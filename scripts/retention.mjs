// Explicit retention operation. Dry-run by default; no policy guessed silently.
import {createDatabasePool} from '../lib/database.js';
const args=process.argv.slice(2),n=args.indexOf('--days'),days=n>=0?Number(args[n+1]):NaN;
if(!Number.isInteger(days)||days<1||days>3650)throw Error('Supply an approved --days retention period between 1 and 3650. Default mode is dry-run.');
const apply=args.includes('--apply');if(apply&&!args.includes('--confirm-delete-expired'))throw Error('Deletion requires --apply --confirm-delete-expired. Review a dry run and verified backup first.');
const pool=createDatabasePool();const db=await pool.connect();
try{await db.query('BEGIN');const apps=await db.query("SELECT count(*)::int AS count FROM lunar_applications WHERE created_at<now()-$1*interval '1 day'",[days]),briefs=await db.query("SELECT count(*)::int AS count FROM lunar_briefs WHERE created_at<now()-$1*interval '1 day'",[days]);
 if(apply){await db.query("DELETE FROM lunar_applications WHERE created_at<now()-$1*interval '1 day'",[days]);await db.query("DELETE FROM lunar_briefs WHERE created_at<now()-$1*interval '1 day'",[days]);await db.query('DELETE FROM lunar_admin_sessions WHERE expires_at<now()');await db.query("INSERT INTO lunar_admin_audit(principal,action,outcome)VALUES('retention-operator','retention.apply','success')");await db.query('COMMIT');}else await db.query('ROLLBACK');
 console.log(JSON.stringify({mode:apply?'applied':'dry-run',retentionDays:days,applications:apps.rows[0].count,briefs:briefs.rows[0].count,estimatesCascadeWithApplications:true}));
}catch(error){await db.query('ROLLBACK').catch(()=>{});console.error('Retention operation failed:',error.code||error.name);process.exitCode=1;}finally{db.release();await pool.end();}
