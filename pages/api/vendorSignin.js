// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import *  as fs from "fs"
import path from "path"
export default async function handler(req, res) {
  const name = req.query.vendorName
  const password = req.query.password
  try{
    const filePath = path.join(process.cwd(),"JSONs","vendors.json")
    const rawdata = await fs.promises.readFile(filePath,"utf-8")
    const data = JSON.parse(rawdata)
    const keys = Object.keys(data)
    if (keys.includes(name)){
      if (data[name]["password"]==password){
      res.status(200).json({"vendorName":name,"password":password})
      }
    }
    else {
      res.status(400).json({ error: "User not registered" });
    }
  }
  catch (error){
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
