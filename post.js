const router = require('express').Router();
const privateRoute = require('./routes/privateRoute');

router.get('/', privateRoute ,(req ,res)=>{
    res.json({
        post:{title:"past life was tragedy",
        des:"random post"
    
    }
    })
})


module.exports = router;