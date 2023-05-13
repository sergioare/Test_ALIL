
const adminAccess = async (req, res)=>{
    res.json({
        error: null,
        data: {
            title: "This is my protected route",
            user: req.user
        }
    })
}
export default adminAccess;