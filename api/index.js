import express from 'express';

const app = express()

app.listen(7100, ()=> {
    console.log('Server is running on port 7100')
}
)