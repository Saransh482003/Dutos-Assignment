import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
    const vendorName = req.query.vendorName
    const itemName = req.query.itemName
    const userName = req.query.userName
    try {

        const filePath = path.join(process.cwd(), 'JSONs', 'orders.json');
        const rawdata = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(rawdata);
        console.log(data)
        const updateOrder = data.filter((item) => {
            const matchCondition =
                (item.vendorName !== vendorName) ||
                (item.itemName !== itemName) ||
                (item.userName !== userName);
        
            console.log('Item:', item, 'Match Condition:', matchCondition);
        
            return matchCondition;
        });

        console.log(updateOrder)

        await fs.writeFile(filePath, JSON.stringify(updateOrder, null, 2), 'utf-8');
        res.status(200).json({ message: 'Modified' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
