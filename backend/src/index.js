import { app } from "./app.js";
import { connectDB } from "./db/index.js";

connectDB()
.then(() => {
    app.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})