const sql = require('mssql')
 
async () => {
    try {
        await sql.connect('mssql://sa:007@.\\SQL2014/IM')
        const result = await sql.query`select * from tbl_PartyCateg where partyCategID = 1`
        console.dir(result)
    } catch (err) {
        console.log(err);
        // ... error checks
    }
}