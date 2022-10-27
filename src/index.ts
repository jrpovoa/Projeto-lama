import { app } from "./app";
import { showRouter } from "./router/showRouter";
import { userRouter } from "./router/userRouter";


app.use('/user', userRouter)
app.use('/show', showRouter)