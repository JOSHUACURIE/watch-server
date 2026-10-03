const Category=require('../model/category')

const createCategory=async(req,res)=>{
    try{
        const userRole=req.sub.role;
const {name,description,slug}=req.body;
if(!name||!description ||slug){
    return res.status(400).json({
        success:false,
        message:"All fields are required"
    });
}
if(userRole!=="admin"){
    return res.status(401).json({
        success:false,
        message:"You are not authorized to perform this action"
    });
}
const category=await Category.findOne({name:name});
if(category){
    return res.status(409).json({
        success:false,
        message:"Category already exists"
    })
}

await category.save();

return res.status(201).json({
    success:true,
    message:"Category added successfully",
    category
})

    }catch{
        console.error("Error: ",error)
        return res.status(500).json({
            success:false,
            message:"An error has occured"
        })

    }
}