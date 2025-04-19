export const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.log("Error in asyncHandler", error);
            res.status(error.statusCode || 500).json({success: false, message: error.message || "Internal Server Error", errors: error.errors || []});
        }
    }
}