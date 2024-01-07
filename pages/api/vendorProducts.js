// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import *  as fs from "fs"
import path from "path"
export default async function handler(req, res) {
    const name = req.query.vendorName
    const password = req.query.password
    try {
        const filePath = path.join(process.cwd(), "JSONs", "inventory.json")
        const rawdata = await fs.promises.readFile(filePath, "utf-8")
        const data = JSON.parse(rawdata)
        const vendorInv = data.filter((item) => item.vendorName === name);
        res.status(200).json(vendorInv)
    }
    catch (error) {
        console.error("Error reading JSON file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
