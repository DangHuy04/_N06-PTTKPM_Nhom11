import Product from "../model/Products.js";

const searchAPI = async(req , res) => {
    try {
        const { query } = req.query
        
        if(!query) {
            return res.status(400).json({ message: "Query is required"});
        }

        const results = await Product.find({
            $or: [
              { name: { $regex: query, $options: "i" } }, // Search in name
              { tags: { $in: [query] } } // Search in tags array
            ]
        });

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    
};

export default searchAPI;