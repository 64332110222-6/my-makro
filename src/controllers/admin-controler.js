exports.createProduct = async (req, res , next)=>{
    try {
        res.json({message: "Create Product"})
    } catch (error) {
        next(err)
    }
}
exports.updateProduct = async (req, res , next)=>{
    try {
        const { title } = req.body
        res.json({message: "Update Product"})
    } catch (error) {
        next(err)
    }
}
exports.createBrand = async (req, res , next)=>{
    try {
        res.json({message: "Create Brand"})
    } catch (error) {
        next(err)
    }
}
exports.createCategory = async (req, res , next)=>{
    try {
        res.json({message: "Create Category"})
    } catch (error) {
        next(err)
    }
}
exports.createPromotion = async (req, res , next)=>{
    try {
        res.json({message: "Create Promotion"})
    } catch (error) {
        next(err)
    }
}
