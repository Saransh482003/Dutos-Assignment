// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import *  as fs from "fs"
import path from "path"
export default async function handler(req, res) {
  try{
    const filePath = path.join(process.cwd(),"JSONs","inventory.json")
    const rawdata = await fs.promises.readFile(filePath,"utf-8")
    const data = JSON.parse(rawdata)
    res.status(200).json(data)
  }
  catch (error){
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
